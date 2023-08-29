'use client';

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
  return (
    <ul>
      {analysisData.map((analysisPoint) => (
        <RecommendationSlider
          average={analysisPoint.average}
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
