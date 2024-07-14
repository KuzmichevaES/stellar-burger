import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { makeOrder } from '../../services/thunk/burgerConstructor';
import { burgerConstructorSlice } from '../../services/slices/burgerConstructor/burgerConstructor';
import { userSelectors } from '../../services/slices/user/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems +, orderRequest+ и orderModalData+ из стора */
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const bun = useSelector((state: RootState) => state.burgerConstructor.bun);
  const ingredients = useSelector(
    (state: RootState) => state.burgerConstructor.ingredients
  );

  const { getUser } = userSelectors;
  const user = useSelector(getUser);

  const constructorItems = { bun, ingredients };

  const orderRequestStatus = useSelector(
    (state: RootState) => state.burgerConstructor.requestStatus
  );

  const orderRequest = orderRequestStatus === 'Loading' ? true : false;

  const orderModalData = useSelector(
    (state: RootState) => state.burgerConstructor.order
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigation('/login');
    } else {
      const orderIngredients = [
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ];
      dispatch(makeOrder(orderIngredients));
    }
  };

  const closeOrderModal = () => {
    dispatch(burgerConstructorSlice.actions.clearBurgerConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
