import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_FILTERS,
  DIMENSIONS,
  KOOB_ID,
  MEASURES,
  SCHEMA_NAME,
  SKILL_LEVEL,
  SKILL_TYPES
} from '../../../constants';
import { EmpDashState, FetchEmpDashPropsT } from './types';
//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { CoobDataI, EmployeeT, Status } from '../../mainTypes';

const { koobDataRequest3 } = KoobDataService;

export const fetchEmpDash = createAsyncThunk(
  'empDash/fetchEmpDash',
  async (params: FetchEmpDashPropsT, thunkAPI): Promise<CoobDataI[]> => {
    const { request, comment } = params;

    const response: CoobDataI[] = await koobDataRequest3(
      KOOB_ID,
      DIMENSIONS.empSkillsList,
      [],
      { ...DEFAULT_FILTERS.empSkillsList, fullname: ['=', 'Кожевникова Юлия'] },
      /**
       * пришлось расширить request, чтобы передавать schema_name
       */
      // @ts-ignore
      { schema_name: SCHEMA_NAME, ...request },
      comment || `dashlet`
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

    console.log('res', response);

    return response;
  }
);

const initialState: EmpDashState = {
  employee: { fullname: '', position: '', department: '', fact_empl_skills_employee_key: 0 },
  data: [],
  empSkillsList: [],
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
      const processedData = state.data.reduce((acc, item) => {
        const curLevel = SKILL_LEVEL[item.current_skill_level];
        //@ts-ignore
        const nextLevel = SKILL_LEVEL[Math.min(item.current_skill_level + 1, 5)];

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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpDash.pending, (state) => {
        state.data = initialState.data;
        state.status = Status.Pending;
      })
      .addCase(fetchEmpDash.fulfilled, (state, action: PayloadAction<CoobDataI[]>) => {
        state.data = action.payload;
        state.status = Status.Fulfilled;
      })
      .addCase(fetchEmpDash.rejected, (state) => {
        state.data = initialState.data;
        state.status = Status.Rejected;
      });
  }
});

export const { setEmployee, setEmpSkillsList } = empDashSlice.actions;

export default empDashSlice.reducer;
