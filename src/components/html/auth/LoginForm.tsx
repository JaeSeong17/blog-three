import AuthTemplate from './AuthTemplate';
import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeAuth,
  initializeForm,
  login,
} from 'src/modules/auth/auth';
import { check, initializeUser } from 'src/modules/auth/user';
import { RootUser, User } from 'auth-type';
import { AuthState, UserState } from 'auth-state-types';

interface LoginFormParams {
  rootUser: RootUser;
  initRootUser: () => void;
  updateRootUser: (user: User) => void;
  setTargetToKey: () => void;
}

const LoginForm = ({
  rootUser,
  initRootUser,
  updateRootUser,
  setTargetToKey,
}: LoginFormParams) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(
    ({ auth, user }: { auth: AuthState; user: UserState }) => ({
      form: auth.login,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
    }),
  );
  const [error, setError] = useState<string | null>(null);

  // 인풋 변경 이벤트 핸들러
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name as 'username' | 'password',
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
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
