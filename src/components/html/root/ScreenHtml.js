import { all } from 'redux-saga/effects';
import writeReducer, { writeSaga } from '../../../modules/screen/write';
import postReducer, { postSaga } from '../../../modules/screen/post';
import loadingReducer from '../../../modules/loading';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WritePage from '../../html/pages/WritePage';
import PostPage from '../../html/pages/PostPage';
import Navigator from '../pages/Navigator';
import { useEffect, useRef } from 'react';

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
  const rootRef = useRef();
  const writeRef = useRef();
  const postRef = useRef();
  useEffect(() => {
    console.log(currPostUsername, currPostId);
    if (currMode === 'post' && currPostUsername && currPostId) {
      if (rootRef.current)
        rootRef.current.postNavigate(currPostUsername, currPostId);
      else if (writeRef.current)
        writeRef.current.postNavigate(currPostUsername, currPostId);
      else if (postRef.current)
        postRef.current.postNavigate(currPostUsername, currPostId);
    }
  }, [currMode, currPostUsername, currPostId]);
  useEffect(() => {
    if (currMode === 'write') {
      if (rootRef.current) rootRef.current.writeNavigate();
      else if (writeRef.current) writeRef.current.writeNavigate();
      else if (postRef.current) postRef.current.writeNavigate();
    }
  }, [currMode]);

  return (
    <Provider store={writeStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigator ref={rootRef} />} />
          <Route
            path="/write"
            element={<WritePage ref={writeRef} writeComplete={writeComplete} />}
          />
          <Route
            path="/@:username/:postId"
            element={<PostPage ref={postRef} />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default ScreenHtml;
