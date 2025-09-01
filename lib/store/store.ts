import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/lib/slices/menuSlice";
import homePageReducer from "@/lib/slices/homePageSlice";
export const makeStore = () => {
  return configureStore({
    reducer: { menu: menuReducer, homePage: homePageReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
