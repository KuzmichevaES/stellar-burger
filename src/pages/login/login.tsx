import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { TLoginData } from '@api';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../services/thunk/user';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLoginData: TLoginData = {
    email: email,
    password: password
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(userLoginData));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
