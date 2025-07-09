import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice/slice";
import type { UserState } from "./userSlice/type";

export const store = configureStore({
  reducer: {
    user: user,
  },
});

export type RootState = {
  user: UserState;
};
export type AppDispatch = typeof store.dispatch;
