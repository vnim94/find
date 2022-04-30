import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'jobSearch',
    initialState: {
        sortByDate: false,
        title: '',
        jobs: null, 
        totalJobs: null,
        currentPage: 1,
        totalPages: null,
        location: '',
        industries: [], 
        professions: [],
        workTypes: [],
        payBase: null,
        payCeiling: null,
        timeElapsed: null,
        query: {}
    },
    reducers: {
        toggleSort(state, action) {
            state.sortByDate = action.payload;
        },
        setQuery(state, action) {
            state.query = action.payload;
        },
        setTitle(state, action) {
            state.title = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload;
        },
        setJobs(state, action) {
            state.jobs = action.payload;
        },
        setTotalJobs(state, action) {
            state.totalJobs = action.payload;
        },
        setLocation(state, action) {
            state.location = action.payload;
        },
        addIndustry(state, action) {
            state.industries.push(action.payload);
        },
        removeIndustry(state, action) {
            state.industries = state.industries.filter(industry => industry.code !== action.payload.code);
        },
        clearIndustries(state) {
            state.industries = [];
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
    toggleSort,
    setQuery,
    setTitle,
    setCurrentPage,
    setTotalPages,
    setLocation,
    addIndustry, 
    removeIndustry, 
    clearIndustries,
    addProfession, 
    removeProfession, 
    setJobs,
    setTotalJobs,
    addWorkType,
    removeWorkType,
    setPayBase,
    setPayCeiling,
    setTimeElapsed
} = jobSlice.actions;

export default jobSlice.reducer;