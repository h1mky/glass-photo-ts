import { configureStore } from "@reduxjs/toolkit";
import posts from "./postsSlice/slice";

import user from "./userSlice/slice";

import type { PostsState } from "./postsSlice/types";
import type { UserState } from "./userSlice/type";

export const store = configureStore({
  reducer: {
    posts: posts,
    user: user,
  },
});

export type RootState = {
  posts: PostsState;
  user: UserState;
};
export type AppDispatch = typeof store.dispatch;
