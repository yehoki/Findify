'use client';

import { Slider } from '@mui/material';

interface RecommendationSliderProps {}

const RecommendationSlider: React.FC<RecommendationSliderProps> = ({}) => {
  return (
    <div className="w-1/2 mx-auto">
      <Slider min={0} max={1} step={0.01} valueLabelDisplay="auto" />
    </div>
  );
};

export default RecommendationSlider;
