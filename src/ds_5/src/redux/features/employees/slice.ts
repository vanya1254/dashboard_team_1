import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { EMPLOYEES_REQUEST, SCHEMA_NAME } from '../../../constants';
import { EmployeesState, FetchEmployeesPropsT } from './types';
//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { CoobDataI, EmployeeT, Status } from '../../mainTypes';

const { koobDataRequest3 } = KoobDataService;

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (params: FetchEmployeesPropsT, thunkAPI): Promise<EmployeeT[]> => {
    const { koobId, measures, allFilters, request, comment } = params;

    const response: EmployeeT[] = await koobDataRequest3(
      koobId,
      EMPLOYEES_REQUEST.dimensions,
      measures || EMPLOYEES_REQUEST.measures,
      allFilters,
      /**
       * пришлось расширить request, чтобы передавать schema_name
       */
      // @ts-ignore
      { schema_name: SCHEMA_NAME, sort: ['fullname'], ...request },
      comment || EMPLOYEES_REQUEST.comment
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.employees = initialState.employees;
        state.status = Status.Pending;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<EmployeeT[]>) => {
        state.employees = action.payload;
        state.status = Status.Fulfilled;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.employees = initialState.employees;
        state.status = Status.Rejected;
      });
  }
});

export const {} = employeesSlice.actions;

export default employeesSlice.reducer;
