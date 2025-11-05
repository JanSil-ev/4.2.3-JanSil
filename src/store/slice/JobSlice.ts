import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ky from 'ky';
import { fetchData } from '@/types';

interface JobState {
  data: fetchData | null;
  isLoading: boolean;
  error: string | null;
  selectedVacancy: any | null;
}

const initialState: JobState = {
  data: null,
  isLoading: false,
  error: null,
  selectedVacancy: null,
};

export const fetchJob = createAsyncThunk<
  fetchData,
  { query?: string; city?: string; page?: number; skills?: string[] },
  { rejectValue: string }
>(
  'job/fetchJob',
  async ({ query = '', city = 'all', page = 1, skills = [] }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        industry: '7',
        professional_role: '96',
        per_page: '10',
        page: (page - 1).toString(),
      });

      if (query) params.append('text', query);

      if (skills.length > 0) {
        params.append('skill_set ', skills.toString());
      }

      if (city && city !== 'all') {
        const cityMap: Record<string, string> = {
          москва: '1',
          moscow: '1',
          'санкт-петербург': '2',
          spb: '2',
        };

        const normalized = city.toLowerCase().trim();
        const area = cityMap[normalized] || city;
        params.append('area', area);
      }

      const url = `https://api.hh.ru/vacancies?${params.toString()}`;
      const response = await ky.get(url, { headers: { Accept: 'application/json' } });

      return (await response.json()) as fetchData;
    } catch {
      return rejectWithValue('Не удалось загрузить вакансии');
    }
  }
);

export const fetchJobById = createAsyncThunk<any, string, { rejectValue: string }>(
  'job/fetchJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ky.get(`https://api.hh.ru/vacancies/${id}`);
      return await response.json();
    } catch (err: any) {
      console.error('fetchJobById error:', err);
      return rejectWithValue('Не удалось загрузить вакансию');
    }
  }
);

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
      })
      .addCase(fetchJobById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.selectedVacancy = payload;

        if (state.data?.items) {
          const idx = state.data.items.findIndex(
            (item: any) => String(item.id) === String(payload.id)
          );
          if (idx !== -1) {
            state.data.items[idx] = {
              ...state.data.items[idx],
              ...payload,
            };
          }
        }
      })
      .addCase(fetchJobById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Ошибка загрузки вакансии';
      });
  },
});

export default jobSlice.reducer;
