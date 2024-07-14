import { ingredientsReducer, TIngredientsState } from './ingredients';
import { getIngredients } from '../../thunk/ingredients';
import { RequestStatus } from '../../../utils/types';

describe('test ingredients slice', () => {
  const initialState: TIngredientsState = {
    data: [],
    status: RequestStatus.Idle
  };

  test('test changing requestStatus to Loading', () => {
    const testedState: TIngredientsState = {
      ...initialState,
      status: RequestStatus.Loading
    };

    const actualState = ingredientsReducer(
      initialState,
      getIngredients.pending('')
    );

    expect(testedState).toEqual(actualState);
  });

  test('test changing requestStatus to Failed', () => {
    const testedState: TIngredientsState = {
      ...initialState,
      status: RequestStatus.Failed
    };

    const actualState = ingredientsReducer(
      initialState,
      getIngredients.rejected(new Error('Error'), '')
    );

    expect(testedState).toEqual(actualState);
  });

  test('test changing requestStatus to Success', () => {
    const testedState: TIngredientsState = {
      ...initialState,
      status: RequestStatus.Success
    };

    const actualState = ingredientsReducer(
      initialState,
      getIngredients.fulfilled([], '')
    );

    expect(testedState).toEqual(actualState);
  });
});
