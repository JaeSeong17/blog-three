import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import './index.css';
import camControllerReducer from 'src/modules/root/camController';
import screenControllerReducer from 'src/modules/root/screenController';
import boardControllerReducer, {
  postsSaga,
} from 'src/modules/root/boardController';
import loadingReducer from 'src/modules/loading';
import userReducer, {
  userSaga,
  tempSetUser,
  check,
} from 'src/modules/root/user';
import authReducer, { authSaga } from 'src/modules/root/auth';

export function* rootSaga() {
  yield all([postsSaga(), authSaga(), userSaga()]);
}
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    camController: camControllerReducer,
    screenController: screenControllerReducer,
    boardController: boardControllerReducer,
    auth: authReducer,
    user: userReducer,
    loading: loadingReducer,
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
    store.dispatch(tempSetUser(JSON.parse(user)));

    // 해당 계정이 로그인되어 있는 상태인지 서버에 확인
    store.dispatch(check());
  } catch (e) {
    console.log(e + 'localStorage is not working');
  }
}
sagaMiddleware.run(rootSaga);
loadUser();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
