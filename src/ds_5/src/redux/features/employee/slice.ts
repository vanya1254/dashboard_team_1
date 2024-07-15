import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { KOOB_ID } from '../../../constants';
import { EmployeeState, FetchCoobDataPropsT } from './types';
//@ts-ignore
import { KoobDataService } from 'bi-internal/services';

const { koobDataRequest3 } = KoobDataService;

export const fetchCoobData = createAsyncThunk(
  'Dashboard1/fetchCoobData',
  async (params: FetchCoobDataPropsT, thunkAPI) => {
    const { dimensions, measures, allFilters, request, comment } = params;

    const response = await koobDataRequest3(
      KOOB_ID,
      dimensions,
      measures,
      allFilters,
      /**
       * пришлось расширить request, чтобы передавать schema_name
       */
      // @ts-ignore
      request,
      comment
    );

    return response;
  }
);

const initialState: EmployeeState = {
  data: []
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ name: string; value: string | number }>) => {},
    clearFilters: (state) => {}
  }
});

export const { setFilter, clearFilters } = employeeSlice.actions;

export default employeeSlice.reducer;
