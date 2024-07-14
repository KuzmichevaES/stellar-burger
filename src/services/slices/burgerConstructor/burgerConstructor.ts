import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TIngredient,
  TConstructorIngredient,
  TOrder,
  RequestStatus
} from '../../../utils/types';
import { makeOrder } from '../../thunk/burgerConstructor';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  order: TOrder | null;
  requestStatus: RequestStatus;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  order: null,
  requestStatus: RequestStatus.Idle
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addToConstructor: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      }),
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      }
    },
    deleteFromConstructor: (state, { payload }: PayloadAction<number>) => {
      state.ingredients.splice(payload, 1);
    },
    swapItemsInConstructor: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const ingredients = [...state.ingredients];
      const { from, to } = payload;
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    clearBurgerConstructor: () => initialState
  },
  extraReducers(builder) {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(makeOrder.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.order = action.payload;
      });
  }
});

export const {
  addToConstructor,
  deleteFromConstructor,
  swapItemsInConstructor,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
