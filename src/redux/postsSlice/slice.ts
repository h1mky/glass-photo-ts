import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllPosts,
  fetchPost,
  fetchPostsUser,
} from "../../services/PostService/service";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { Photo, PostsState, PostByID } from "./types";

export const fetchAllPostsThunk = createAsyncThunk<Photo[]>(
  "posts/fetchAllPosts",
  async () => (await fetchAllPosts()).data
);

export const fetchPostThunk = createAsyncThunk<PostByID, number>(
  "posts/fetchPost",
  async (id: number) => (await fetchPost(id)).data
);
export const fetchUserPostsThunk = createAsyncThunk<Photo[], number>(
  "posts/fetchUserPosts",
  async (id: number) => (await fetchPostsUser(Number(id))).data
);

const initialState: PostsState = {
  photos: null,
  postById: null,
  userPosts: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllPostsThunk.fulfilled,
        (state, action: PayloadAction<PostsState["photos"]>) => {
          state.loading = false;
          state.photos = action.payload;
        }
      )
      .addCase(fetchAllPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(fetchPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPostThunk.fulfilled,
        (state, action: PayloadAction<PostsState["postById"]>) => {
          state.loading = false;
          state.postById = action.payload;
        }
      )
      .addCase(fetchPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch post by ID";
      });
  },
});

export default postsSlice.reducer;
