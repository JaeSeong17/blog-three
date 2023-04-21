import { Html } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTarget } from '../../../modules/camController';
import { RootState } from 'root-state-types';
import { authBoxOnAnim, authBoxOffAnim } from '../anim/AuthBoxAnim';
import { Group } from 'three';
import AuthHtml from 'src/components/html/root/AuthHtml';
import {
  changeField,
  googleLogin,
  initializeAuth,
  initializeForm,
  login,
  register,
  verify,
} from 'src/modules/auth';
import { AuthInputParams } from 'root-state-types';
import { check, initializeUser } from 'src/modules/user';
import {
  GoogleLoginParams,
  LoginParams,
  RegisterParams,
  VerifyParams,
} from 'auth-type';
import { AuthFormType } from 'preset-types';

const AuthBox = () => {
  const dispatch = useDispatch();
  const boxRef = useRef<Group>(null);
  const btnRef = useRef<Group>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const target = useSelector(
    ({ camController }: RootState) => camController.target,
  );
  const activateTarget = ['auth']; // AuthBox가 활성화 되는 타겟

  // root store의 auth 리듀서를 authBox 내부로 전달
  const authReducerCarrier = {
    authState: useSelector(({ auth }: RootState) => auth),
    authLogin: (params: LoginParams) => dispatch(login(params)),
    authGoogleLogin: (params: GoogleLoginParams) =>
      dispatch(googleLogin(params)),
    authRegister: (params: RegisterParams) => dispatch(register(params)),
    authVerify: (params: VerifyParams) => dispatch(verify(params)),
    authChangeField: (params: AuthInputParams) => dispatch(changeField(params)),
    authInitializeForm: (param: AuthFormType) =>
      dispatch(initializeForm(param)),
    authInitializeAuth: () => dispatch(initializeAuth()),
  };
  // root store의 user 리듀서를 authBox 내부로 전달
  const userReducerCarrier = {
    userState: useSelector(({ user }: RootState) => user),
    userCheck: () => dispatch(check()),
    userInitialize: () => initializeUser(),
  };
  // root store의 loading 리듀서를 authBox 내부로 전달
  const loadingReducerCarrier = {
    loadingState: useSelector(({ loading }: RootState) => loading),
  };

  const enterHandler = () => {
    if (!activateTarget.includes(target)) return;
    dispatch(setTarget('entering'));
    setTimeout(() => {
      dispatch(setTarget('key'));
      dispatch(initializeAuth());
    }, 2000);
  };

  useEffect(() => {
    // AuthBox 활성화/비활성화 애니메이션
    if (boxRef.current && formRef.current) {
      if (activateTarget.includes(target)) {
        authBoxOnAnim(boxRef.current, formRef.current); // 활성화
      } else {
        authBoxOffAnim(boxRef.current, formRef.current); // 비활성화
      }
    }
  }, [target, boxRef.current, formRef.current, btnRef.current]);

  return (
    <group position={[3, -3, -3]} ref={boxRef}>
      <mesh rotation={[-Math.PI / 20, 0, -Math.PI / 20]}>
        <boxGeometry args={[5, 0.2, 5.3]} />
        <meshStandardMaterial />
        <Html
          ref={formRef}
          transform
          occlude={true}
          distanceFactor={5}
          rotation-x={Math.PI / 2}
          style={{ opacity: 0 }}
          position={[0, -0.11, 0]}>
          <AuthHtml
            enterHandler={enterHandler}
            authReducerCarrier={authReducerCarrier}
            userReducerCarrier={userReducerCarrier}
            loadingReducerCarrier={loadingReducerCarrier}
          />
        </Html>
      </mesh>
    </group>
  );
};

export default AuthBox;
