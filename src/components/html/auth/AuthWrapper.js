import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';

const AuthWrapper = ({
  target,
  rootUser,
  initRootUser,
  updateRootUser,
  setTargetToKey,
}) => {
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
    currForm = <RegisterForm />;
  }
  return currForm;
};

export default AuthWrapper;
