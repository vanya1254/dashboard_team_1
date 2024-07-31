import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { EMP_DASHES_REQUESTS, KOOB_ID, SCHEMA_NAME, SKILL_KEYS, SKILL_LEVEL, SKILL_TYPES } from '../../../constants';
import { EmpDashState, EmpKpiT, FetchEmpDashPropsT } from './types';
//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { CoobDataI, EmployeeT, Status } from '../../mainTypes';
import { RootState } from '../../store';

const { koobDataRequest3 } = KoobDataService;

export const fetchEmpDash = createAsyncThunk(
  'empDash/fetchEmpDash',
  async (params: FetchEmpDashPropsT, thunkAPI): Promise<CoobDataI[][][]> => {
    const { allFilters, request } = params;

    const response: CoobDataI[][][] = await Promise.all(
      Object.entries(EMP_DASHES_REQUESTS).map(([dashReqs, dashArray]) =>
        Promise.all(
          dashArray.map((dash) =>
            koobDataRequest3(
              KOOB_ID,
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
    console.log(3, response[3][0]);
    return response;
  }
);

export const setEmployeeAndFetchDashboard = createAsyncThunk(
  'empDash/setEmployeeAndFetchDashboard',
  async (employees: EmployeeT[], { dispatch, getState }) => {
    if (employees.length) {
      dispatch(setEmployee(employees[0]));
    }
    const state = getState() as RootState;
    const { fullname, position, department } = state.empDash.employee;

    await dispatch(
      fetchEmpDash({
        allFilters: { fullname: ['=', fullname], position: ['=', position], department: ['=', department] }
      })
    );
  }
);

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

export const empDashSlice = createSlice({
  name: 'empDash',
  initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<EmployeeT>) {
      state.employee = action.payload;
    },
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
      console.log([type3, type4]);
      state.empStackedArea = [type3, type4];
    },
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

        // Данные под каждый дэшлет
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
