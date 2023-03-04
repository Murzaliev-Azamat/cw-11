import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../../types';
import { RootState } from '../../app/store';
import { fetchAllCategories } from './categoriesThunks';


interface CategoriesState {
  categories: Category[] | [];
  fetchAllCategoriesLoading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  fetchAllCategoriesLoading: false,
}

export const CategoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.fetchAllCategoriesLoading = true;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.fetchAllCategoriesLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchAllCategories.rejected, (state) => {
      state.fetchAllCategoriesLoading = false;
    });
  }});

export const categoriesReducer = CategoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.categories;

export const selectFetchAllCategoriesLoading = (state: RootState) => state.categories.fetchAllCategoriesLoading;