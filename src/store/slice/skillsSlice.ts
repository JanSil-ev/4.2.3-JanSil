import { AppDispatch } from '..';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJob } from './JobSlice';

interface SkillsState {
  skills: string[];
  debounceTimer: ReturnType<typeof setTimeout> | null;
}

const initialState: SkillsState = {
  skills: ['TypeScript', 'React', 'Redux'],
  debounceTimer: null,
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addSkill: (state, action: PayloadAction<string>) => {
      const trimmed = action.payload.trim();
      if (trimmed && !state.skills.includes(trimmed)) {
        state.skills.push(trimmed);
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((s) => s !== action.payload);
    },
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    clearDebounce: (state) => {
      if (state.debounceTimer) {
        clearTimeout(state.debounceTimer);
        state.debounceTimer = null;
      }
    },
    setDebounce: (state, action: PayloadAction<ReturnType<typeof setTimeout>>) => {
      state.debounceTimer = action.payload;
    },
  },
});

export const { addSkill, removeSkill, setSkills, clearDebounce, setDebounce } = skillsSlice.actions;

export const updateSkillsAndFetch =
  (newSkills: string[]) => (dispatch: AppDispatch, getState: () => any) => {
    const { debounceTimer } = getState().skills;
    const { city } = getState().filters;
    if (debounceTimer) clearTimeout(debounceTimer);

    dispatch(setSkills(newSkills));

    const timer = setTimeout(() => {
      const query = newSkills.join(' ');
      dispatch(fetchJob({ query, city }));
    }, 500);

    dispatch(setDebounce(timer));
  };

export default skillsSlice.reducer;
