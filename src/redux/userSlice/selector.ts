import type { RootState } from "../store";

export const selectUserMain = (state: RootState) => state.user.userMain;
export const selectUserMainLoading = (state: RootState) => state.user.loading;
export const selectUserMainError = (state: RootState) => state.user.error;
