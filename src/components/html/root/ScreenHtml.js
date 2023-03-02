import { all } from 'redux-saga/effects';
import writeReducer, { writeSaga } from '../../../modules/screen/write';
import postReducer, { postSaga } from '../../../modules/screen/post';
import loadingReducer from '../../../modules/loading';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import WritePage from '../pages/WritePage';
import PostPage from '../pages/PostPage';

export function* screenSaga() {
  yield all([writeSaga(), postSaga()]);
}
const sagaMiddleware = createSagaMiddleware();
const writeStore = configureStore({
  reducer: {
    write: writeReducer,
    post: postReducer,
    loading: loadingReducer,
  },
  devTools: true,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(screenSaga);

const ScreenHtml = ({
  currPostUsername,
  currPostId,
  currMode,
  writeComplete,
}) => {
  let currScreen;
  if (currMode === 'post' && currPostUsername && currPostId) {
    currScreen = <PostPage currPostId={currPostId} />;
  } else if (currMode === 'write') {
    currScreen = <WritePage writeComplete={writeComplete} />;
  }

  return <Provider store={writeStore}>{currScreen}</Provider>;
};

export default ScreenHtml;
