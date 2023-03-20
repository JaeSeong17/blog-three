import { PostPageParams } from 'reducer-carrier-types';
import HtmlWrapper from '../common/HtmlWrapper';
import PostViewerContainer from '../post/PostViewerContainer';

const PostPage = ({
  user,
  camReducerCarrier,
  scReducerCarrier,
  postReducerCarrier,
  writeReducerCarrier,
  loadingReducerCarrier,
}: PostPageParams) => {
  return (
    <HtmlWrapper>
      <PostViewerContainer
        user={user}
        camReducerCarrier={camReducerCarrier}
        scReducerCarrier={scReducerCarrier}
        postReducerCarrier={postReducerCarrier}
        writeReducerCarrier={writeReducerCarrier}
        loadingReducerCarrier={loadingReducerCarrier}
      />
    </HtmlWrapper>
  );
};

export default PostPage;
