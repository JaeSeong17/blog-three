import AuthTemplate from './AuthTemplate';
import { useState, ChangeEvent, useEffect } from 'react';
import { FormReducerCarrier } from 'reducer-carrier-types';

// index.html에서 이미 선언된 전역 변수임을 알림
declare let google: any;

const LoginForm = ({
  authReducerCarrier,
  userReducerCarrier,
  setTargetToKey,
}: FormReducerCarrier) => {
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
    //폼에 빈칸이 존재
    if ([username, password].includes('')) {
      setError('빈칸을 모두 입력하세요');
      return;
    }
    authReducerCarrier.authLogin({ username, password });
  };

  // 컴포넌트 처음 렌더링 시 form 초기화
  useEffect(() => {
    authReducerCarrier.authInitializeForm('login');
  }, []);

  // 서버로부터 계정 정보 존재 확인 결과
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

  // 유효한 토큰인지 확인한 결과
  useEffect(() => {
    if (user) {
      console.log('계정 토큰 확인 성공');
      setTargetToKey();
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStroage is not workding');
      }
    }
  }, [user]);

  // 구글 로그인
  // 구글 로그인 api로부터 받은 google token을 서버로 전송
  const handleCallbackResponse = (response: any) => {
    authReducerCarrier.authGoogleLogin({ googleToken: response.credential });
  };

  // 구글 로그인 연동 및 버튼 렌더링
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'filled_black',
      size: 'large',
      width: '340',
    });
  }, []);

  return (
    <AuthTemplate
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      google={<div id="signInDiv" />}
    />
  );
};

export default LoginForm;
