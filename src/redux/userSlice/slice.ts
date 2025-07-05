import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMainPageUser } from "../../services/UserService/service";

import type { UserState, UserMain } from "./type";

export const fetchMainPageUserThunk = createAsyncThunk<UserMain>(
  "user/fetchUserMain",
  async () => (await fetchMainPageUser()).data
);

const initialState: UserState = {
  userMain: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainPageUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainPageUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userMain = action.payload;
      })
      .addCase(fetchMainPageUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export default userSlice.reducer;
