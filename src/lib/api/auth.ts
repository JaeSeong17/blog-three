import client from './client';
import {
  GoogleLoginParams,
  LoginParams,
  RegisterParams,
  VerifyParams,
} from 'auth-type';

// 로그인
export const login = ({ email, password }: LoginParams) =>
  client.post('/api/auth/login', { email, password });

// 회원가입
export const register = ({ email, username, password }: RegisterParams) =>
  client.post('/api/auth/register', { email, username, password });

// 인증코드 확인
export const verify = ({ email, code }: VerifyParams) =>
  client.post('/api/auth/verify', { email, code });

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');

// 로그아웃
export const logout = () => client.post('/api/auth/logout');

// 구글 로그인
export const googleLogin = ({ googleToken }: GoogleLoginParams) =>
  client.post('/api/auth/google/login', { googleToken });
