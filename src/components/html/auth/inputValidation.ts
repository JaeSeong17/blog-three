interface InputValidationParams {
  email: string;
  password: string;
  passwordConfirm?: string | null;
  username?: string | null;
}

export const inputValidation = ({
  email,
  password,
  passwordConfirm = null,
  username = null,
}: InputValidationParams): { validation: boolean; message: string } => {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  //폼에 빈칸이 존재
  if (username === null || passwordConfirm === null) {
    if ([username, password].includes('')) {
      return {
        validation: false,
        message: '빈칸을 모두 입력하세요',
      };
    }
  } else {
    if ([email, username, password, passwordConfirm].includes('')) {
      return {
        validation: false,
        message: '빈칸을 모두 입력하세요',
      };
    }
  }

  //이메일 정규식에 걸림
  if (!regex.test(email)) {
    return {
      validation: false,
      message: '이메일 형식을 확인하세요.',
    };
  }

  // 닉네임 형식 확인(회원가입 폼)
  if (username && (username.length < 3 || username.length > 20)) {
    return {
      validation: false,
      message: '사용자 이름은 3~20자로 입력하세요.',
    };
  }

  // 비밀번호 확인 불일치(회원가입 폼)
  if (passwordConfirm && password !== passwordConfirm) {
    return {
      validation: false,
      message: '비밀번호가 일치하지 않습니다.',
    };
  }

  // 비밀번호 확인 불일치
  if (password.length < 4 || password.length > 20) {
    return {
      validation: false,
      message: '비밀번호는 4~20자로 입력하세요.',
    };
  }

  return {
    validation: true,
    message: '유효성 검증 통과',
  };
};

export default inputValidation;
