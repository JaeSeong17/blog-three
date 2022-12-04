import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import controllerReducer from './modules/controller';
import postsReducer, { postsSaga } from './modules/posts';
import loadingReducer from './modules/loading';
import { Provider } from 'react-redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

export function* rootSaga() {
  yield all([postsSaga()]);
}
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    controller: controllerReducer,
    posts: postsReducer,
    loading: loadingReducer,
  },
  devTools: true,
  middleware: [sagaMiddleware]
});
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
