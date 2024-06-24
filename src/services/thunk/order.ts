import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderInfo = createAsyncThunk(
  'order/getOrderInfo',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res.orders[0];
  }
);
