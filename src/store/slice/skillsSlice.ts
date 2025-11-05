import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export default skillsSlice.reducer;
