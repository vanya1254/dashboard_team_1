//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { DEP_DASHES_REQUESTS, SCHEMA_NAME } from '../../../constants';

import { DepDashState, DepSimpleAreaT, FetchDepDashPropsT } from './types';
import { CoobDataI, Status } from '../../mainTypes';

const { koobDataRequest3 } = KoobDataService;

export const fetchDepDash = createAsyncThunk(
  'empDash/fetchDepDash',
  async (params: FetchDepDashPropsT, thunkAPI): Promise<CoobDataI[][][]> => {
    const { koobId, allFilters, request } = params;

    const response: CoobDataI[][][] = await Promise.all(
      Object.entries(DEP_DASHES_REQUESTS).map(([dashReqs, dashArray]) =>
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
      state.depTagCloud = state.data[0][0].map((obj) => ({
        value: obj.department as string,
        count: obj.total_grades as number
      }));
    },
    setDepSimpleArea(state) {
      state.depSimpleArea = state.data[1][0] as DepSimpleAreaT[];
    },
    setDepStackedMixedBar(state) {
      const processArray = (array) => {
        let result = [];

        array.forEach((item) => {
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

        return result;
      };

      // Обработка двух массивов
      // Обновляем состояние
      state.depStackedMixedBar = [processArray(state.data[2][0]), processArray(state.data[2][1])];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepDash.pending, (state) => {
        state.data = initialState.data;
        state.status = Status.Pending;
      })
      .addCase(fetchDepDash.fulfilled, (state, action: PayloadAction<CoobDataI[][][]>) => {
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

export const { setDepTagCloud, setDepSimpleArea, setDepStackedMixedBar } = depDashSlice.actions;

export default depDashSlice.reducer;
