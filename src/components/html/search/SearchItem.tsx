import { Post } from 'screen-state-types';
import styled from 'styled-components';
// import Tags from './Tags';

const SearchItemBlock = styled.div`
  background-color: white;
  width: 680px;
  height: 86px;
  overflow-y: hidden;
  padding: 0 1rem 0 1rem;

  h2 {
    margin: 0.5rem 0 1rem 0;
  }
`;
const SubInfo = styled.div`
  span + span:before {
    color: gray;
    padding: 0 0.25rem 0 0.25rem;
    content: '\\B7';
  }
`;

interface PostItemParams {
  post: Post;
  panelClickHandler: (props: any) => void;
}
const SearchItem = ({ post, panelClickHandler }: PostItemParams) => {
  const { publishedDate, user, title } = post;
  return (
    <SearchItemBlock onClick={panelClickHandler}>
      <h2>{title}</h2>
      <SubInfo>
        <span>{user.username}</span>
        <span>{new Date(publishedDate).toLocaleDateString()}</span>
      </SubInfo>
    </SearchItemBlock>
  );
};

export default SearchItem;
