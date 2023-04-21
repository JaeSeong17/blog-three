import AuthTemplate from './AuthTemplate';
import { useState, useEffect, ChangeEvent } from 'react';
import { FormReducerCarrier } from 'reducer-carrier-types';
import inputValidation from './inputValidation';

const RegisterForm = ({
  authReducerCarrier,
  loadingReducerCarrier,
  setType,
}: Omit<FormReducerCarrier, 'userReducerCarrier' | 'enterHandler'>) => {
  const { register: form, auth, authError } = authReducerCarrier.authState;
  const loading = loadingReducerCarrier.loadingState['auth/register'];
  const [error, setError] = useState<string>('');

  // 인풋 변경 이벤트 핸들러
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    authReducerCarrier.authChangeField({
      form: 'register',
      key: name as 'username' | 'email' | 'password' | 'passwordConfirm',
      value,
    });
  };

  // 폼 등록 이벤트 핸들러 (입력값 확인)
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password, passwordConfirm } = form;

    // 입력값 유효성 검증
    const result = inputValidation({
      username,
      email,
      password,
      passwordConfirm,
    });

    if (!result.validation) {
      setError(result.message);
      return;
    }

    authReducerCarrier.authRegister({ username, email, password });
  };

  // 컴포넌트 처음 렌더링 시 form 초기화
  useEffect(() => {
    authReducerCarrier.authInitializeForm('register');
  }, []);

  // 회원가입 요청에 따른 결과
  useEffect(() => {
    if (authError) {
      // 이미 존재하는 계정명
      if (authError.response) {
        setError((authError.response.data as { message: string }).message);
        return;
      }
      // 기타 이유
      setError('회원가입 요청 실패');
      return;
    }
    setError('');
    if (auth) {
      // console.log('회원가입 요청 성공');
      setType('verify');
    }
  }, [auth, authError]);

  return (
    <AuthTemplate
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      google={null}
    />
  );
};

export default RegisterForm;
