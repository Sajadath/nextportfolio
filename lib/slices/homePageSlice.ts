import { createSlice } from "@reduxjs/toolkit";

const homePageSlice = createSlice({
  name: "homePage",
  initialState: { mountedTime: 0 },
  reducers: {
    setMountedTime: (state, action: { payload: number }) => {
      state.mountedTime = action.payload;
    },
  },
});
export const { setMountedTime } = homePageSlice.actions;
export default homePageSlice.reducer;
