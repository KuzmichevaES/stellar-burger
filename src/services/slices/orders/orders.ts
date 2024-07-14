import { createSlice } from '@reduxjs/toolkit';
import { RootOptions } from 'react-dom/client';
import { RequestStatus, TOrder } from '../../../utils/types';
import { RootState } from '../../store';
import { getOrdersInfo } from '../../thunk/orders';

export type TOrdersState = {
  info: TOrder[];
  requestStatus: RequestStatus;
};

const initialState: TOrdersState = {
  info: [],
  requestStatus: RequestStatus.Idle
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersInfo.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrdersInfo.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getOrdersInfo.fulfilled, (state, action) => {
        state.info = action.payload;
        state.requestStatus = RequestStatus.Success;
      });
  },
  selectors: {
    getOrdersSelector: (state: TOrdersState) => state.info
  }
});

export const ordersInfoDataSelector =
  (number: number) => (state: RootState) => {
    if (state.orders.info?.length) {
      const data = state.orders.info.find((item) => item.number === +number);
      if (data) return data;
    }

    if (state.feed.orders?.length) {
      const data = state.feed.orders.find((item) => item.number === +number);
      if (data) return data;
    }

    if (state.order.info?.number === +number) {
      return state.order.info;
    }

    return null;
  };

export const ordersSelectors = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
