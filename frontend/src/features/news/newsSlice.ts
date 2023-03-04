import { createSlice } from '@reduxjs/toolkit';
import { OneNews } from '../../../types';
import { RootState } from '../../app/store';
import { addOneNews, fetchAllNews, fetchOneNews } from './newsThunks';


interface NewsState {
  news: OneNews[] | [];
  oneNews: OneNews | null;
  fetchAllLoading: boolean;
  fetchOneNewsLoading: boolean;
  addOneNewsLoading: boolean;
}

const initialState: NewsState = {
  news: [],
  oneNews: null,
  fetchAllLoading: false,
  fetchOneNewsLoading: false,
  addOneNewsLoading: false,
}

export const NewsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllNews.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchAllNews.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      state.news = action.payload;
    });
    builder.addCase(fetchAllNews.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchOneNews.pending, (state) => {
      state.fetchOneNewsLoading = true;
    });
    builder.addCase(fetchOneNews.fulfilled, (state, action) => {
      state.fetchOneNewsLoading = false;
      state.oneNews = action.payload;
    });
    builder.addCase(fetchOneNews.rejected, (state) => {
      state.fetchOneNewsLoading = false;
    });
    builder.addCase(addOneNews.pending, (state) => {
      state.addOneNewsLoading = true;
    });
    builder.addCase(addOneNews.fulfilled, (state) => {
      state.addOneNewsLoading = false;
    });
    builder.addCase(addOneNews.rejected, (state) => {
      state.addOneNewsLoading = false;
    });
  }});

export const newsReducer = NewsSlice.reducer;
export const selectNews = (state: RootState) => state.news.news;
export const selectOneNews = (state: RootState) => state.news.oneNews;

export const selectFetchAllLoading = (state: RootState) => state.news.fetchAllLoading;
export const selectAddOneNewsLoading = (state: RootState) => state.news.addOneNewsLoading;
export const selectFetchOneNewsLoading = (state: RootState) => state.news.fetchOneNewsLoading;