import LoginFormRe from '../auth/LoginFormRe';
import RegisterFormRe from '../auth/RegisterFormRe';
import { AuthCarrier } from 'auth-type';

const AuthHtmlRe = ({
  target,
  setTargetToKey,
  authReducerCarrier,
  authStateCarrier,
  userReducerCarrier,
  userStateCarrier,
}: AuthCarrier) => {
  let currForm;
  if (target === 'login') {
    currForm = (
      <LoginFormRe
        authReducerCarrier={authReducerCarrier}
        authStateCarrier={authStateCarrier}
        userReducerCarrier={userReducerCarrier}
        userStateCarrier={userStateCarrier}
        setTargetToKey={setTargetToKey}
      />
    );
  } else if (target === 'register') {
    currForm = (
      <RegisterFormRe
        authReducerCarrier={authReducerCarrier}
        authStateCarrier={authStateCarrier}
        userReducerCarrier={userReducerCarrier}
        userStateCarrier={userStateCarrier}
        setTargetToKey={setTargetToKey}
      />
    );
  } else {
    currForm = null;
  }
  return currForm;
};

export default AuthHtmlRe;
