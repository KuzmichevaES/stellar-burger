import { orderReducer, TOrderState } from './order';
import { getOrderInfo } from '../../thunk/order';
import { RequestStatus } from '../../../utils/types';

describe('test order slice', () => {
  const initialState: TOrderState = {
    info: null,
    requestStatus: RequestStatus.Idle
  };

  test('test changing requestStatus to Loading', () => {
    const testedState: TOrderState = {
      ...initialState,
      requestStatus: RequestStatus.Loading
    };

    const actualState = orderReducer(initialState, getOrderInfo.pending('', 0));

    expect(testedState).toEqual(actualState);
  });

  test('test changing requestStatus to Failed', () => {
    const testedState: TOrderState = {
      ...initialState,
      requestStatus: RequestStatus.Failed
    };

    const actualState = orderReducer(
      initialState,
      getOrderInfo.rejected(new Error('Error'), '', 0)
    );

    expect(testedState).toEqual(actualState);
  });

  test('test changing requestStatus to Success', () => {
    const testedState: TOrderState = {
      info: {
        _id: '111',
        status: 'recieved',
        name: 'Ваш заказ',
        createdAt: 'today',
        updatedAt: 'today',
        number: 123,
        ingredients: []
      },
      requestStatus: RequestStatus.Success
    };

    const actualState = orderReducer(
      initialState,
      getOrderInfo.fulfilled(
        {
          _id: '111',
          status: 'recieved',
          name: 'Ваш заказ',
          createdAt: 'today',
          updatedAt: 'today',
          number: 123,
          ingredients: []
        },
        '',
        0
      )
    );

    expect(testedState).toEqual(actualState);
  });
});
