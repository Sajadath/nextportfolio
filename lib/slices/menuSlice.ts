import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isMenuOpen: boolean;
  links: { href: string; label: string }[];
  isInTransition: boolean;
  transitionTarget: string;
}

const initialState: InitialState = {
  isMenuOpen: false,
  links: [],
  isInTransition: false,
  transitionTarget: "/",
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
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
    setTransitionTarget: (state, action: { payload: string }) => {
      state.transitionTarget = action.payload;
    },
    setLinks: (
      state,
      action: { payload: { href: string; label: string }[] },
    ) => {
      state.links = action.payload;
    },
  },
});
export const {
  openMenu,
  closeMenu,
  setIsInTransition,
  setTransitionTarget,
  setLinks,
} = menuSlice.actions;
export default menuSlice.reducer;
