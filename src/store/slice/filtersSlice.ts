import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  city: string;
}

const initialState: FiltersState = {
  city: 'all',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { setCity } = filtersSlice.actions;

export default filtersSlice.reducer;
