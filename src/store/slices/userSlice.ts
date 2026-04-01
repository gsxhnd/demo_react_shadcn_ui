import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface UserState {
    user: User | null;
    isLoading: boolean;
}

const initialState: UserState = {
    user: null,
    isLoading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, setLoading, updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
