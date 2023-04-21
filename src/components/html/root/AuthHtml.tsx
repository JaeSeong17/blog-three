import { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import { AuthBoxReducerCarrier } from 'reducer-carrier-types';
import { AuthFormType } from 'preset-types';
import styled from 'styled-components';
import Success from '../auth/Success';
import VerifyForm from '../auth/VerifyForm';
import LargeButton from '../common/LargeButton';

const AuthHtmlBlock = styled.div`
  background-color: white;
  width: 340px;
  height: 390px;
  padding: 0.4rem 1rem 0.4rem 1rem;
  display: flex;
  flex-direction: column;

  & > *:last-child {
    margin-top: auto;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    flex: 1;
  }
  & > *:first-child {
    margin-right: 5px;
  }
  & > *:last-child {
    margin-left: 5px;
  }
`;

const AuthHtml = ({
  enterHandler,
  authReducerCarrier,
  userReducerCarrier,
  loadingReducerCarrier,
}: AuthBoxReducerCarrier) => {
  const [type, setType] = useState<AuthFormType>('login');

  // 화면 전환
  let currForm;
  if (type === 'login') {
    currForm = (
      <LoginForm
        authReducerCarrier={authReducerCarrier}
        userReducerCarrier={userReducerCarrier}
        loadingReducerCarrier={loadingReducerCarrier}
        enterHandler={enterHandler}
      />
    );
  } else if (type === 'register') {
    currForm = (
      <RegisterForm
        authReducerCarrier={authReducerCarrier}
        loadingReducerCarrier={loadingReducerCarrier}
        setType={setType}
      />
    );
  } else if (type === 'verify') {
    currForm = (
      <VerifyForm
        authReducerCarrier={authReducerCarrier}
        loadingReducerCarrier={loadingReducerCarrier}
        setType={setType}
      />
    );
  } else if (type === 'success') {
    currForm = <Success />;
  } else {
    currForm = null;
  }

  // 로그인 & 회원가입 전환 버튼 핸들러
  function rotateBtnClickHandler() {
    authReducerCarrier.authInitializeAuth();
    if (type === 'login') {
      setType('register');
    } else {
      setType('login');
    }
  }

  return (
    <AuthHtmlBlock>
      {currForm}
      <Footer>
        <LargeButton onClick={() => enterHandler()}>게스트 입장</LargeButton>
        <LargeButton onClick={() => rotateBtnClickHandler()}>
          {type === 'login' ? '회원 가입' : '로그인'}
        </LargeButton>
      </Footer>
    </AuthHtmlBlock>
  );
};

export default AuthHtml;
