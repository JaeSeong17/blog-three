import WritePage from '../write/WritePage';
import PostPage from '../post/PostPage';
import { ScreenHtmlParams } from 'reducer-carrier-types';

const ScreenHtml = ({
  camReducerCarrier,
  scReducerCarrier,
  writeReducerCarrier,
  postReducerCarrier,
  loadingReducerCarrier,
  user,
}: ScreenHtmlParams) => {
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

  return <div onClick={e => e.stopPropagation()}>{currScreen}</div>;
};

export default ScreenHtml;
