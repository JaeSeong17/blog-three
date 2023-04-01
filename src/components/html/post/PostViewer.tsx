import { AxiosError } from 'axios';
import { Post } from 'screen-state-types';
import styled from 'styled-components';
import SubInfo from '../postPanel/SubInfo';
import Tags from '../postPanel/Tags';

const PostViewerBlock = styled.div`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid gray;
  padding-bottom: 2rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.2rem;
  color: black;
  border-bottom: 1px solid gray;
  padding-bottom: 3rem;
  margin-bottom: 1rem;
`;

interface PostViewerParams {
  post: Post | null;
  error: AxiosError | null;
  loading: boolean;
  actionButtons: JSX.Element | null;
}

const PostViewer = ({
  post,
  error,
  loading,
  actionButtons,
}: PostViewerParams) => {
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !post) {
    return null;
  }

  const { title, body, user, publishedDate, tags } = post;

  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo
          username={user.username}
          publishedDate={new Date(publishedDate)}
          hasMarginTop
        />
        <Tags tags={tags} />
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;
