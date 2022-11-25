import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}Success`;
    const FAILURE = `${type}Failure`;

    return function*(action) {
        yield put(startLoading(type)); // 로딩 시작
        try {
            const response = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            console.log(action, e)
            yield put({
                type: FAILURE,
                payload: e,
                error: true
            });
        }
        yield put(finishLoading(type)); // 로딩 끝
    }
}