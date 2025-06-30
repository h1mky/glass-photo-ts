import type { RootState } from "../store";

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) =>
  state.comments.loading;
export const selectCommentsError = (state: RootState) => state.comments.error;
