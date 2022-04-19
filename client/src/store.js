import { configureStore } from '@reduxjs/toolkit';
import userReducer from './profile/user.slice';
import jobsReducer from './jobSearch/job.slice';

const store = configureStore({
    reducer: {
        user: userReducer,
        jobSearch: jobsReducer
    }
})

export default store;