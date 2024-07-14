import { userReducer, authChecked, userLogout, TUserState } from './user';
import {
  checkUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser
} from '../../thunk/user';
import { RequestStatus, TUser } from '../../../utils/types';
import { TRegisterData } from '@api';

describe('test user slice', () => {
  const initialState: TUserState = {
    isAuthChecked: false,
    userData: null,
    requestStatus: RequestStatus.Idle
  };

  const stateAuthChecked: TUserState = {
    isAuthChecked: true,
    userData: null,
    requestStatus: RequestStatus.Idle
  };

  const userTestData: TUser = {
    email: 'test@test.ru',
    name: 'TestUser'
  };

  const userTest: TRegisterData = {
    name: 'TestUser',
    email: 'test@test.ru',
    password: 'password'
  };

  const stateLoginedUser: TUserState = {
    isAuthChecked: true,
    userData: userTestData,
    requestStatus: RequestStatus.Success
  };

  test('change isAuthChecked flag to true when action AuthChecked dispatch', () => {
    const testedState = userReducer(initialState, authChecked());

    expect(testedState).toEqual(stateAuthChecked);
  });

  test('clear UserData after action userLogout dispatch', () => {
    const testedState = userReducer(stateLoginedUser, userLogout());

    expect(testedState).toEqual({
      isAuthChecked: true,
      userData: null,
      requestStatus: RequestStatus.Success
    });
  });

  test('test checkUser changing requestStatus to Loading', () => {
    const testedState: TUserState = {
      ...initialState,
      requestStatus: RequestStatus.Loading
    };

    const actualState = userReducer(initialState, checkUser.pending(''));

    expect(testedState).toEqual(actualState);
  });

  test('test checkUser changing requestStatus to Failed', () => {
    const testedState: TUserState = {
      ...initialState,
      requestStatus: RequestStatus.Failed
    };

    const actualState = userReducer(
      initialState,
      checkUser.rejected(new Error('Error'), '')
    );

    expect(testedState).toEqual(actualState);
  });

  test('test checkUser changing requestStatus to Success', () => {
    const testedState: TUserState = {
      ...initialState,
      userData: userTestData,
      requestStatus: RequestStatus.Success
    };

    const actualState = userReducer(
      initialState,
      checkUser.fulfilled(userTestData, '')
    );

    expect(testedState).toEqual(actualState);
  });

  test('test registerUser changing requestStatus to Loading', () => {
    const testedState: TUserState = {
      ...initialState,
      requestStatus: RequestStatus.Loading
    };

    const actualState = userReducer(
      initialState,
      registerUser.pending('', userTest)
    );

    expect(testedState).toEqual(actualState);
  });

  test('test registerUser changing requestStatus to Failed', () => {
    const testedState: TUserState = {
      ...initialState,
      requestStatus: RequestStatus.Failed
    };

    const actualState = userReducer(
      initialState,
      registerUser.rejected(new Error('Error'), '', userTest)
    );

    expect(testedState).toEqual(actualState);
  });

  test('test registerUser changing requestStatus to Success', () => {
    const testedState: TUserState = {
      ...initialState,
      userData: userTestData,
      requestStatus: RequestStatus.Success
    };

    const actualState = userReducer(
      initialState,
      registerUser.fulfilled(userTestData, '', userTest)
    );

    expect(testedState).toEqual(actualState);
  });

  test('test loginUser changing requestStatus to Loading', () => {
    const testedState: TUserState = {
      ...initialState,
      requestStatus: RequestStatus.Loading
    };

    const actualState = userReducer(
      initialState,
      loginUser.pending('', userTest)
    );

    expect(testedState).toEqual(actualState);
  });

  test('test loginUser changing requestStatus to Failed', () => {
    const testedState: TUserState = {
      ...initialState,
      requestStatus: RequestStatus.Failed
    };

    const actualState = userReducer(
      initialState,
      loginUser.rejected(new Error('Error'), '', userTest)
    );

    expect(testedState).toEqual(actualState);
  });

  test('test loginUser changing requestStatus to Success', () => {
    const testedState: TUserState = {
      ...initialState,
      userData: userTestData,
      requestStatus: RequestStatus.Success
    };

    const actualState = userReducer(
      initialState,
      loginUser.fulfilled(userTestData, '', userTest)
    );

    expect(testedState).toEqual(actualState);
  });

  test('test logoutUser changing requestStatus to Loading', () => {
    const testedState: TUserState = {
      ...initialState,
      requestStatus: RequestStatus.Loading
    };

    const actualState = userReducer(initialState, logoutUser.pending(''));

    expect(testedState).toEqual(actualState);
  });

  test('test logoutUser changing requestStatus to Failed', () => {
    const testedState: TUserState = {
      ...initialState,
      requestStatus: RequestStatus.Failed
    };

    const actualState = userReducer(
      initialState,
      logoutUser.rejected(new Error('Error'), '')
    );

    expect(testedState).toEqual(actualState);
  });

  test('test logoutUser changing requestStatus to Success', () => {
    const testedState: TUserState = {
      ...initialState,
      userData: null,
      requestStatus: RequestStatus.Success
    };

    const actualState = userReducer(
      initialState,
      logoutUser.fulfilled(undefined, '')
    );

    expect(testedState).toEqual(actualState);
  });

  test('test updateUser changing requestStatus to Loading', () => {
    const testedState: TUserState = {
      ...initialState,
      requestStatus: RequestStatus.Loading
    };

    const actualState = userReducer(
      initialState,
      updateUser.pending('', userTest)
    );

    expect(testedState).toEqual(actualState);
  });

  test('test updateUser changing requestStatus to Failed', () => {
    const testedState: TUserState = {
      ...initialState,
      requestStatus: RequestStatus.Failed
    };

    const actualState = userReducer(
      initialState,
      updateUser.rejected(new Error('Error'), '', userTest)
    );

    expect(testedState).toEqual(actualState);
  });

  test('test updateUser changing requestStatus to Success', () => {
    const testedState: TUserState = {
      ...initialState,
      userData: userTestData,
      requestStatus: RequestStatus.Success
    };

    const actualState = userReducer(
      initialState,
      updateUser.fulfilled(userTestData, '', userTest)
    );

    expect(testedState).toEqual(actualState);
  });
});
