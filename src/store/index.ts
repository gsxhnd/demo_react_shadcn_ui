import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
    },
    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
