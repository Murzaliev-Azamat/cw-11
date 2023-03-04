import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Item, ItemApi } from '../../../types';
import { RootState } from '../../app/store';

export const fetchAllItems = createAsyncThunk<Item[], string | undefined>(
  'items/fetchAll',
  async (category) => {
    if (category) {
      const itemsResponse = await axiosApi.get<Item[]>('/items/?category=' + category);
      return itemsResponse.data;
    }
    const itemsResponse = await axiosApi.get<Item[]>('/items');
    return itemsResponse.data;
  }
);

export const addItem = createAsyncThunk<void, ItemApi, { state: RootState }>(
  'items/add',
  async (item, {getState}) => {
    const user = getState().users.user;

    if (user) {
      const formData = new FormData();

      const keys = Object.keys(item) as (keyof ItemApi)[];
      keys.forEach(key => {
        const value = item[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.post<ItemApi>('/items', formData, {headers: {'Authorization': user.token}});
    } else {
      throw new Error('No user');
    }
  }
);

export const deleteItem = createAsyncThunk<void, string, { state: RootState }>(
  'items/delete',
  async (id, {getState}) => {
    const user = getState().users.user;

    if (user) {

      await axiosApi.delete('/items/' + id, {headers: {'Authorization': user.token}});
    } else {
      throw new Error('No user');
    }
  }
);
