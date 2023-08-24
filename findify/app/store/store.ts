import { configureStore } from '@reduxjs/toolkit';
import searchResultReducer from '../reducers/searchResultReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    searchResultReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const useMenuSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useSearchSelector: TypedUseSelectorHook<RootState> = useSelector;
