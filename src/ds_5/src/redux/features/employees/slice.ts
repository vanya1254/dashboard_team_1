import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DIMENSIONS, KOOB_ID, MEASURES, SCHEMA_NAME } from '../../../constants';
import { EmployeesState, FetchEmployeesPropsT } from './types';
//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { CoobDataI, Status } from '../../mainTypes';

const { koobDataRequest3 } = KoobDataService;

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (params: FetchEmployeesPropsT, thunkAPI): Promise<CoobDataI[]> => {
    const { measures, allFilters, request, comment } = params;

    const response: CoobDataI[] = await koobDataRequest3(
      KOOB_ID,
      DIMENSIONS.employees,
      measures || MEASURES.employees,
      allFilters,
      /**
       * пришлось расширить request, чтобы передавать schema_name
       */
      // @ts-ignore
      { schema_name: SCHEMA_NAME, ...request },
      comment || 'employees'
    );

    return response;
  }
);

const initialState: EmployeesState = {
  employees: [],
  status: Status.Pending
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ name: string; value: string | number }>) => {},
    clearFilters: (state) => {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.employees = initialState.employees;
        state.status = Status.Pending;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<CoobDataI[]>) => {
        state.employees = action.payload;
        state.status = Status.Fulfilled;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.employees = initialState.employees;
        state.status = Status.Rejected;
      });
  }
});

export const { setFilter, clearFilters } = employeesSlice.actions;

export default employeesSlice.reducer;
