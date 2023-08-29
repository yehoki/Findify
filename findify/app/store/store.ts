import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import sliderRecommendationReducer from '../reducers/sliderRecommendationReducer';
import mobileMenuReducer from '../reducers/mobileMenuReducer';
export const store = configureStore({
  reducer: {
    sliderRecommendationReducer,
    mobileMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSliderRecommendationSelector: TypedUseSelectorHook<RootState> =
  useSelector;

export const useMobileMenuSelector: TypedUseSelectorHook<RootState> =
  useSelector;
