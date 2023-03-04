import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import './index.css';
import controllerReducer from 'src/modules/root/controller';
import postsReducer, { postsSaga } from 'src/modules/root/posts';
import loadingReducer from 'src/modules/loading';
import userReducer, { userSaga } from 'src/modules/root/user';

export function* rootSaga() {
  yield all([postsSaga(), userSaga()]);
}
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    controller: controllerReducer,
    user: userReducer,
    posts: postsReducer,
    loading: loadingReducer,
  },
  devTools: true,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
