import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { isMenuOpen: false, isInTransition: false },
  reducers: {
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    setIsInTransition: (state, action: { payload: boolean }) => {
      state.isInTransition = action.payload;
    },
  },
});
export const { openMenu, closeMenu, setIsInTransition } = menuSlice.actions;
export default menuSlice.reducer;
