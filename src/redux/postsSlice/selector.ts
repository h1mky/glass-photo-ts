import type { RootState } from "../store";

export const selectPosts = (state: RootState) => state.posts.photos;
export const selectPostById = (state: RootState) => state.posts.postById;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectPostByIdLoading = (state: RootState) => state.posts.loading;
export const selectPostByIdError = (state: RootState) => state.posts.error;
