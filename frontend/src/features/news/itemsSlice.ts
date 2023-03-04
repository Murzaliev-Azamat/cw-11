import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../../types';
import { RootState } from '../../app/store';
import { addItem, fetchAllItems } from './itemsThunks';


interface ItemsState {
  items: Item[] | [];
  fetchAllLoading: boolean;
  addItemLoading: boolean;
}

const initialState: ItemsState = {
  items: [],
  fetchAllLoading: false,
  addItemLoading: false,
}

export const ItemsSlice = createSlice({
  name: 'items',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllItems.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchAllItems.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchAllItems.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(addItem.pending, (state) => {
      state.addItemLoading = true;
    });
    builder.addCase(addItem.fulfilled, (state) => {
      state.addItemLoading = false;
    });
    builder.addCase(addItem.rejected, (state) => {
      state.addItemLoading = false;
    });
  }});

export const itemsReducer = ItemsSlice.reducer;
export const selectItems = (state: RootState) => state.items.items;

export const selectFetchAllLoading = (state: RootState) => state.items.fetchAllLoading;
export const selectAddItemLoading = (state: RootState) => state.items.addItemLoading;