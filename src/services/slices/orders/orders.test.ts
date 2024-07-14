import { ordersReducer, TOrdersState } from './orders';
import { getOrdersInfo } from '../../thunk/orders';
import { RequestStatus } from '../../../utils/types';

describe('test orders slice', () => {
  const initialState: TOrdersState = {
    info: [],
    requestStatus: RequestStatus.Idle
  };

  test('test changing requestStatus to Loading', () => {
    const testedState: TOrdersState = {
      ...initialState,
      requestStatus: RequestStatus.Loading
    };

    const actualState = ordersReducer(initialState, getOrdersInfo.pending(''));

    expect(testedState).toEqual(actualState);
  });

  test('test changing requestStatus to Failed', () => {
    const testedState: TOrdersState = {
      ...initialState,
      requestStatus: RequestStatus.Failed
    };

    const actualState = ordersReducer(
      initialState,
      getOrdersInfo.rejected(new Error('Error'), '')
    );

    expect(testedState).toEqual(actualState);
  });

  test('test changing requestStatus to Success', () => {
    const testedState: TOrdersState = {
      ...initialState,
      requestStatus: RequestStatus.Success
    };

    const actualState = ordersReducer(
      initialState,
      getOrdersInfo.fulfilled([], '')
    );

    expect(testedState).toEqual(actualState);
  });
});
