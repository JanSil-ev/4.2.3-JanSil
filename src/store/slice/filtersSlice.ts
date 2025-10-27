import { AppDispatch } from '..';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJob } from './JobSlice';

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

export const updateCityAndFetch =
  (city: string) => (dispatch: AppDispatch, getState: () => any) => {
    dispatch(setCity(city));

    const { skills } = getState().skills;
    const query = skills?.join(' ') || '';
    dispatch(fetchJob({ query, city }));
  };

export default filtersSlice.reducer;
