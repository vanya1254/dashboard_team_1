import { configureStore } from '@reduxjs/toolkit';
import employer from './features/employer/slice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: { employer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
