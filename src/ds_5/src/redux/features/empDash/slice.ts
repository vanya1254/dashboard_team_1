import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { EMP_DASHES_REQUESTS, KOOB_ID, SCHEMA_NAME, SKILL_KEYS, SKILL_LEVEL, SKILL_TYPES } from '../../../constants';
import { EmpDashState, FetchEmpDashPropsT } from './types';
//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { CoobDataI, EmployeeT, Status } from '../../mainTypes';
import { RootState } from '../../store';

const { koobDataRequest3 } = KoobDataService;

export const fetchEmpDash = createAsyncThunk(
  'empDash/fetchEmpDash',
  async (params: FetchEmpDashPropsT, thunkAPI): Promise<CoobDataI[][]> => {
    const { allFilters, request } = params;

    const response: CoobDataI[][] = await Promise.all(
      Object.keys(EMP_DASHES_REQUESTS).map((dash, i) =>
        koobDataRequest3(
          KOOB_ID,
          EMP_DASHES_REQUESTS[dash].dimensions,
          EMP_DASHES_REQUESTS[dash].measures,
          {
            ...EMP_DASHES_REQUESTS[dash].filters,
            ...allFilters
          },
          /**
           * пришлось расширить request, чтобы передавать schema_name
           */
          // @ts-ignore
          { schema_name: SCHEMA_NAME, ...request },
          `dashlet-${EMP_DASHES_REQUESTS[dash].comment}`
        )
      )
    );

    console.log(4, response[4]);

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
  employee: { fullname: '', position: '', department: '', fact_empl_skills_employee_key: 0 },
  data: [],
  empSkillsList: [],
  empRadar: [],
  empCard: [],
  empStackedArea: [],
  empBar: [],
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
      const processedData = state.data[0].reduce((acc, item) => {
        const curLevel = SKILL_LEVEL[item.dim_skill_level_skill_level_key];
        const nextLevel = item.next_grade_level;

        const curSkillWithLevel = `${item.skill_name} ${curLevel}`.trim();
        const nextSkillWithLevel = nextLevel ? `${item.skill_name} ${nextLevel}`.trim() : null;

        const skillTypeName = SKILL_TYPES[item.skill_type];

        const existingItem = acc.find((i) => i.skill === skillTypeName);
        if (existingItem) {
          existingItem.curSkills.push(curSkillWithLevel);
          if (nextSkillWithLevel) {
            existingItem.nextSkills.push(nextSkillWithLevel);
          }
        } else {
          acc.push({
            skill: skillTypeName,
            curSkills: [curSkillWithLevel],
            nextSkills: nextSkillWithLevel ? [nextSkillWithLevel] : []
          });
        }
        return acc;
      }, []);

      state.empSkillsList = processedData;
    },
    setEmpRadar(state) {
      const skillTypes = EMP_DASHES_REQUESTS.empRadar.filters.skill_type.slice(1);

      // Создание массива объектов с инициализированными значениями
      let result = skillTypes.map((skillType) => ({
        skill_type: SKILL_TYPES[skillType],
        level: 0,
        midLevel: 0
      }));

      // Заполнение полей level и midLevel
      state.data[1].forEach((item) => {
        let found = result.find((obj) => obj.skill_type === SKILL_TYPES[item.skill_type]);
        if (found) {
          found.level = (item.avg_skill_grade_employee as number) || 0;
          found.midLevel = (item.avg_skill_grade_position as number) || 0;
        }
      });

      state.empRadar = result;
    },
    setEmpCard(state) {
      const skillOrder = EMP_DASHES_REQUESTS.empCard.filters.skill_type.slice(1);
      const transformed = {};

      state.data[2].forEach((item) => {
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
      state.data[3].forEach((item) => {
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
    setEmpBar(state) {
      const result = {};

      state.data[4].forEach(({ skill_name, calendar_year, max_skill_grade_employee }) => {
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

      console.log(state.empBar);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpDash.pending, (state) => {
        state.data = initialState.data;
        state.status = Status.Pending;
      })
      .addCase(fetchEmpDash.fulfilled, (state, action: PayloadAction<CoobDataI[][]>) => {
        state.data = action.payload;
        state.status = Status.Fulfilled;
        // Данные под каждый дэшлет
        empDashSlice.caseReducers.setEmpSkillsList(state);
        empDashSlice.caseReducers.setEmpRadar(state);
        empDashSlice.caseReducers.setEmpCard(state);
        empDashSlice.caseReducers.setEmpStackedArea(state);
        empDashSlice.caseReducers.setEmpBar(state);
      })
      .addCase(fetchEmpDash.rejected, (state) => {
        state.data = initialState.data;
        state.status = Status.Rejected;
      });
  }
});

export const { setEmployee, setEmpSkillsList, setEmpRadar, setEmpCard, setEmpStackedArea, setEmpBar } =
  empDashSlice.actions;

export default empDashSlice.reducer;
