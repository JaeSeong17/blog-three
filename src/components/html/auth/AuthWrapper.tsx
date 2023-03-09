import { RootUser, User } from 'auth-type';
import { TargetSet } from 'preset-types';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthWrapperParams {
  target: TargetSet;
  rootUser: RootUser;
  initRootUser: () => void;
  updateRootUser: (user: User) => void;
  setTargetToKey: () => void;
}

const AuthWrapper = ({
  target,
  rootUser,
  initRootUser,
  updateRootUser,
  setTargetToKey,
}: AuthWrapperParams) => {
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
  }
  return currForm;
};

export default AuthWrapper;
