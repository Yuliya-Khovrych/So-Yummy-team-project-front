import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { instance } from '../auth/authOperations';

export const fetchShoppingListThunkOperation = createAsyncThunk(
  'shoppingList/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        'http://localhost:3000/api/users/shopping-list/'
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addShoppingListItemThunkOperation = createAsyncThunk(
  'shoppingList/addShoppingListItem',
  async (newItem, { rejectWithValue, getState }) => {
    try {
      const { data } = await instance.post(
        'http://localhost:3000/api/users/shopping-list/',
        newItem
      );
      if (data) {
        toast.success('sucessfully added!');
      }
      return data;
    } catch (error) {
      if (error) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const deleteShoppingListItemThunkOperation = createAsyncThunk(
  'shoppingList/deleteShoppingListItem',
  async (id, { rejectWithValue }) => {
    console.log(id);

    try {
      const { data } = await instance.delete(
        `http://localhost:3000/api/users/shopping-list/`,
        {
          data: { id: id },
        }
      );
      console.log(data);
      if (data) {
        toast.success('sucessfully deleted!');
      }
      return data;
    } catch (error) {
      if (error) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);