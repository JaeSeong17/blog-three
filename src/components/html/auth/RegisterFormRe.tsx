import AuthTemplate from './AuthTemplate';
import { useState, useEffect, ChangeEvent } from 'react';
import { LoginParams } from 'auth-type';
import { AuthInputParams, AuthState } from 'cert-state-types';
import { AuthFormType } from 'preset-types';
import { UserState } from 'cert-state-types';

interface RegisterFormParams {
  authReducerCarrier: {
    authLogin: (params: LoginParams) => void;
    authRegister: (params: LoginParams) => void;
    authChangeField: (params: AuthInputParams) => void;
    authInitializeForm: (params: AuthFormType) => void;
  };
  authStateCarrier: AuthState;
  userReducerCarrier: {
    userCheck: () => void;
    userInitialize: () => void;
  };
  userStateCarrier: UserState;
  setTargetToKey: () => void;
}

const RegisterFormRe = ({
  authReducerCarrier,
  authStateCarrier,
  userReducerCarrier,
  userStateCarrier,
  setTargetToKey,
}: RegisterFormParams) => {
  const { form, auth, authError, user } = {
    form: authStateCarrier.login,
    auth: authStateCarrier.auth,
    authError: authStateCarrier.authError,
    user: userStateCarrier.user,
  };
  const [error, setError] = useState<string | null>(null);

  // 인풋 변경 이벤트 핸들러
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    authReducerCarrier.authChangeField({
      form: 'register',
      key: name as 'username' | 'password' | 'passwordConfirm',
      value,
    });
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    //폼에 빈칸이 존재
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈칸을 모두 입력하세요');
      return;
    }
    // 비밀번호 확인 불일치
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      authReducerCarrier.authChangeField({
        form: 'register',
        key: 'password',
        value: '',
      });
      authReducerCarrier.authChangeField({
        form: 'register',
        key: 'passwordConfirm',
        value: '',
      });
      return;
    }
    authReducerCarrier.authRegister({ username, password });
    // 구현 예정
  };

  // 컴포넌트 처음 렌더링 시 form 초기화
  useEffect(() => {
    authReducerCarrier.authInitializeForm('register');
  }, []);

  useEffect(() => {
    if (authError) {
      // 이미 존재하는 계정명
      if (
        authError.response !== undefined &&
        authError.response.status === 409
      ) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      // 기타 이유
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      userReducerCarrier.userCheck();
    }
  }, [auth, authError]);

  //user 값이 잘 설정되었는지 확인
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
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterFormRe;
