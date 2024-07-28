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
      state.depTagCloud = state.data[0].map((obj) => ({
        value: obj.department as string,
        count: obj.count_last_year_skill as number
      }));
      console.log(state.depTagCloud);
    },
    setDepSimpleArea(state) {
      state.depSimpleArea = state.data[1] as DepSimpleAreaT[];
    },
    setDepStackedMixedBar(state) {
      const result = [];
      const SKILL_LEVEL = {
        novice: 'Novice',
        junior: 'Junior',
        middle: 'Middle',
        senior: 'Senior',
        expert: 'Expert'
        // Добавьте другие уровни, если необходимо
      };

      state.data[2].forEach((item) => {
        // Определение уровня навыка
        const skillLevel = Object.keys(SKILL_LEVEL).find((level) => item[`count_${level}_department`] !== undefined);

        if (!skillLevel) return;

        // Найти или создать объект для данного skill_name
        let skill = result.find((skill) => skill.name === item.skill_name);
        if (!skill) {
          skill = {
            name: item.skill_name,
            prevNovice: 0,
            prevJunior: 0,
            prevMiddle: 0,
            prevSenior: 0,
            prevExpert: 0,
            curNovice: 0,
            curJunior: 0,
            curMiddle: 0,
            curSenior: 0,
            curExpert: 0
          };
          result.push(skill);
        }

        // Обновить счетчик для предыдущего года или текущего года
        if (item.calendar_year === 2022) {
          skill[`prev${SKILL_LEVEL[skillLevel]}`] += item[`count_${skillLevel}_department`];
        } else if (item.calendar_year === 2023) {
          skill[`cur${SKILL_LEVEL[skillLevel]}`] += item[`count_${skillLevel}_department`];
        }
      });

      console.log(result);
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
