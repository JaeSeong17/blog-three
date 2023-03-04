import AuthTemplate from './AuthTemplate';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeAuth,
  initializeForm,
  login,
} from '../../../modules/auth/auth';
import { check, initializeUser } from '../../../modules/auth/user';

const LoginForm = ({
  rootUser,
  initRootUser,
  updateRootUser,
  setTargetToKey,
}) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const [error, setError] = useState(null);

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  // 컴포넌트 처음 렌더링 시 form 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  // 로그인 시도 후 결과에 따라
  useEffect(() => {
    if (rootUser.tryLogout) return;
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (rootUser.tryLogout) {
      dispatch(initializeAuth());
      dispatch(initializeUser());
      initRootUser();
      return;
    }
    console.log('로그인 상태 확인');
    console.log(user);
    if (user) {
      console.log('로그인 상태 확인 성공');
      updateRootUser(user);
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
