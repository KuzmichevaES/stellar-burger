import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/thunk/user';
import { userSlice } from '../../services/slices/user/user';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()).finally(() =>
      dispatch(userSlice.actions.userLogout())
    );
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
