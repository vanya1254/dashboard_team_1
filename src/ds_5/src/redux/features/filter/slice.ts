import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './types';

import { CoobDataI } from '../../mainTypes';

const initialState: FilterState = {
  position: ['='],
  department: ['='],
  fullname: ['=']
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCurFilter: (state, action: PayloadAction<CoobDataI>) => {
      const key = Object.keys(action.payload)[0];

      if (action.payload[key] === 'Все') {
        state[key] = initialState[key];
      } else {
        state[key][1] = action.payload[key];
      }
    },
    setFullname: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.fullname = ['ilike', `%${action.payload}%`];
      } else {
        state.fullname = initialState.fullname;
      }
    },
    clearCurFilters: (state) => {
      state.position = initialState.position;
      state.department = initialState.department;
      state.fullname = initialState.fullname;
    }
  }
});

export const { setCurFilter, setFullname, clearCurFilters } = filterSlice.actions;

export default filterSlice.reducer;
