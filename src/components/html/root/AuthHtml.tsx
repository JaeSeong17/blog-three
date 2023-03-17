import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import { AuthCarrier } from 'auth-type';

const AuthHtml = ({
  target,
  setTargetToKey,
  authReducerCarrier,
  userReducerCarrier,
}: AuthCarrier) => {
  let currForm;
  if (target === 'login') {
    currForm = (
      <LoginForm
        authReducerCarrier={authReducerCarrier}
        userReducerCarrier={userReducerCarrier}
        setTargetToKey={setTargetToKey}
      />
    );
  } else if (target === 'register') {
    currForm = (
      <RegisterForm
        authReducerCarrier={authReducerCarrier}
        userReducerCarrier={userReducerCarrier}
        setTargetToKey={setTargetToKey}
      />
    );
  } else {
    currForm = null;
  }
  return currForm;
};

export default AuthHtml;
