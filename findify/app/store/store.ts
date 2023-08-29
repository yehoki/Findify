import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import sliderRecommendationReducer from '../reducers/sliderRecommendationReducer';

export const store = configureStore({
  reducer: {
    sliderRecommendationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSliderRecommendationSelector: TypedUseSelectorHook<RootState> =
  useSelector;
