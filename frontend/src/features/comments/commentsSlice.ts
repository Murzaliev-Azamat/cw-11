import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addComment, fetchComments } from './commentsThunks';
import { Comment } from '../../../types';


interface CommentsState {
  comments: Comment[] | [];
  fetchAllCommentsLoading: boolean;
  addCommentLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  fetchAllCommentsLoading: false,
  addCommentLoading: false,
}

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchAllCommentsLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.fetchAllCommentsLoading = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.fetchAllCommentsLoading = false;
    });
    builder.addCase(addComment.pending, (state) => {
      state.addCommentLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state) => {
      state.addCommentLoading = false;
    });
    builder.addCase(addComment.rejected, (state) => {
      state.addCommentLoading = false;
    });
  }});

export const commentsReducer = CommentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;

export const selectFetchAllCommentsLoading = (state: RootState) => state.comments.fetchAllCommentsLoading;
export const selectAddCommentLoading = (state: RootState) => state.comments.addCommentLoading;