import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
    theme: ThemeMode;
}

const getInitialTheme = (): ThemeMode => {
    if (typeof window === "undefined") return "system";

    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
    }

    return "system";
};

const applyTheme = (theme: ThemeMode) => {
    const root = document.documentElement;

    if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", prefersDark);
    } else {
        root.classList.toggle("dark", theme === "dark");
    }
};

const initialState: ThemeState = {
    theme: getInitialTheme(),
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.theme = action.payload;
            localStorage.setItem("theme", action.payload);
            applyTheme(action.payload);
        },
        toggleTheme: (state) => {
            const themes: ThemeMode[] = ["light", "dark", "system"];
            const currentIndex = themes.indexOf(state.theme);
            const nextIndex = (currentIndex + 1) % themes.length;
            const nextTheme = themes[nextIndex];

            state.theme = nextTheme;
            localStorage.setItem("theme", nextTheme);
            applyTheme(nextTheme);
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export const initTheme = () => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored) {
        applyTheme(stored);
    } else {
        applyTheme("system");
    }
};

export default themeSlice.reducer;
