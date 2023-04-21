import { ChangeEvent } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  width: 440px;
  & + &:before {
    margin-right: 10px;
  }
`;

const StyledInput = styled.input`
  width: 380px;
  height: 36px;
  font-size: 18px;
`;

const Button = styled.button`
  padding: 0.4rem 0 0.4rem 0;
  flex-grow: 1;
  font-size: 1.125rem;
  font-weight: bold;
  color: white;
  border-radius: 2px;
  border: none;
  background: gray;
  cursor: pointer;
`;

interface SearchInputParams {
  onSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
}

const SearchInput = ({ onSubmit }: SearchInputParams) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledInput
        type="text"
        name="search-input"
        placeholder="검색어를 입력하세요"
      />
      <Button>{'검색'}</Button>
    </StyledForm>
  );
};

export default SearchInput;
