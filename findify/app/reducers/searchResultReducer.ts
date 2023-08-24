import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: {
    
  }
};

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: {
      query: 'string',
    },
  },
  reducers: {
    // setSelected: (state, action: PayloadAction<'Home' | 'Search'>) => {
    //   return { value: { selected: action.payload } };
    // },
  },
});

// export const { setSelected } = menuSlice.actions;
// export default menuSlice.reducer;
