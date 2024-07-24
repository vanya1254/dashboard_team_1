import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { EMP_DASHES_REQUESTS, KOOB_ID, SCHEMA_NAME, SKILL_LEVEL, SKILL_TYPES } from '../../../constants';
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
    // koobDataRequest3(
    //   KOOB_ID,
    //   ['skill_type'],
    //   ['avg_skill_grade_position'],
    //   { position: ['=', 'Аналитик'], skill_type: ['=', 1] },
    //   /**
    //    * пришлось расширить request, чтобы передавать schema_name
    //    */
    //   // @ts-ignore
    //   { schema_name: SCHEMA_NAME, ...request },
    //   comment || `dashlet`
    // ),
    // koobDataRequest3(
    //   KOOB_ID,
    //   ['avg_skill_grade_employee'],
    //   ['skill_type'],
    //   { fullname: ['=', 'Кожевникова Юлия'] },
    //   /**
    //    * пришлось расширить request, чтобы передавать schema_name
    //    */
    //   // @ts-ignore
    //   { schema_name: SCHEMA_NAME, ...request },
    //   comment || `dashlet`
    // ),

    // console.log('res', response[1]);

    console.log(2, response[1]);

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
        //@ts-ignore
        const nextLevel = SKILL_LEVEL[Math.min(item.dim_skill_level_skill_level_key + 1, 5)];

        const curSkillWithLevel = `${item.skill_name} ${curLevel}`.trim();
        const nextSkillWithLevel = nextLevel !== '' ? `${item.skill_name} ${nextLevel}`.trim() : null;

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
          found.level = item.avg_skill_grade_employee || 0;
          found.midLevel = item.avg_skill_grade_position || 0;
        }
      });
      console.log(result);
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
      })
      .addCase(fetchEmpDash.rejected, (state) => {
        state.data = initialState.data;
        state.status = Status.Rejected;
      });
  }
});

export const { setEmployee, setEmpSkillsList, setEmpRadar, setEmpCard } = empDashSlice.actions;

export default empDashSlice.reducer;
