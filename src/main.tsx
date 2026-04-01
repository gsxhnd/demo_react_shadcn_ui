import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { initTheme } from "@/store/slices/themeSlice";
import AppRouter from "@/AppRouter";
import "./index.css";

initTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>,
);
