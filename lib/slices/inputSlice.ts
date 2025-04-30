import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
  name: "input",
  initialState: "mouse",
  reducers: {
    setMouse: () => "mouse",
    setTouch: () => "touch",
  },
});
export const { setMouse, setTouch } = inputSlice.actions;
export default inputSlice.reducer;
