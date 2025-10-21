import { createSlice } from "@reduxjs/toolkit";

const initialState = { current: "en" }; 

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    switchLanguage(state) {
      state.current = state.current === "tr" ? "en" : "tr";
    },
    setLanguage(state, action) {
      state.current = action.payload; 
    },
  },
});

export const { switchLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
