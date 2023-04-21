import {
  LoginFormState,
  RegisterFormState,
  VerifyFormState,
} from 'root-state-types';
import { ChangeEventHandler, FormEventHandler } from 'react';
import styled from 'styled-components';
import { AuthFormType } from 'preset-types';
import LargeButton from '../common/LargeButton';

const AuthFormBlock = styled.div``;
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

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .loading-spinner {
    opacity: 0;
  }
`;
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875;
  margin-top: 1rem;
`;

interface AuthTemplateParams {
  type: AuthFormType;
  form: LoginFormState | RegisterFormState | VerifyFormState;
  onChange: ChangeEventHandler;
  onSubmit: FormEventHandler;
  loading: boolean | null;
  error: string | null;
  google: JSX.Element | null;
}

const textMap: { [index: string]: string } = {
  login: '로그인',
  register: '회원가입',
  verify: '메일인증',
  success: '가입성공',
};

const AuthTemplate = ({
  type,
  form,
  onChange,
  onSubmit,
  loading,
  error,
  google,
}: AuthTemplateParams) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <Header>
        <h3>{text}</h3>
        <img
          className="loading-spinner"
          src={process.env.PUBLIC_URL + '/loading.gif'}
          style={{ opacity: loading ? 1 : 0 }}
        />
      </Header>
      <form onSubmit={onSubmit}>
        {(type === 'login' || type === 'register') && (
          <StyledInput
            autoComplete="email"
            name="email"
            placeholder="이메일"
            type="email"
            onChange={onChange}
            value={(form as LoginFormState | RegisterFormState).email}
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="username"
            name="username"
            placeholder="닉네임(활동명 3~20자)"
            onChange={onChange}
            value={(form as RegisterFormState).username}
          />
        )}
        {(type === 'login' || type === 'register') && (
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
            value={(form as LoginFormState | RegisterFormState).password}
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={(form as RegisterFormState).passwordConfirm}
          />
        )}

        {type === 'verify' && (
          <StyledInput
            name="code"
            placeholder="메일로 발송된 인증번호를 입력해주세요"
            onChange={onChange}
            value={(form as VerifyFormState).code}
          />
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <LargeButton>{text}</LargeButton>
        {google}
      </form>
    </AuthFormBlock>
  );
};

export default AuthTemplate;
