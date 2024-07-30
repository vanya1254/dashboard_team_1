import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEP_DASHES_REQUESTS, KOOB_ID, SCHEMA_NAME, SKILL_KEYS, SKILL_LEVEL, SKILL_TYPES } from '../../../constants';
import { DepDashState, DepSimpleAreaT, DepTagCloudT, FetchDepDashPropsT } from './types';
//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { CoobDataI, Status } from '../../mainTypes';

const { koobDataRequest3 } = KoobDataService;

export const fetchDepDash = createAsyncThunk(
  'empDash/fetchDepDash',
  async (params: FetchDepDashPropsT, thunkAPI): Promise<CoobDataI[][]> => {
    const { allFilters, request } = params;

    const response: CoobDataI[][] = await Promise.all(
      Object.keys(DEP_DASHES_REQUESTS).map((dash, i) =>
        koobDataRequest3(
          KOOB_ID,
          DEP_DASHES_REQUESTS[dash].dimensions,
          DEP_DASHES_REQUESTS[dash].measures,
          {
            ...DEP_DASHES_REQUESTS[dash].filters,
            ...allFilters
          },
          /**
           * пришлось расширить request, чтобы передавать schema_name
           */
          // @ts-ignore
          { schema_name: SCHEMA_NAME, ...request },
          `dashlet-${DEP_DASHES_REQUESTS[dash].comment}`
        )
      )
    );

    console.log(0, response[0]);

    return response;
  }
);

const initialState: DepDashState = {
  data: [],
  depTagCloud: [],
  depSimpleArea: [],
  depStackedMixedBar: [],
  status: Status.Pending
};

export const depDashSlice = createSlice({
  name: 'depDash',
  initialState,
  reducers: {
    setDepTagCloud(state) {
      //TODO: if [0].department === [1].department => [i]position
      state.depTagCloud = state.data[0].map((obj) => ({
        value: obj.department as string,
        count: obj.count_skill_per_year_employee as number
      }));
    },
    setDepSimpleArea(state) {
      state.depSimpleArea = state.data[1] as DepSimpleAreaT[];
    },
    setDepStackedMixedBar(state) {
      const result = [];

      state.data[2].forEach((item) => {
        // Ищем, есть ли уже объект с таким же названием навыка
        let skillObject = result.find((obj) => obj.name === item.skill_name);

        if (!skillObject) {
          // Если объекта с таким названием навыка еще нет, создаем новый объект
          skillObject = {
            name: item.skill_name,
            prev_count_expert_department: 0,
            prev_count_junior_department: 0,
            prev_count_middle_department: 0,
            prev_count_novice_department: 0,
            prev_count_senior_department: 0,
            cur_count_expert_department: 0,
            cur_count_junior_department: 0,
            cur_count_middle_department: 0,
            cur_count_novice_department: 0,
            cur_count_senior_department: 0
          };
          result.push(skillObject);
        }

        // Заполняем поля в зависимости от года
        if (item.calendar_year === 2022) {
          skillObject.prev_count_expert_department = item.count_expert_department;
          skillObject.prev_count_junior_department = item.count_junior_department;
          skillObject.prev_count_middle_department = item.count_middle_department;
          skillObject.prev_count_novice_department = item.count_novice_department;
          skillObject.prev_count_senior_department = item.count_senior_department;
        } else if (item.calendar_year === 2023) {
          skillObject.cur_count_expert_department = item.count_expert_department;
          skillObject.cur_count_junior_department = item.count_junior_department;
          skillObject.cur_count_middle_department = item.count_middle_department;
          skillObject.cur_count_novice_department = item.count_novice_department;
          skillObject.cur_count_senior_department = item.count_senior_department;
        }
      });

      state.depStackedMixedBar = result;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepDash.pending, (state) => {
        state.data = initialState.data;
        state.status = Status.Pending;
      })
      .addCase(fetchDepDash.fulfilled, (state, action: PayloadAction<CoobDataI[][]>) => {
        state.data = action.payload;
        state.status = Status.Fulfilled;

        // Данные под каждый дэшлет
        depDashSlice.caseReducers.setDepTagCloud(state);
        depDashSlice.caseReducers.setDepSimpleArea(state);
        depDashSlice.caseReducers.setDepStackedMixedBar(state);
      })
      .addCase(fetchDepDash.rejected, (state) => {
        state.data = initialState.data;
        state.status = Status.Rejected;
      });
  }
});

export const { setDepSimpleArea, setDepStackedMixedBar } = depDashSlice.actions;

export default depDashSlice.reducer;
