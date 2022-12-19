import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import errorsReducer from '../features/errors/errorsSlice'
import textAreaReducer from '../features/textarea/textAreaSlice'
import aiReducer from '../features/ai/aiSlice';
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        user: userReducer,
        textArea: textAreaReducer,
        errors: errorsReducer,
        ai: aiReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})


export type RootState = ReturnType<typeof store.getState>