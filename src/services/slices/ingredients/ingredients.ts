import { getIngredients } from '../../thunk/ingredients';
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '../../../utils/types';

export type TIngredientsState = {
  data: TIngredient[];
  status: RequestStatus;
};

export const initialState: TIngredientsState = {
  data: [],
  status: RequestStatus.Idle
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload;
      });
  },
  selectors: {
    ingredientsSelectorData: (state: TIngredientsState) => state.data,
    ingredientsSelectorStatus: (state: TIngredientsState) => state.status
  }
});

export const ingredientsSelectors = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
