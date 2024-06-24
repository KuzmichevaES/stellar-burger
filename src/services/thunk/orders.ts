import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrdersInfo = createAsyncThunk(
  'orders/getOrdersInfo',
  async () => {
    const res = await getOrdersApi();
    return res;
  }
);
