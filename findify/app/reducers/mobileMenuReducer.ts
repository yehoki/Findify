import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isOpen: boolean;
};

const initialState = {
  isOpen: false,
} as InitialState;

const mobileMenuSlice = createSlice({
  name: 'mobileMenuSlice',
  initialState: initialState,
  reducers: {
    onOpen: () => {
      return { isOpen: true };
    },
    onClose: () => {
      return { isOpen: false };
    },
  },
});

export const { onOpen, onClose } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
