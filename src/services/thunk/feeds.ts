import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('feedsSlice/getFeeds', async () => {
  const res = await getFeedsApi();
  return res;
});
