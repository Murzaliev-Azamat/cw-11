import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { OneNews, OneNewsApi } from '../../../types';
import { RootState } from '../../app/store';

export const fetchAllNews = createAsyncThunk<OneNews[]>(
  'news/fetchAll',
  async () => {
    const newsResponse = await axiosApi.get<OneNews[]>('/news');
    return newsResponse.data;
  }
);

export const fetchOneNews = createAsyncThunk<OneNews, string>(
  'news/fetchOne',
  async (id) => {
    const oneNewsResponse = await axiosApi.get<OneNews | null>('news/' + id);
    const oneNews = oneNewsResponse.data;

    if (oneNews === null) {
      throw new Error('Not found!')
    }

    return oneNews;
  },
);

export const addOneNews = createAsyncThunk<void, OneNewsApi, { state: RootState }>(
  'news/add',
  async (oneNews, {getState}) => {
    const user = getState().users.user;

    if (user) {
      const formData = new FormData();

      const keys = Object.keys(oneNews) as (keyof OneNewsApi)[];
      keys.forEach(key => {
        const value = oneNews[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.post<OneNewsApi>('/news', formData, {headers: {'Authorization': user.token}});
    } else {
      throw new Error('No user');
    }
  }
);