import { configureStore } from "@reduxjs/toolkit";
import posts from "./postsSlice/slice";

import type { PostsState } from "./postsSlice/types";

export const store = configureStore({
  reducer: {
    posts: posts,
  },
});

export type RootState = {
  posts: PostsState;
};
export type AppDispatch = typeof store.dispatch;
