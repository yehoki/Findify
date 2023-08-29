import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

type AnalysisValues = {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  loudness: number;
  popularity: number;
  speechiness: number;
  tempo: number;
  valence: number;
};

type InitialState = {
  isEmpty: boolean;
  currentTrack: string;
  analysisValues: AnalysisValues;
};

const initialState = {
  isEmpty: true,
  currentTrack: '',
  analysisValues: {
    acousticness: 0,
    danceability: 0,
    energy: 0,
    instrumentalness: 0,
    liveness: 0,
    loudness: 0,
    popularity: 0,
    speechiness: 0,
    tempo: 0,
    valence: 0,
  },
} as InitialState;

const sliderRecommendationSlice = createSlice({
  name: 'sliderRecommendation',
  initialState: initialState,
  reducers: {
    clearValues: (state) => {
      return initialState;
    },
    setValues: (
      state,
      action: PayloadAction<{
        analysis: AnalysisValues;
        currentTrackName: string;
      }>
    ) => {
      return {
        isEmpty: false,
        analysisValues: action.payload.analysis,
        currentTrack: action.payload.currentTrackName,
      };
    },
  },
});

export const { clearValues, setValues } = sliderRecommendationSlice.actions;
export default sliderRecommendationSlice.reducer;
