import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'jobSearch',
    initialState: { industries: [], professions: [] },
    reducers: {
        addIndustry(state, action) {
            state.industries.push(action.payload);
        },
        removeIndustry(state, action) {
            state.industries = state.industries.filter(industry => industry !== action.payload);
        },
        addProfession(state, action) {
            state.professions.push(action.payload);
        },
        removeProfession(state, action) {
            state.professions = state.professions.filter(profession => profession !== action.payload);
        }
    }
})

export const { addIndustry, removeIndustry, addProfession, removeProfession } = jobSlice.actions;

export default jobSlice.reducer;