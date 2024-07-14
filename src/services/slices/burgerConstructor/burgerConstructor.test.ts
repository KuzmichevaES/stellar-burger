import {
  addToConstructor,
  deleteFromConstructor,
  swapItemsInConstructor,
  clearBurgerConstructor,
  TConstructorState,
  burgerConstructorReducer
} from './burgerConstructor';
import { RequestStatus, TConstructorIngredient } from '../../../utils/types';
import { makeOrder } from '../../thunk/burgerConstructor';

describe('test burgerConstructor slice', () => {
  const bun: TConstructorIngredient = {
    id: 'Булка',
    _id: 'Булка',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const main: TConstructorIngredient = {
    id: 'Котлета',
    _id: 'Котлета',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const sauce: TConstructorIngredient = {
    id: 'Соус',
    _id: 'Соус',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  };

  const state: TConstructorState = {
    bun: null,
    ingredients: [],
    order: null,
    requestStatus: RequestStatus.Idle
  };

  test('add ingredient to constructor with addToConstructor', () => {
    const testedState = burgerConstructorReducer(state, addToConstructor(main));

    expect(testedState.ingredients).toHaveLength(1);
    expect(testedState.ingredients[0]).toEqual({
      ...main,
      id: expect.any(String)
    });

    const testedState2 = burgerConstructorReducer(
      testedState,
      addToConstructor(sauce)
    );
    expect(testedState2.ingredients).toHaveLength(2);
  });

  test('add bun to constructor with addToConstructor', () => {
    const testedState = burgerConstructorReducer(state, addToConstructor(bun));

    expect(testedState.ingredients).toHaveLength(0);
    expect(testedState.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  test('remove ingredient from constructor with deleteFromConstructor', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [main, sauce],
      order: null,
      requestStatus: RequestStatus.Idle
    };

    const testedState = burgerConstructorReducer(
      initialState,
      deleteFromConstructor(0)
    );
    const stateAfterDeleted: TConstructorState = {
      bun: null,
      ingredients: [sauce],
      order: null,
      requestStatus: RequestStatus.Idle
    };

    expect(testedState.ingredients).toHaveLength(1);
    expect(testedState).toEqual(stateAfterDeleted);
  });

  test('swap ingredients with swapItemsInConstructor', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [main, sauce],
      order: null,
      requestStatus: RequestStatus.Idle
    };

    const testedState = burgerConstructorReducer(
      initialState,
      swapItemsInConstructor({ from: 1, to: 0 })
    );
    const stateAfterDeleted: TConstructorState = {
      bun: null,
      ingredients: [sauce, main],
      order: null,
      requestStatus: RequestStatus.Idle
    };

    expect(testedState).toEqual(stateAfterDeleted);
  });

  test('clear constructor with clearBurgerConstructor', () => {
    const initialState: TConstructorState = {
      bun: bun,
      ingredients: [main, sauce],
      order: null,
      requestStatus: RequestStatus.Idle
    };

    const testedState = burgerConstructorReducer(
      initialState,
      clearBurgerConstructor()
    );
    const stateAfterDeleted: TConstructorState = {
      bun: null,
      ingredients: [],
      order: null,
      requestStatus: RequestStatus.Idle
    };

    expect(testedState).toEqual(stateAfterDeleted);
  });

  test('test changing requestStatus to Loading', () => {
    const testedState: TConstructorState = {
      ...state,
      requestStatus: RequestStatus.Loading
    };

    const actualState = burgerConstructorReducer(
      state,
      makeOrder.pending('', [], '')
    );

    expect(testedState).toEqual(actualState);
  });

  test('test changing requestStatus to Failed', () => {
    const testedState: TConstructorState = {
      ...state,
      requestStatus: RequestStatus.Failed
    };

    const actualState = burgerConstructorReducer(
      state,
      makeOrder.rejected(new Error('Error'), '', [])
    );

    expect(testedState).toEqual(actualState);
  });

  test('test changing requestStatus to Success', () => {
    const testedState: TConstructorState = {
      ...state,
      order: {
        _id: 'e111e',
        status: 'Готовится',
        name: 'Ваш заказ',
        createdAt: 'today',
        updatedAt: 'today',
        number: 1234,
        ingredients: ['bun', 'sauce']
      },
      requestStatus: RequestStatus.Success
    };

    const actualState = burgerConstructorReducer(
      state,
      makeOrder.fulfilled(
        {
          _id: 'e111e',
          status: 'Готовится',
          name: 'Ваш заказ',
          createdAt: 'today',
          updatedAt: 'today',
          number: 1234,
          ingredients: ['bun', 'sauce']
        },
        '',
        ['bun', 'sauce']
      )
    );

    expect(testedState).toEqual(actualState);
  });
});
