import { Html } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTarget } from '../../../modules/camController';
import GuestButton from './GuestButton';
import RegisterButton from './RegisterButton';
import { RootState } from 'root-state-types';
import { authBoxOnAnim, authBoxOffAnim } from '../anim/AuthBoxAnim';
import { Group } from 'three';
import AuthHtml from 'src/components/html/root/AuthHtml';
import { changeField, initializeForm, login, register } from 'src/modules/auth';
import { AuthInputParams } from 'root-state-types';
import { AuthFormType } from 'preset-types';
import { check, initializeUser } from 'src/modules/user';
import { LoginParams } from 'auth-type';

const AuthBox = () => {
  const dispatch = useDispatch();
  const boxRef = useRef<Group>(null);
  const btnRef = useRef<Group>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const target = useSelector(
    ({ camController }: RootState) => camController.target,
  );
  const activateTarget = ['login', 'register']; // AuthBox가 활성화 되는 타겟

  // root store의 auth 리듀서를 authBox내 Html로 전달할 객체
  const authReducerCarrier = {
    authState: useSelector(({ auth }: RootState) => auth),
    authLogin: (params: LoginParams) => dispatch(login(params)),
    authRegister: (params: LoginParams) => dispatch(register(params)),
    authChangeField: (params: AuthInputParams) => dispatch(changeField(params)),
    authInitializeForm: (params: AuthFormType) =>
      dispatch(initializeForm(params)),
  };
  // root store의 user 리듀서를 authBox내 Html로 전달할 객체
  const userReducerCarrier = {
    userState: useSelector(({ user }: RootState) => user),
    userCheck: () => dispatch(check()),
    userInitialize: () => initializeUser(),
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
  }, [target, boxRef.current, formRef.current, btnRef.current]);

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
          <AuthHtml
            target={target}
            setTargetToKey={setTargetToKey}
            authReducerCarrier={authReducerCarrier}
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
