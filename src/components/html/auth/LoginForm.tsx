import AuthTemplate from './AuthTemplate';
import { useState, ChangeEvent, useEffect } from 'react';
import { AuthState, UserState, AuthInputParams } from 'root-state-types';
import { AuthFormType } from 'preset-types';
import { LoginParams } from 'auth-type';

interface LoginFormParams {
  authReducerCarrier: {
    authState: AuthState;
    authLogin: (params: LoginParams) => void;
    authChangeField: (params: AuthInputParams) => void;
    authInitializeForm: (params: AuthFormType) => void;
  };
  userReducerCarrier: {
    userState: UserState;
    userCheck: () => void;
    userInitialize: () => void;
  };
  setTargetToKey: () => void;
}

const LoginForm = ({
  authReducerCarrier,
  userReducerCarrier,
  setTargetToKey,
}: LoginFormParams) => {
  const { login: form, auth, authError } = authReducerCarrier.authState;
  const { user } = userReducerCarrier.userState;
  const [error, setError] = useState<string | null>(null);

  // 인풋 변경 이벤트 핸들러
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    authReducerCarrier.authChangeField({
      form: 'login',
      key: name as 'username' | 'password',
      value,
    });
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = form;
    authReducerCarrier.authLogin({ username, password });
  };

  // 컴포넌트 처음 렌더링 시 form 초기화
  useEffect(() => {
    authReducerCarrier.authInitializeForm('login');
  }, []);

  // 로그인 시도 후 결과에 따라
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      userReducerCarrier.userCheck();
    }
  }, [auth, authError]);

  useEffect(() => {
    console.log('로그인 상태 확인');
    if (user) {
      console.log('로그인 상태 확인 성공');
      setTargetToKey();
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStroage is not workding');
      }
    }
  }, [user]);

  return (
    <AuthTemplate
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
