import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FilterState } from './types';
import { CoobDataI } from '../../mainTypes';

/**
 * Начальное состояние фильтров.
 * Включает фильтры для позиции, отдела, полного имени и типа навыка.
 */
const initialState: FilterState = {
  position: ['='],
  department: ['='],
  fullname: ['='],
  skill_type: ['=']
};

/**
 * Создание слайса состояния фильтров.
 * Включает редукторы для установки текущих фильтров, полного имени и очистки фильтров.
 */
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    /**
     * Устанавливает текущий фильтр на основе предоставленного значения.
     * Если значение равно 'Все' или совпадает с предыдущим значением, фильтр сбрасывается на начальное состояние.
     * В противном случае, фильтр обновляется на новое значение.
     * @param state Текущее состояние фильтров.
     * @param action Объект действия с новым значением фильтра.
     */
    setCurFilter: (state, action: PayloadAction<CoobDataI>) => {
      const key = Object.keys(action.payload)[0];

      if (action.payload[key] === 'Все' || action.payload[key] === state[key][1]) {
        state[key] = initialState[key];
      } else {
        state[key][1] = action.payload[key];
      }
    },

    /**
     * Устанавливает фильтр по полному имени.
     * Если передано значение, фильтр обновляется на 'ilike' с использованием переданного значения.
     * В противном случае, фильтр сбрасывается на начальное состояние.
     * @param state Текущее состояние фильтров.
     * @param action Объект действия с значением полного имени.
     */
    setFullname: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.fullname = ['ilike', `%${action.payload}%`];
      } else {
        state.fullname = initialState.fullname;
      }
    },

    /**
     * Очищает все текущие фильтры, устанавливая их на значения по умолчанию.
     * @param state Текущее состояние фильтров.
     */
    clearCurFilters: (state) => {
      state.position = initialState.position;
      state.department = initialState.department;
      state.fullname = initialState.fullname;
      state.skill_type = initialState.skill_type;
    }
  }
});

export const { setCurFilter, setFullname, clearCurFilters } = filterSlice.actions;

export default filterSlice.reducer;
