import styled from 'styled-components';

const AuthFormBlock = styled.div`
  background-color: white;
  width: 340px;
  height: 290px;
  padding: 1rem;
`;
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid gray;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid;
  }
  & + & {
    margin-top: 1rem;
  }
`;
const Button = styled.button`
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
`;
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875;
  margin-top: 1rem;
`;
const Footer = styled.div`
  text-align: right;
  color: gray;
  &:hover {
    color: black;
  }
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthTemplate = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          authComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            authComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button>{text}</Button>
      </form>
      <Footer>
        {/* {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )} */}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthTemplate;
