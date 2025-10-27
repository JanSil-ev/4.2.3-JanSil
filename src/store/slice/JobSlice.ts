import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ky from 'ky';
import { fetchData } from '@/types';

interface JobState {
  data: fetchData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: JobState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchJob = createAsyncThunk<
  fetchData,
  { query?: string; city?: string; page?: number },
  { rejectValue: string }
>('job/fetchJob', async ({ query = '', city = 'all', page = 1 }, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams({
      industry: '7',
      professional_role: '96',
      per_page: '10',
      page: (page - 1).toString(),
    });

    if (query) params.append('text', query);
    if (city !== 'all') params.append('area', city);

    const response = await ky.get(`https://api.hh.ru/vacancies?${params.toString()}`);
    return (await response.json()) as fetchData;
  } catch {
    return rejectWithValue('Не удалось загрузить вакансии');
  }
});

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(fetchJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Ошибка загрузки данных';
      });
  },
});

export default jobSlice.reducer;
