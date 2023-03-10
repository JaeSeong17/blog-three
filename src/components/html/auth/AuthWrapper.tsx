import { RootAuthCarrier } from 'auth-type';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthWrapper = ({
  target,
  rootUser,
  initRootUser,
  updateRootUser,
  setTargetToKey,
}: RootAuthCarrier) => {
  let currForm;
  if (target === 'login') {
    currForm = (
      <LoginForm
        rootUser={rootUser}
        initRootUser={initRootUser}
        updateRootUser={updateRootUser}
        setTargetToKey={setTargetToKey}
      />
    );
  } else if (target === 'register') {
    currForm = (
      <RegisterForm
        updateRootUser={updateRootUser}
        setTargetToKey={setTargetToKey}
      />
    );
  } else {
    currForm = null;
  }
  return currForm;
};

export default AuthWrapper;
