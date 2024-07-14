import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '../../../utils/types';
import { getFeeds } from '../../thunk/feeds';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  requestStatus: RequestStatus;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  requestStatus: RequestStatus.Idle
};

export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    getOrdersSelector: (state: TFeedState) => state.orders,
    getTotalSelector: (state: TFeedState) => state.total,
    getTotalTodaySelector: (state: TFeedState) => state.totalToday
  }
});

export const feedsSelectors = feedsSlice.selectors;
export const feedsReducer = feedsSlice.reducer;
