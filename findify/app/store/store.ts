import { configureStore } from '@reduxjs/toolkit';
import searchResultReducer from '../reducers/searchResultReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import sliderRecommendationReducer from '../reducers/sliderRecommendationReducer';

export const store = configureStore({
  reducer: {
    sliderRecommendationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const useMenuSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useSearchSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useSliderRecommendationSelector: TypedUseSelectorHook<RootState> =
  useSelector;
