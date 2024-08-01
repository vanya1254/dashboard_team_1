import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import employees from './features/employees/slice';
import filters from './features/filters/slice';
import filter from './features/filter/slice';
import empDash from './features/empDash/slice';
import depDash from './features/depDash/slice';

export const store = configureStore({
  reducer: { employees, filters, filter, empDash, depDash }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
