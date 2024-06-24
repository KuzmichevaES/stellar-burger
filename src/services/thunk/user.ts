import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const checkUser = createAsyncThunk<TUser>('user/checkUser', async () => {
  const res = await getUserApi();
  return res.user;
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: TRegisterData) => {
    const res = await registerUserApi(user);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: TLoginData) => {
    const res = await loginUserApi(user);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => {
    const res = await updateUserApi(user);
    return res.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  localStorage.clear();
  deleteCookie('accessToken');
});
