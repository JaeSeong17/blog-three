import AuthTemplate from './AuthTemplate';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeForm,
  register,
  changeField,
} from '../../../modules/auth/auth';
import { check, initializeUser } from '../../../modules/auth/user';

const RegisterForm = ({ updateRootUser, setTargetToKey }) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
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
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    //폼에 빈칸이 존재
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈칸을 모두 입력하세요');
      return;
    }
    // 비밀번호 확인 불일치
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }
    dispatch(register({ username, password }));
    // 구현 예정
  };

  // 컴포넌트 처음 렌더링 시 form 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
    return () => {
      initializeUser();
    };
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      // 이미 존재하는 계정명
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      // 기타 이유
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  //user 값이 잘 설정되었는지 확인
  useEffect(() => {
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
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;
