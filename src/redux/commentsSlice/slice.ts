import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchComments } from "../../services/commentsService/service";

import type { PayloadAction } from "@reduxjs/toolkit";
import { type CommentsState, type CommentsItem } from "./types";

export const fetchCommentsThunk = createAsyncThunk<CommentsItem[], string>(
  "comments/fetchComments",
  async (id: string) => (await fetchComments(id)).data
);

const initialState: CommentsState = {
  comments: null,
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCommentsThunk.fulfilled,
        (state, action: PayloadAction<CommentsItem[]>) => {
          state.loading = false;
          state.comments = action.payload;
        }
      )
      .addCase(fetchCommentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments";
      });
  },
});

export default commentsSlice.reducer;
