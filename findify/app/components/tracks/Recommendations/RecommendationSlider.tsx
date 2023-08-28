'use client';

import { Slider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

interface RecommendationSliderProps {
  label: string;
  defaultValue?: number;
  average: number;
  min: number;
  max: number;
  extra?: string;
}

const RecommendationSlider: React.FC<RecommendationSliderProps> = ({
  label,
  average,
  min,
  max,
  extra,
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#191414',
      },
      secondary: {
        main: '#1DB954',
      },
    },
  });

  const [currentValue, setCurrentValue] = useState(
    parseFloat(average.toFixed(2))
  );

  const handleChange = (event: Event, newValue: number | number[]) => {
    setCurrentValue(newValue as number);
  };

  const step = () => {
    if (min === 0 && max === 1) {
      return 0.01;
    } else return 1;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <li>
          <div className="w-1/3 mx-auto">
            <h4 className="capitalize text-spotifyOffWhite font-semibold text-lg">
              {label}
            </h4>
            <p>
              {currentValue} {extra}
            </p>
            <Slider
              min={min}
              max={max}
              valueLabelDisplay="auto"
              color="secondary"
              defaultValue={parseFloat(average.toFixed(2))}
              step={step()}
              value={currentValue}
              onChange={handleChange}
            />
          </div>
        </li>
      </ThemeProvider>
    </>
  );
};

export default RecommendationSlider;
