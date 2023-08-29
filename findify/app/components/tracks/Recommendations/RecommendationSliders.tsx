'use client';

import { useSliderRecommendationSelector } from '@/app/store/store';
import RecommendationSlider from './RecommendationSlider';

interface RecommendationSlidersProps {
  analysisData: {
    label: string;
    average: number;
    min: number;
    max: number;
    extraInfo?: string;
  }[];
}

const RecommendationSliders: React.FC<RecommendationSlidersProps> = ({
  analysisData,
}) => {
  const isEmpty = useSliderRecommendationSelector(
    (state) => state.sliderRecommendationReducer.isEmpty
  );
  const analysisValues = useSliderRecommendationSelector(
    (state) => state.sliderRecommendationReducer.analysisValues
  );

  const readProp = (obj: any, prop: string): number => {
    return obj[prop];
  };
  return (
    <ul>
      {analysisData.map((analysisPoint) => (
        <RecommendationSlider
          average={
            isEmpty
              ? analysisPoint.average
              : readProp(analysisValues, analysisPoint.label)
          }
          label={analysisPoint.label}
          key={analysisPoint.label}
          min={analysisPoint.min}
          max={analysisPoint.max}
          extra={analysisPoint.extraInfo}
        />
      ))}
    </ul>
  );
};

export default RecommendationSliders;
