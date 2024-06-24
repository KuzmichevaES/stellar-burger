import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrderIngredients } from '@utils-types';

export const makeOrder = createAsyncThunk(
  'burgerConstructor/makeOrder',
  async (orderIngredients: TOrderIngredients) => {
    const res = await orderBurgerApi(orderIngredients);
    return res.order;
  }
);
