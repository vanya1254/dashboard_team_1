import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEP_DASHES_REQUESTS, KOOB_ID, SCHEMA_NAME, SKILL_KEYS } from '../../../constants';
import { DepDashState, DepSimpleAreaT, FetchDepDashPropsT } from './types';
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
  depSimpleArea: [],
  depBar: [],
  status: Status.Pending
};

export const depDashSlice = createSlice({
  name: 'depDash',
  initialState,
  reducers: {
    setDepSimpleArea(state) {
      state.depSimpleArea = state.data[0] as DepSimpleAreaT[];
    },
    setDepBar(state) {
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
        depDashSlice.caseReducers.setDepSimpleArea(state);
        // depDashSlice.caseReducers.setDepBar(state);
      })
      .addCase(fetchDepDash.rejected, (state) => {
        state.data = initialState.data;
        state.status = Status.Rejected;
      });
  }
});

export const { setDepSimpleArea, setDepBar } = depDashSlice.actions;

export default depDashSlice.reducer;
