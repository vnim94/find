import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
    name: 'company',
    initialState: { details: null },
    reducers: {
        setCompany(state, action) {
            state.details = action.payload;
        }
    }
})

export const { setCompany } = companySlice.actions;

export default companySlice.reducer;