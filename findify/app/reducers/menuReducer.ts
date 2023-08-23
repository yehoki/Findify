import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: { selected: 'Home' | 'Search' };
};

const initialState = {
  value: { selected: 'Home' },
} as InitialState;

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<'Home' | 'Search'>) => {
      return { value: { selected: action.payload } };
    },
  },
});

export const { setSelected } = menuSlice.actions;
export default menuSlice.reducer;
