import { feedsReducer, TFeedState, initialState } from './feeds';
import { getFeeds } from '../../thunk/feeds';
import { RequestStatus } from '../../../utils/types';

describe('test feeds slice', () => {

  test('test changing requestStatus to Loading', () => {
    const testedState: TFeedState = {
      ...initialState,
      requestStatus: RequestStatus.Loading
    };

    const actualState = feedsReducer(initialState, getFeeds.pending(''));

    expect(testedState).toEqual(actualState);
  });

  test('test changing requestStatus to Failed', () => {
    const testedState: TFeedState = {
      ...initialState,
      requestStatus: RequestStatus.Failed
    };

    const actualState = feedsReducer(
      initialState,
      getFeeds.rejected(new Error('Error'), '')
    );

    expect(testedState).toEqual(actualState);
  });

  test('test changing requestStatus to Success', () => {
    const testedState: TFeedState = {
      ...initialState,
      requestStatus: RequestStatus.Success
    };

    const actualState = feedsReducer(
      initialState,
      getFeeds.fulfilled(
        { orders: [], total: 0, totalToday: 0, success: true },
        ''
      )
    );

    expect(testedState).toEqual(actualState);
  });
});
