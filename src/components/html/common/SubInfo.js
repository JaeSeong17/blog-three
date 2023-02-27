import styled, { css } from 'styled-components';

const SubInfoBlock = styled.div`
  ${props =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: gray;

  // span 사이에 가운뎃 점 문자 보여주기
  span + span:before {
    color: gray;
    padding: 0 0.25rem 0 0.25rem;
    content: '\\B7';
  }
`;

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>
          {/* <Link to={`/@${username}`}>{username}</Link> */}
          {username}
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
};

export default SubInfo;
