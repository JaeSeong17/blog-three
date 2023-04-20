import client from './client';
import { GoogleLoginParams, LoginParams } from 'auth-type';

// 로그인
export const login = ({ username, password }: LoginParams) =>
  client.post('/api/auth/login', { username, password });

// 회원가입
export const register = ({ username, password }: LoginParams) =>
  client.post('/api/auth/register', { username, password });

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');

// 로그아웃
export const logout = () => client.post('/api/auth/logout');

// 구글 로그인
export const googleLogin = ({ googleToken }: GoogleLoginParams) =>
  client.post('/api/auth/google/login', { googleToken });
