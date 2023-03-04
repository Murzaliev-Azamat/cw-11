import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Category } from '../../../types';

export const fetchAllCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const categoriesResponse = await axiosApi.get<Category[]>('/categories');
    return categoriesResponse.data;
  }
);