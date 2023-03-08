import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

interface AxiosCallback {
  (payload: any): Promise<AxiosResponse<any, any>>;
}

export default function createRequestSaga(
  type: string,
  request: AxiosCallback,
) {
  const SUCCESS = `${type}Success`;
  const FAILURE = `${type}Failure`;

  return function* (action: PayloadAction<any>) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      const response: AxiosResponse = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: {
          data: response.data,
          meta: response,
        },
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
