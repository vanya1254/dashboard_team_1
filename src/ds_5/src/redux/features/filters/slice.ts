import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FILTERS_REQUESTS, KOOB_ID, SCHEMA_NAME } from '../../../constants';
import { FiltersState, FetchFiltersPropsT } from './types';
//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { CoobDataI, Status } from '../../mainTypes';

const { koobDataRequest3 } = KoobDataService;

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async (params: FetchFiltersPropsT, thunkAPI): Promise<CoobDataI[][]> => {
    const { request, comment } = params;

    const response: CoobDataI[][] = await Promise.all(
      Object.keys(FILTERS_REQUESTS).map((filter) =>
        koobDataRequest3(
          KOOB_ID,
          FILTERS_REQUESTS[filter].dimensions,
          FILTERS_REQUESTS[filter].measures,
          FILTERS_REQUESTS[filter].filters,
          /**
           * пришлось расширить request, чтобы передавать schema_name
           */
          // @ts-ignore
          { schema_name: SCHEMA_NAME, ...FILTERS_REQUESTS[filter].request, ...request },
          comment || `filter-${FILTERS_REQUESTS[filter].comment}`
        )
      )
    );

    return response;
  }
);

const initialState: FiltersState = {
  filters: [],
  status: Status.Pending
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filters = initialState.filters;
        state.status = Status.Pending;
      })
      .addCase(fetchFilters.fulfilled, (state, action: PayloadAction<CoobDataI[][]>) => {
        state.filters = action.payload.map((filterArr) => {
          const allFilter = {};
          allFilter[Object.keys(filterArr[0])[0]] = 'Все';
          filterArr.unshift(allFilter);

          return filterArr;
        });
        state.status = Status.Fulfilled;
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filters = initialState.filters;
        state.status = Status.Rejected;
      });
  }
});

export const {} = filtersSlice.actions;

export default filtersSlice.reducer;
