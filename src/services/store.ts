import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredients/ingredients';
import { burgerConstructorSlice } from './slices/burgerConstructor/burgerConstructor';
import { userSlice } from './slices/user/user';
import { feedsSlice } from './slices/feeds/feeds';
import { ordersSlice } from './slices/orders/orders';
import { orderSlice } from './slices/order/order';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = {
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
