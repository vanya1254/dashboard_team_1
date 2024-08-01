//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FILTERS_REQUESTS, SCHEMA_NAME } from '../../../constants';

import { FiltersState, FetchFiltersPropsT } from './types';
import { CoobDataI, Status } from '../../mainTypes';

const { koobDataRequest3 } = KoobDataService;

/**
 * Асинхронный thunk для получения данных фильтров.
 * Запрашивает фильтры из API на основе параметров и возвращает ответ.
 * @param params Параметры запроса, включая идентификатор и запросы.
 * @param thunkAPI Контекст для работы с thunk.
 * @returns Массив массивов данных фильтров.
 */
export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async (params: FetchFiltersPropsT, thunkAPI): Promise<CoobDataI[][]> => {
    const { koobId, request, comment } = params;

    const response: CoobDataI[][] = await Promise.all(
      Object.keys(FILTERS_REQUESTS).map((filter) =>
        koobDataRequest3(
          koobId,
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

/**
 * Создание слайса состояния фильтров.
 * Включает редукторы для обработки состояния запросов на получение фильтров.
 */
export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /**
       * Обрабатывает состояние при начале запроса фильтров.
       * Устанавливает статус в "Pending" и сбрасывает фильтры в начальное состояние.
       */
      .addCase(fetchFilters.pending, (state) => {
        state.filters = initialState.filters;
        state.status = Status.Pending;
      })
      /**
       * Обрабатывает состояние при успешном получении фильтров.
       * Обновляет фильтры в состоянии и устанавливает статус в "Fulfilled".
       * Добавляет фильтр "Все" в начало каждого массива фильтров.
       */
      .addCase(fetchFilters.fulfilled, (state, action: PayloadAction<CoobDataI[][]>) => {
        state.filters = action.payload.map((filterArr) => {
          const allFilter = {};
          allFilter[Object.keys(filterArr[0])[0]] = 'Все';
          filterArr.unshift(allFilter);

          return filterArr;
        });
        state.status = Status.Fulfilled;
      })
      /**
       * Обрабатывает состояние при ошибке запроса фильтров.
       * Устанавливает фильтры в начальное состояние и устанавливает статус в "Rejected".
       */
      .addCase(fetchFilters.rejected, (state) => {
        state.filters = initialState.filters;
        state.status = Status.Rejected;
      });
  }
});

export const {} = filtersSlice.actions;

export default filtersSlice.reducer;
