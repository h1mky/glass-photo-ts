import type { RootState } from "../store";

// ALL POSTS
export const selectPosts = (state: RootState) => state.posts.photos;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsError = (state: RootState) => state.posts.error;

//POST BY ID
export const selectPostById = (state: RootState) => state.posts.postById;
export const selectPostByIdLoading = (state: RootState) => state.posts.loading;
export const selectPostByIdError = (state: RootState) => state.posts.error;

//USER PAGE POSTS
export const selectUserPosts = (state: RootState) => state.posts.userPosts;
export const selectUserPostsLoading = (state: RootState) => state.posts.loading;
export const selectUserPostsError = (state: RootState) => state.posts.error;
