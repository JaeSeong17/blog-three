import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import { AuthBoxReducerCarrier } from 'reducer-carrier-types';

const AuthHtml = ({
  target,
  setTargetToKey,
  authReducerCarrier,
  userReducerCarrier,
}: AuthBoxReducerCarrier) => {
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
