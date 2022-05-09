import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
    name: 'company',
    initialState: { 
        details: null,
        reviewsSummary: null
    },
    reducers: {
        setCompany(state, action) {
            state.details = action.payload;
        },
        setReviewsSummary(state, action) {
            state.reviewsSummary = action.payload;
        }
    }
})

export const { setCompany, setReviewsSummary } = companySlice.actions;

export default companySlice.reducer;