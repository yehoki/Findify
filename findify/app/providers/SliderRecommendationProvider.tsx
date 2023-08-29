'use client';

import { store } from '../store/store';
import { Provider } from 'react-redux';

interface SliderRecommendationProviderProps {
  children: React.ReactNode;
}

const SliderRecommendationProvider: React.FC<
  SliderRecommendationProviderProps
> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default SliderRecommendationProvider;
