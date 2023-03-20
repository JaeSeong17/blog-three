import WritePage from '../pages/WritePage';
import PostPage from '../pages/PostPage';
import { ScreenReducerCarrier } from 'reducer-carrier-types';

const ScreenHtml = ({
  camReducerCarrier,
  scReducerCarrier,
  writeReducerCarrier,
  postReducerCarrier,
  loadingReducerCarrier,
  user,
}: ScreenReducerCarrier) => {
  let currScreen;
  const { currMode, currPostUsername, currPostId } = scReducerCarrier.scState;
  if (currMode === 'post' && currPostUsername && currPostId) {
    currScreen = (
      <PostPage
        user={user}
        camReducerCarrier={camReducerCarrier}
        scReducerCarrier={scReducerCarrier}
        postReducerCarrier={postReducerCarrier}
        writeReducerCarrier={writeReducerCarrier}
        loadingReducerCarrier={loadingReducerCarrier}
      />
    );
  } else if (currMode === 'write') {
    currScreen = (
      <WritePage
        scReducerCarrier={scReducerCarrier}
        writeReducerCarrier={writeReducerCarrier}
      />
    );
  } else {
    currScreen = null;
  }

  return currScreen;
};

export default ScreenHtml;
