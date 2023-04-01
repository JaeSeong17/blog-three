import { PostPageParams } from 'reducer-carrier-types';
import HtmlWrapper from '../common/HtmlWrapper';
import CommentContainer from './CommentContainer';
import PostViewerContainer from './PostViewerContainer';

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
      <CommentContainer user={user} postReducerCarrier={postReducerCarrier} />
    </HtmlWrapper>
  );
};

export default PostPage;
