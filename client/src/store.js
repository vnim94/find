import { configureStore } from '@reduxjs/toolkit';
import userReducer from './profile/user.slice';

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store;