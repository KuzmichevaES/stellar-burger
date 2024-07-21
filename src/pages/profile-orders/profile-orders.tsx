import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { ordersSlice } from '../../services/slices/orders/orders';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersInfo } from '../../services/thunk/orders';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора + */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersInfo());
  }, [dispatch]);

  const orders = useSelector(ordersSlice.selectors.getOrdersSelector);

  return <ProfileOrdersUI orders={orders} />;
};
