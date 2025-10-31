import { AppDispatch } from '..';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJob } from './JobSlice';

interface SkillsState {
  skills: string[];
}

const initialState: SkillsState = {
  skills: ['TypeScript', 'React', 'Redux'],
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
  },
});

export const { addSkill, removeSkill, setSkills } = skillsSlice.actions;

export const updateSkillsAndFetch =
  (newSkills: string[]) => (dispatch: AppDispatch, getState: () => any) => {
    dispatch(setSkills(newSkills));

    const { city } = getState().filters;
    const query = newSkills.join(' ');

    dispatch(fetchJob({ query, city }));
  };

export default skillsSlice.reducer;
