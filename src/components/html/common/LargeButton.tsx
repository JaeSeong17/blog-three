import styled from 'styled-components';

const LargeButton = styled.button`
  margin: 1rem 0 1rem 0;
  padding: 0.4rem 0 0.4rem 0;
  width: 100%;
  font-size: 1.125rem;
  font-weight: bold;
  color: white;
  border-radius: 4px;
  border: none;
  background: gray;
  cursor: pointer;
  &:active {
    background: black;
  }
`;

export default LargeButton;
