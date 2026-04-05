import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore, type EnhancedStore } from "@reduxjs/toolkit";
import { type UnknownAction } from "redux";
import themeReducer, {
    setTheme,
    toggleTheme,
    type ThemeMode,
} from "@/store/slices/themeSlice";

describe("themeSlice", () => {
    let store: EnhancedStore<{ theme: { theme: ThemeMode } }, UnknownAction>;

    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        store = configureStore({
            reducer: { theme: themeReducer },
        });
    });

    describe("initial state", () => {
        it("should have system as default theme", () => {
            const state = store.getState().theme;
            expect(state.theme).toBe("system");
        });
    });

    describe("setTheme", () => {
        it("should set theme to light", () => {
            store.dispatch(setTheme("light"));
            expect(store.getState().theme.theme).toBe("light");
            expect(localStorage.getItem("theme")).toBe("light");
        });

        it("should set theme to dark", () => {
            store.dispatch(setTheme("dark"));
            expect(store.getState().theme.theme).toBe("dark");
            expect(localStorage.getItem("theme")).toBe("dark");
        });

        it("should set theme to system", () => {
            store.dispatch(setTheme("system"));
            expect(store.getState().theme.theme).toBe("system");
            expect(localStorage.getItem("theme")).toBe("system");
        });

        it("should persist theme to localStorage", () => {
            (["light", "dark", "system"] as ThemeMode[]).forEach((theme) => {
                store.dispatch(setTheme(theme));
                expect(localStorage.getItem("theme")).toBe(theme);
            });
        });
    });

    describe("toggleTheme", () => {
        it("should toggle from system to light", () => {
            store.dispatch(setTheme("system"));
            store.dispatch(toggleTheme());
            expect(store.getState().theme.theme).toBe("light");
        });

        it("should toggle from light to dark", () => {
            store.dispatch(setTheme("light"));
            store.dispatch(toggleTheme());
            expect(store.getState().theme.theme).toBe("dark");
        });

        it("should toggle from dark to system", () => {
            store.dispatch(setTheme("dark"));
            store.dispatch(toggleTheme());
            expect(store.getState().theme.theme).toBe("system");
        });

        it("should cycle through all themes", () => {
            store.dispatch(setTheme("system"));
            expect(store.getState().theme.theme).toBe("system");

            store.dispatch(toggleTheme());
            expect(store.getState().theme.theme).toBe("light");

            store.dispatch(toggleTheme());
            expect(store.getState().theme.theme).toBe("dark");

            store.dispatch(toggleTheme());
            expect(store.getState().theme.theme).toBe("system");
        });
    });
});
