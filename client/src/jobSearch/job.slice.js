import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'jobSearch',
    initialState: { 
        jobs: [], 
        locations: [],
        industries: [], 
        professions: [],
        workTypes: [],
        payBase: null,
        payCeiling: null,
        timeElapsed: null 
    },
    reducers: {
        setJobs(state, action) {
            state.jobs = action.payload
        },
        addLocation(state, action) {
            state.locations.push(action.payload);
        },
        removeLocation(state, action) {
            state.locations = state.locations.filter(location => location.city !== action.payload.city && location.suburb !== action.payload.suburb)
        },
        addIndustry(state, action) {
            state.industries.push(action.payload);
        },
        removeIndustry(state, action) {
            state.industries = state.industries.filter(industry => industry.code !== action.payload.code);
        },
        clearIndustries(state) {
            state.industries = []
        },
        addProfession(state, action) {
            state.professions.push(action.payload);
        },
        removeProfession(state, action) {
            state.professions = state.professions.filter(profession => profession.code !== action.payload.code);
        },
        addWorkType(state, action) {
            state.workTypes.push(action.payload);
        },
        removeWorkType(state, action) {
            state.workTypes = state.workTypes.filter(workType => workType !== action.payload);
        },
        setPayBase(state, action) {
            state.payBase = action.payload
        },
        setPayCeiling(state, action) {
            state.payCeiling = action.payload;
        },
        setTimeElapsed(state, action) {
            state.timeElapsed = action.payload;
        }
    }
})

export const { 
    addLocation,
    removeLocation,
    addIndustry, 
    removeIndustry, 
    clearIndustries,
    addProfession, 
    removeProfession, 
    setJobs,
    addWorkType,
    removeWorkType,
    setPayBase,
    setPayCeiling,
    setTimeElapsed
} = jobSlice.actions;

export default jobSlice.reducer;