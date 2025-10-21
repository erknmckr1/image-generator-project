import { createSlice } from "@reduxjs/toolkit";
interface LanguageState {
  language: string;
}
const initialState: LanguageState = {
  language: "tr",
};
const languageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
