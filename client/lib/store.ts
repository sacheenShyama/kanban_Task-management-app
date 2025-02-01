import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice/slice";
import boardReducer from "./features/boardSlice/slice";

export const store = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      board:boardReducer
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
