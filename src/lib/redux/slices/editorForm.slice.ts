import { createSlice } from "@reduxjs/toolkit";
interface EditorFormState {
  selectedFeature: string;
}
const initialState: EditorFormState = {
  selectedFeature: "resolution",
};
const editorFormSlice = createSlice({
  name: "editorForm",
  initialState: initialState,
  reducers: {
    setSelectedFeature: (state, action) => {
      state.selectedFeature = action.payload;
    },
  },
});

export const { setSelectedFeature } = editorFormSlice.actions;
export default editorFormSlice.reducer;
