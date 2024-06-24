import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '../../utils/types';
import { getOrderInfo } from '../thunk/order';

type TOrderState = {
  info: TOrder | null;
  requestStatus: RequestStatus;
};

const initialState: TOrderState = {
  info: null,
  requestStatus: RequestStatus.Idle
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderInfo.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrderInfo.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getOrderInfo.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.info = action.payload;
      });
  },
  selectors: {
    getOrderSelector: (state: TOrderState) => state.info
  }
});

export const orderSelectors = orderSlice.selectors;
