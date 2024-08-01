//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { EMPLOYEES_REQUEST, SCHEMA_NAME } from '../../../constants';

import { EmployeesState, FetchEmployeesPropsT } from './types';
import { EmployeeT, Status } from '../../mainTypes';

const { koobDataRequest3 } = KoobDataService;

/**
 * Асинхронная функция для получения данных сотрудников.
 * Отправляет запрос на сервер и возвращает массив сотрудников (EmployeeT[]).
 * @param params Объект с параметрами, включая koobId, measures, allFilters, request и comment.
 * @returns Обещание, разрешающееся массивом сотрудников.
 */
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
       * Расширяем request для включения schema_name.
       */
      // @ts-ignore
      { schema_name: SCHEMA_NAME, sort: ['fullname'], ...request },
      comment || EMPLOYEES_REQUEST.comment
    );

    return response;
  }
);

/**
 * Начальное состояние для сотрудников.
 * Включает массив сотрудников и статус загрузки.
 */
const initialState: EmployeesState = {
  employees: [],
  status: Status.Pending
};

/**
 * Создание слайса состояния для сотрудников.
 * Включает редукторы для обновления данных сотрудников и статуса загрузки.
 */
export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        // Устанавливаем статус загрузки в Pending и очищаем массив сотрудников
        state.employees = initialState.employees;
        state.status = Status.Pending;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<EmployeeT[]>) => {
        // Устанавливаем полученные данные сотрудников и обновляем статус на Fulfilled
        state.employees = action.payload;
        state.status = Status.Fulfilled;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        // Устанавливаем статус загрузки в Rejected и очищаем массив сотрудников
        state.employees = initialState.employees;
        state.status = Status.Rejected;
      });
  }
});

export const {} = employeesSlice.actions;

export default employeesSlice.reducer;
