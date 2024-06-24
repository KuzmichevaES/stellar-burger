import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '../../utils/types';
import {
  checkUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../thunk/user';

export interface TUserState {
  isAuthChecked: boolean;
  userData: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  isAuthChecked: false,
  userData: null,
  requestStatus: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.userData = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(checkUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.userData = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.userData = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.userData = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.userData = action.payload;
      });
  },
  selectors: {
    getUser: (state: TUserState) => state.userData,
    getIsAuthChecked: (state: TUserState) => state.isAuthChecked
  }
});

export const userSelectors = userSlice.selectors;
