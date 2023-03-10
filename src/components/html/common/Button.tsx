import styled, { css } from 'styled-components';

interface ButtonProps {
  red?: boolean;
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: blod;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: gray;
  &:hover {
    opacity: 0.75;
  }

  ${props =>
    props.fullWidth &&
    css`
      padding: 0.75rem 0 0.75rem 0;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${props =>
    props.red &&
    css`
      background: red;
      &:hover {
        opacity: 0.75;
      }
    `}
`;

export default Button;
