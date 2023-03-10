import { all } from 'redux-saga/effects';
import writeReducer, { writeSaga } from '../../../modules/screen/write';
import postReducer, { postSaga } from '../../../modules/screen/post';
import loadingReducer from '../../../modules/loading';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import WritePage from '../pages/WritePage';
import PostPage from '../pages/PostPage';
import { CurrPostParams } from 'root-state-types';
import { ModeSet } from 'preset-types';

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

interface RootScreenCarrier {
  currPostUsername: string | null;
  currPostId: string | null;
  currMode: ModeSet;
  writeComplete: (parms: CurrPostParams) => void;
}

const ScreenHtml = ({
  currPostUsername,
  currPostId,
  currMode,
  writeComplete,
}: RootScreenCarrier) => {
  let currScreen;
  if (currMode === 'post' && currPostUsername && currPostId) {
    currScreen = <PostPage currPostId={currPostId} />;
  } else if (currMode === 'write') {
    currScreen = <WritePage writeComplete={writeComplete} />;
  }

  return <Provider store={writeStore}>{currScreen}</Provider>;
};

export default ScreenHtml;
