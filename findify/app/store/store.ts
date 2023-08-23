import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../reducers/menuReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useMenuSelector: TypedUseSelectorHook<RootState> = useSelector;
