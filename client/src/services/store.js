import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import messageReducer from './features/messages/messageSlice'

/**
 * Store Redux Toolkit
 */
export const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer
    },
})
