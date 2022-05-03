import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'jobSearch',
    initialState: {
        allLocations: null,
        industries: [], 
        allIndustries: null,
        professions: [],
        workTypes: [],
        payBase: null,
        payCeiling: null,
        timeElapsed: null,
    },
    reducers: {
        setAllLocations(state, action) {
            state.allLocations = action.payload;
        },
        addIndustry(state, action) {
            state.industries.push(action.payload);
        },
        removeIndustry(state, action) {
            state.industries = state.industries.filter(industry => industry.code !== action.payload.code);
        },
        setAllIndustries(state, action) {
            state.allIndustries = action.payload;
        },
        clearIndustries(state) {
            state.industries = [];
        },
    }
})

export const { 
    setAllLocations,
    addIndustry, 
    removeIndustry, 
    setAllIndustries,
    clearIndustries,
} = jobSlice.actions;

export default jobSlice.reducer;