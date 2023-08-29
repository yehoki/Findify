'use client';

import { Slider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    setCurrentValue(
      label === 'tempo' || label === 'loudness' || label === 'popularity'
        ? parseFloat(average.toFixed(0))
        : parseFloat(average.toFixed(2))
    );
  }, [average]);

  const step = () => {
    if (min === 0 && max === 1) {
      return 0.01;
    } else return 1;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <li className="px-4">
          <div className="w-full">
            <h4 className="capitalize text-spotifyOffWhite font-semibold text-lg">
              {label}
            </h4>
            <h5 className="text-spotifyOffWhite/80 text-sm">
              {currentValue} {extra}
            </h5>
            <Slider
              min={min}
              max={max}
              valueLabelDisplay="auto"
              color="secondary"
              step={step()}
              value={currentValue}
              onChange={handleChange}
              name={label}
            />
          </div>
        </li>
      </ThemeProvider>
    </>
  );
};

export default RecommendationSlider;
