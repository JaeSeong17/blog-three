import { AxiosError } from 'axios';
import { Post } from 'screen-state-types';
import styled from 'styled-components';
import SubInfo from '../postPanel/SubInfo';
import Tags from '../postPanel/Tags';
import Prism from 'prismjs';
import 'prismjs/components/';
import 'prismjs/themes/prism-tomorrow.css';

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
  font-size: 1.1rem;
  color: black;
  border-bottom: 1px solid gray;
  padding-bottom: 3rem;
  margin-bottom: 1rem;
  overflow: hidden;

  img {
    max-width: 100%;
  }

  pre {
    font-family: Menlo, Monaco, 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 16px;
    overflow: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    border-radius: 8px;
    color: white;
    background-color: #242424;

    code[class*='language-'],
    pre[class*='language-'] {
      color: #333;
      text-shadow: none;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #999;
    }

    .token.punctuation {
      color: #ccc;
    }
  }

  blockquote {
    margin: 0 0 1em;
    padding: 0.4rem 1em 0.4rem;
    color: #585858;
    font-weight: bold;
    font-size: 1.2rem;
    font-style: italic;
    border-left: 0.25em solid #ff5757;
    background-color: #dddddd;
  }
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
  const prismBody = body.replace(
    /<pre class="ql-syntax"(?:\s+[^>]+)?>([\s\S]*?)<\/pre>/g,
    (match, p1) =>
      '<pre>' +
      Prism.highlight(p1, Prism.languages.javascript, 'javascript') +
      '</pre>',
  );

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
      <PostContent
        dangerouslySetInnerHTML={{
          __html: prismBody ? prismBody : body,
        }}
      />
    </PostViewerBlock>
  );
};

export default PostViewer;
