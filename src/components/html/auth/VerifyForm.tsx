import { FormReducerCarrier } from 'reducer-carrier-types';
import AuthTemplate from './AuthTemplate';
import { ChangeEvent, useEffect, useState } from 'react';
import { User } from 'auth-type';

const VerifyForm = ({
  authReducerCarrier,
  loadingReducerCarrier,
  setType,
}: Omit<FormReducerCarrier, 'userReducerCarrier' | 'enterHandler'>) => {
  const {
    verify: form,
    verification,
    auth,
    authError,
  } = authReducerCarrier.authState;
  const loading = loadingReducerCarrier.loadingState['auth/verify'];
  const [error, setError] = useState<string>('');

  // 인풋 변경 이벤트 핸들러
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    authReducerCarrier.authChangeField({
      form: 'verify',
      key: name as 'code',
      value,
    });
  };

  // 폼 등록 이벤트 핸들러 (입력값 확인)
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { code } = form;

    if (code.length !== 4) {
      setError('코드를 다시 확인해주세요.');
      return;
    }
    authReducerCarrier.authVerify({ email: (auth as User).email, code });
  };

  // 컴포넌트 처음 렌더링 시 form 초기화
  useEffect(() => {
    authReducerCarrier.authInitializeForm('verify');
  }, []);

  // 인증번호 확인 요청에 따른 결과
  useEffect(() => {
    if (authError) {
      // 이미 존재하는 계정명
      if (authError.response?.status === 409) {
        setError((authError.response.data as { message: string }).message);
        return;
      }
      // 기타 이유
      setError('인증코드 확인 실패');
      return;
    }
    setError('');
    if (verification && auth) {
      // console.log('인증 코드 확인 성공');
      setType('success');
    }
  }, [auth, authError]);

  return (
    <AuthTemplate
      type="verify"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      google={null}
    />
  );
};

export default VerifyForm;
