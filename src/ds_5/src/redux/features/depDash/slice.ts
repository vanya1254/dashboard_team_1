//@ts-ignore
import { KoobDataService } from 'bi-internal/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { DEP_DASHES_REQUESTS, SCHEMA_NAME } from '../../../constants';
import { DepDashState, DepSimpleAreaT, FetchDepDashPropsT } from './types';
import { CoobDataI, Status } from '../../mainTypes';

const { koobDataRequest3 } = KoobDataService;

/**
 * Асинхронная функция для получения данных по департаментам.
 * Используется для отправки запросов на сервер и обработки ответов.
 * @param params Объект с параметрами, включая koobId, allFilters и request.
 * @returns Обещание, разрешающееся массивом данных (CoobDataI[][][]).
 */
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

/**
 * Начальное состояние для состояния департаментов.
 * Включает данные, облака тегов, простую область, смешанный бар и статус.
 */
const initialState: DepDashState = {
  data: [],
  depTagCloud: [],
  depSimpleArea: [],
  depStackedMixedBar: [],
  status: Status.Pending
};

/**
 * Создание слайса состояния для департаментов.
 * Включает редукторы для обновления облаков тегов, простой области и смешанного бара.
 */
export const depDashSlice = createSlice({
  name: 'depDash',
  initialState,
  reducers: {
    /**
     * Обновление облака тегов департамента.
     * Преобразует данные в формате массива объектов с полями 'value' и 'count'.
     * Использует данные из state.data[0][0].
     */
    setDepTagCloud(state) {
      state.depTagCloud = state.data[0][0].map((obj) => ({
        value: obj.department as string,
        count: obj.total_grades as number
      }));
    },

    /**
     * Обновление простой области департамента.
     * Преобразует данные в массив объектов DepSimpleAreaT.
     * Использует данные из state.data[1][0].
     */
    setDepSimpleArea(state) {
      state.depSimpleArea = state.data[1][0] as DepSimpleAreaT[];
    },

    /**
     * Обновление смешанного бара департамента.
     * Преобразует данные в объекты с полями для предыдущих и текущих уровней навыков.
     * Данные сгруппированы по навыкам и годам.
     */
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

      // Обработка двух массивов данных
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

        // Обновление состояния для каждого из дэшлетов
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
