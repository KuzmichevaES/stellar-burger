import { rootReducer } from './store';
import { ingredientsSlice } from './slices/ingredients/ingredients';
import { burgerConstructorSlice } from './slices/burgerConstructor/burgerConstructor';
import { userSlice } from './slices/user/user';
import { feedsSlice } from './slices/feeds/feeds';
import { ordersSlice } from './slices/orders/orders';
import { orderSlice } from './slices/order/order';
import { configureStore } from '@reduxjs/toolkit';

describe('test initializing rootReducer in store', () => {
  const rootState = {
    [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
    [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
    [userSlice.name]: userSlice.getInitialState(),
    [feedsSlice.name]: feedsSlice.getInitialState(),
    [orderSlice.name]: orderSlice.getInitialState(),
    [ordersSlice.name]: ordersSlice.getInitialState()
  };

  test('testing correct work of rootReducer', () => {
    const testedStore = configureStore({ reducer: rootReducer });
    const state = testedStore.getState();

    const action = { type: 'UNKNOWN_ACTION' };

    testedStore.dispatch(action);

    const newState = testedStore.getState();

    expect(newState).toEqual(state);
  });

  test('initializing initialState', () => {
    const testedStore = configureStore({ reducer: rootReducer });

    const testedState = testedStore.getState();

    expect(testedState).toEqual(rootState);
  });
});
