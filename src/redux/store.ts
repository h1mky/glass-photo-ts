import { configureStore } from "@reduxjs/toolkit";
import posts from "./postsSlice/slice";
import comments from "./commentsSlice/slice";

import type { PostsState } from "./postsSlice/types";
import type { CommentsState } from "./commentsSlice/types";

export const store = configureStore({
  reducer: {
    posts: posts,
    comments: comments,
  },
});

export type RootState = {
  posts: PostsState;
  comments: CommentsState;
};
export type AppDispatch = typeof store.dispatch;
