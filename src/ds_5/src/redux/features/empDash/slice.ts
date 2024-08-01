//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { EMP_DASHES_REQUESTS, SCHEMA_NAME, SKILL_KEYS, SKILL_LEVEL, SKILL_TYPES } from '../../../constants';
import { EmpDashState, EmpKpiT, FetchEmpDashPropsT } from './types';
import { CoobDataI, EmployeeT, Status } from '../../mainTypes';

const { koobDataRequest3 } = KoobDataService;

/**
 * Асинхронная функция для получения данных по сотрудникам.
 * Отправляет запросы на сервер и возвращает массив данных (CoobDataI[][][]).
 * @param params Объект с параметрами, включая koobId, allFilters и request.
 * @returns Обещание, разрешающееся массивом данных.
 */
export const fetchEmpDash = createAsyncThunk(
  'empDash/fetchEmpDash',
  async (params: FetchEmpDashPropsT, thunkAPI): Promise<CoobDataI[][][]> => {
    const { koobId, allFilters, request } = params;

    const response: CoobDataI[][][] = await Promise.all(
      Object.entries(EMP_DASHES_REQUESTS).map(([dashReqs, dashArray]) =>
        Promise.all(
          dashArray.map((dash) =>
            koobDataRequest3(
              koobId,
              dash.dimensions,
              dash.measures,
              {
                ...allFilters,
                ...dash.filters
              },
              { schema_name: SCHEMA_NAME, ...request, ...dash.request },
              `dashlet-${dash.comment}`
            ).catch((error) => {
              console.error(`Error in dashlet ${dash.comment}:`, error);
              return []; // Возвращаем пустой массив или null, чтобы избежать прерывания Promise.all
            })
          )
        )
      )
    );

    return response;
  }
);

/**
 * Асинхронная функция для установки сотрудника и получения данных дэшборда.
 * Сначала устанавливает сотрудника, затем запрашивает данные для дэшборда.
 * @param params Объект с массивом сотрудников и идентификатором koobId.
 * @param dispatch Функция для отправки действий.
 * @param getState Функция для получения текущего состояния.
 */
export const setEmployeeAndFetchDashboard = createAsyncThunk(
  'empDash/setEmployeeAndFetchDashboard',
  async (params: { employees: EmployeeT[]; koobId: string }, { dispatch, getState }) => {
    const { employees, koobId } = params;

    if (employees.length) {
      await dispatch(setEmployee(employees[0]));
    }
    const state = getState() as RootState;
    const { fullname, position, department } = state.empDash.employee;

    await dispatch(
      fetchEmpDash({
        koobId,
        allFilters: { fullname: ['=', fullname], position: ['=', position], department: ['=', department] }
      })
    );
  }
);

/**
 * Начальное состояние для состояния сотрудника.
 * Включает данные сотрудника, массивы данных для различных графиков и статус.
 */
const initialState: EmpDashState = {
  employee: { fullname: '', position: '', department: '', fact_empl_skills_employee_key: 0, picture_url: '' },
  data: [],
  empSkillsList: [],
  empRadar: [],
  empCard: [],
  empStackedArea: [],
  empBar: [],
  empKpi: [],
  status: Status.Pending
};

/**
 * Создание слайса состояния для данных о сотрудниках.
 * Включает редукторы для обновления различных данных и графиков.
 */
export const empDashSlice = createSlice({
  name: 'empDash',
  initialState,
  reducers: {
    /**
     * Установка данных о сотруднике в состоянии.
     * @param state Текущее состояние.
     * @param action Действие с данными сотрудника.
     */
    setEmployee(state, action: PayloadAction<EmployeeT>) {
      state.employee = action.payload;
    },

    /**
     * Обновление списка навыков сотрудника.
     * Сгруппировывает навыки по типам и преобразует их в массив объектов.
     */
    setEmpSkillsList(state) {
      // Создаем объект, чтобы сгруппировать навыки по типам
      const groupedSkills = {};

      // Проходим по каждому элементу ответа от сервера
      state.data[0][0].forEach(({ skill_type, skill_name, next_grade_level }) => {
        // Определяем тип навыка на основе skill_type
        const skillTypeName = SKILL_TYPES[skill_type];

        // Если в groupedSkills еще нет этого типа навыков, создаем новый массив
        if (!groupedSkills[skillTypeName]) {
          groupedSkills[skillTypeName] = [];
        }

        // Добавляем текущий навык в массив соответствующего типа навыков
        groupedSkills[skillTypeName].push(`${skill_name} ${next_grade_level}`);
      });

      // Преобразуем groupedSkills в массив объектов с нужной структурой
      const result = Object.keys(groupedSkills).map((skillTypeName) => ({
        skill: skillTypeName,
        nextSkills: groupedSkills[skillTypeName]
      }));

      state.empSkillsList = result;
    },

    /**
     * Обновление данных для радара сотрудника.
     * Обрабатывает данные и создаёт массив объектов с уровнем навыков для разных типов навыков.
     */
    setEmpRadar(state) {
      const dataArrays = state.data[1];
      const longestArray = dataArrays.reduce((a, b) => (a.length > b.length ? a : b), []);

      const skillDataMap = dataArrays.reduce((acc, array, index) => {
        array.forEach((item) => {
          if (!acc[item.skill_type]) {
            acc[item.skill_type] = { skill_type: item.skill_type, skill_name: SKILL_TYPES[item.skill_type] };
          }
          if (index === 0) acc[item.skill_type].avg_skill_grade_department = item.avg_skill_grade_department;
          if (index === 1) acc[item.skill_type].avg_skill_grade_position = item.avg_skill_grade_position;
          if (index === 2) acc[item.skill_type].avg_skill_grade_employee = item.avg_skill_grade_employee;
        });
        return acc;
      }, {});

      const mergedData = longestArray.map((item) => ({
        skill_type: item.skill_type,
        skill_name: SKILL_TYPES[item.skill_type],
        avg_skill_grade_department: skillDataMap[item.skill_type].avg_skill_grade_department || 0,
        avg_skill_grade_position: skillDataMap[item.skill_type].avg_skill_grade_position || 0,
        avg_skill_grade_employee: skillDataMap[item.skill_type].avg_skill_grade_employee || 0
      }));

      const skillTypes = EMP_DASHES_REQUESTS.empRadar[0].filters.skill_type.slice(1);

      // Создание массива объектов с инициализированными значениями
      let result = skillTypes.map((skillType) => ({
        skill_type: SKILL_TYPES[skillType],
        level: 0,
        midDepLevel: 0,
        midPosLevel: 0
      }));

      // Заполнение полей level и midLevel
      mergedData.forEach((item) => {
        let found = result.find((obj) => obj.skill_type === SKILL_TYPES[item.skill_type]);
        if (found) {
          found.level = (item.avg_skill_grade_employee as number) || 0;
          found.midDepLevel = (item.avg_skill_grade_department as number) || 0;
          found.midPosLevel = (item.avg_skill_grade_position as number) || 0;
        }
      });

      state.empRadar = result;
    },

    /**
     * Обновление данных для карточки сотрудника.
     * Преобразует данные в формат, подходящий для отображения в карточке.
     */
    setEmpCard(state) {
      const skillOrder = EMP_DASHES_REQUESTS.empCard[0].filters.skill_type.slice(1);
      const transformed = {};

      state.data[2][0].forEach((item) => {
        const skillType = item.skill_type;
        const skillLevel = SKILL_LEVEL[item.dim_skill_level_skill_level_key];

        if (!transformed[skillType]) {
          transformed[skillType] = [];
        }

        transformed[skillType].push(`${item.skill_name} ${skillLevel}`);
      });
      const result = [];

      for (const skillType of skillOrder) {
        if (transformed[skillType]) {
          result.push({ skill_type: SKILL_TYPES[skillType], value: transformed[skillType] });
        } else {
          result.push({ skill_type: SKILL_TYPES[skillType], value: [] });
        }
      }

      result.unshift({ skill_type: 'ФИО', value: [state.employee.fullname] });

      state.empCard = result;
    },

    /**
     * Обновление данных для графика "Stacked Area".
     * Обрабатывает данные, разделяет их на два типа и заполняет соответствующие объекты.
     */
    setEmpStackedArea(state) {
      const type3 = [];
      const type4 = [];

      // Инициализация объектов для каждого сектора
      Object.keys(SKILL_KEYS).forEach((key) => {
        const sectorKey = parseInt(key, 10);
        const sectorName = SKILL_KEYS[key];
        const skillObj = { name: sectorName, level: 0 };

        if (sectorKey >= 43 && sectorKey <= 50) {
          type3.push(skillObj);
        } else {
          type4.push(skillObj);
        }
      });

      // Заполнение данных для type3 и type4
      state.data[3][0].forEach((item) => {
        const key = item.dim_skills_skill_key;
        const level = item.current_skill_level;
        //@ts-ignore
        if (key >= 43 && key <= 50) {
          const obj = type3.find((obj) => obj.name === SKILL_KEYS[key]);
          if (obj) obj.level = level;
        } else {
          const obj = type4.find((obj) => obj.name === SKILL_KEYS[key]);
          if (obj) obj.level = level;
        }
      });

      state.empStackedArea = [type3, type4];
    },

    /**
     * Обновление данных для графика "Bar".
     * Обрабатывает данные и заполняет их для отображения по годам.
     */
    setEmpBar(state) {
      const result = {};

      state.data[4][0].forEach(({ skill_name, calendar_year, max_skill_grade_employee }) => {
        if (!result[skill_name]) {
          result[skill_name] = {};
        }
        result[skill_name][calendar_year] = max_skill_grade_employee;
      });

      Object.keys(result).forEach((skill) => {
        const years = result[skill];
        if (!years[2022]) {
          years[2022] = 0;
        }
        if (!years[2023]) {
          years[2023] = years[2022];
        }
      });

      state.empBar = Object.keys(result).map((skill) => ({
        skill,
        2022: result[skill][2022],
        2023: result[skill][2023]
      }));
    },

    /**
     * Установка данных KPI для сотрудника.
     * @param state Текущее состояние.
     */
    setEmpKpi(state) {
      state.empKpi = state.data[5][0] as EmpKpiT[];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpDash.pending, (state) => {
        state.status = Status.Pending;
        state.data = initialState.data;
      })
      .addCase(fetchEmpDash.fulfilled, (state, action: PayloadAction<CoobDataI[][][]>) => {
        state.status = Status.Fulfilled;
        state.data = action.payload;

        // Обновляем данные для каждого графика
        empDashSlice.caseReducers.setEmpSkillsList(state);
        empDashSlice.caseReducers.setEmpRadar(state);
        empDashSlice.caseReducers.setEmpCard(state);
        empDashSlice.caseReducers.setEmpStackedArea(state);
        empDashSlice.caseReducers.setEmpBar(state);
        empDashSlice.caseReducers.setEmpKpi(state);
      })
      .addCase(fetchEmpDash.rejected, (state) => {
        state.status = Status.Rejected;
        state.data = initialState.data;
      });
  }
});

export const { setEmployee, setEmpSkillsList, setEmpRadar, setEmpCard, setEmpStackedArea, setEmpBar, setEmpKpi } =
  empDashSlice.actions;

export default empDashSlice.reducer;
