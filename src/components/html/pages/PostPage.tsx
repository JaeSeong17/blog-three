import HtmlWrapper from '../common/HtmlWrapper';
import PostViewerContainer from '../post/PostViewerContainer';

const PostPage = ({ currPostId }: { currPostId: string }) => {
  return (
    <HtmlWrapper>
      <PostViewerContainer currPostId={currPostId} />
    </HtmlWrapper>
  );
};

export default PostPage;
