import createSagaMiddleware from '@redux-saga/core';
import { all } from 'redux-saga/effects';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { authSaga } from '../../../modules/auth/auth';
import loadingReducer from '../../../modules/loading';
import userReducer, {
  userSaga,
  tempSetUser,
  check,
} from '../../../modules/auth/user';
import { Provider } from 'react-redux';
import AuthWrapper from '../auth/AuthWrapper';
import { RootAuthCarrier } from 'auth-type';

export function* loginSaga() {
  yield all([authSaga(), userSaga()]);
}
const sagaMiddleware = createSagaMiddleware();
const authStore = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    user: userReducer,
  },
  devTools: true,
  middleware: [sagaMiddleware],
});

// 로컬 스토리지로 자동 로그인 시도
function loadUser() {
  try {
    const user = localStorage.getItem('user');

    // 로그인 상태가 아니면 아무 작업도 수행하지 않음
    if (!user) return;

    // 로컬 스토리지 값으로 redux store 임시 갱신
    authStore.dispatch(tempSetUser(JSON.parse(user)));

    // 해당 계정이 로그인되어 있는 상태인지 서버에 확인
    authStore.dispatch(check());
  } catch (e) {
    console.log(e + 'localStorage is not working');
  }
}
sagaMiddleware.run(loginSaga);
loadUser();

const AuthHtml = ({
  target,
  rootUser,
  initRootUser,
  updateRootUser,
  setTargetToKey,
}: RootAuthCarrier) => {
  return (
    <Provider store={authStore}>
      <AuthWrapper
        target={target}
        rootUser={rootUser}
        initRootUser={initRootUser}
        updateRootUser={updateRootUser}
        setTargetToKey={setTargetToKey}
      />
    </Provider>
  );
};

export default AuthHtml;
