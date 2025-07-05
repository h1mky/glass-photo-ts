import { configureStore } from "@reduxjs/toolkit";
import posts from "./postsSlice/slice";
import comments from "./commentsSlice/slice";
import user from "./userSlice/slice";

import type { PostsState } from "./postsSlice/types";
import type { CommentsState } from "./commentsSlice/types";
import type { UserState } from "./userSlice/type";

export const store = configureStore({
  reducer: {
    posts: posts,
    comments: comments,
    user: user,
  },
});

export type RootState = {
  posts: PostsState;
  comments: CommentsState;
  user: UserState;
};
export type AppDispatch = typeof store.dispatch;
