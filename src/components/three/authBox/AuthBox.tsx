import { Html } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTarget } from '../../../modules/root/camController';
import { setRootUser, completeSyncLogout } from '../../../modules/root/user';
import AuthHtml from '../../html/root/AuthHtml';
import GuestButton from './GuestButton';
import RegisterButton from './RegisterButton';
import { RootState } from 'root-state-types';
import { authBoxOnAnim, authBoxOffAnim } from '../anim/AuthBoxAnim';
import { Group } from 'three';
import AuthHtmlRe from 'src/components/html/root/AuthHtmlRe';
import {
  changeField,
  initializeForm,
  login,
  register,
} from 'src/modules/auth/auth';
import { AuthInputParams } from 'cert-state-types';
import { AuthFormType } from 'preset-types';
import { check, initializeUser } from 'src/modules/auth/user';
import { LoginParams } from 'auth-type';

const AuthBox = () => {
  const dispatch = useDispatch();
  const boxRef = useRef<Group>(null);
  const btnRef = useRef<Group>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const activateTarget = ['login', 'register']; // AuthBox가 활성화 되는 타겟
  const { target, rootUser } = useSelector(
    ({ camController, user }: RootState) => ({
      target: camController.target,
      rootUser: user,
    }),
  );
  const authStateCarrier = useSelector(({ auth }: RootState) => auth);
  const authReducerCarrier = {
    authLogin: (params: LoginParams) => dispatch(login(params)),
    authRegister: (params: LoginParams) => dispatch(register(params)),
    authChangeField: (params: AuthInputParams) => dispatch(changeField(params)),
    authInitializeForm: (params: AuthFormType) =>
      dispatch(initializeForm(params)),
  };
  const userStateCarrier = useSelector(({ userRe }: RootState) => userRe);
  const userReducerCarrier = {
    userCheck: () => dispatch(check()),
    userInitialize: () => initializeUser(),
  };

  const updateRootUser = (user: string) => {
    dispatch(setRootUser(user));
  };
  const initRootUser = () => {
    dispatch(completeSyncLogout());
  };
  const setTargetToKey = () => {
    if (!activateTarget.includes(target)) return;
    dispatch(setTarget('loading'));
    setTimeout(() => dispatch(setTarget('key')), 2000);
  };

  useEffect(() => {
    // AuthBox 활성화/비활성화 애니메이션
    if (boxRef.current && formRef.current && btnRef.current) {
      if (activateTarget.includes(target)) {
        authBoxOnAnim(boxRef.current, formRef.current, btnRef.current); // 활성화
      } else {
        authBoxOffAnim(boxRef.current, formRef.current, btnRef.current); // 비활성화
      }
    }
  }, [target, boxRef, formRef, btnRef]);

  return (
    <group position={[3, -3, -3]} ref={boxRef}>
      <mesh rotation={[-Math.PI / 20, 0, -Math.PI / 20]}>
        <boxGeometry args={[5, 0.2, 4.5]} />
        <meshStandardMaterial />
        <Html
          ref={formRef}
          transform
          occlude={true}
          distanceFactor={5}
          rotation-x={Math.PI / 2}
          position={[0, -0.11, 0.26]}>
          <AuthHtmlRe
            target={target}
            setTargetToKey={setTargetToKey}
            authStateCarrier={authStateCarrier}
            authReducerCarrier={authReducerCarrier}
            userStateCarrier={userStateCarrier}
            userReducerCarrier={userReducerCarrier}
          />
        </Html>
      </mesh>
      <group ref={btnRef}>
        <GuestButton />
        <RegisterButton />
      </group>
    </group>
  );
};

export default AuthBox;
