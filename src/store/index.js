import { configureStore } from "@reduxjs/toolkit";
import theme from "./slices/themeSlice.js";
import language from "./slices/languageSlice.js";

const load = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

const preloadedState = {
  theme: load("theme", { mode: "light" }),
  language: load("language", { current: "tr" }),
};

export const store = configureStore({
  reducer: { theme, language },
  preloadedState,
});

const applyRootTheme = (mode) => {
  const root = document.documentElement;
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
};
applyRootTheme(store.getState().theme.mode);

store.subscribe(() => {
  const state = store.getState();
  save("theme", state.theme);
  save("language", state.language);
  applyRootTheme(state.theme.mode);
});

export default store;
