import styled from 'styled-components';

const CommentButton = styled.button`
  border: none;
  border-radius: 4px;
  background-color: #f25555;
  color: white;
  padding: 2px 6px 2px 6px;
  margin-left: 2px;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;

export default CommentButton;
