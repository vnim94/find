import { configureStore } from '@reduxjs/toolkit';
import userReducer from './profile/user.slice';
import jobsReducer from './jobSearch/job.slice';
import companyReducer from './companyReviews/company.slice';

const store = configureStore({
    reducer: {
        user: userReducer,
        jobSearch: jobsReducer,
        company: companyReducer
    }
})

export default store;