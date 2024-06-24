import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSlice } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const userData = useSelector(userSlice.selectors.getUser);
  const userName = userData?.name || '';

  return <AppHeaderUI userName={userName} />;
};
