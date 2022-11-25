import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import styled from "styled-components";
import authReducer, { changeField, initializeForm, login, authSaga } from '../../modules/auth';
import userReducer, { check, userSaga } from '../../modules/user';
import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../../modules/loading';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

const Wrapper = styled.div`
    background-color: white;
    width: 340px;
    height: 290px;
    padding: 1rem;
    /* opacity: 0; */
`;
const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid gray;
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid;
    }
    & + & {
        margin-top: 1rem;
    }
`;
const Button = styled.button`
    margin: 1rem 0 1rem 0;
    padding: 0.4rem 0 0.4rem 0;
    width: 100%;
    font-size: 1.125rem;
    font-weight: bold;
    color: white;
    border-radius: 4px;
    border: none;
    background: gray;
    cursor: pointer;
`;
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875;
    margin-top: 1rem;
`;
const Footer = styled.div`
    text-align: right;
    color: gray;
    &:hover {
        color: black;
    }
`;


export function* rootSaga() {
    yield all([authSaga(), userSaga()]);
}
const sagaMiddleware = createSagaMiddleware();
const authStore = configureStore({
    reducer: {
      auth: authReducer,
      loading: loadingReducer,
      user: userReducer
    },
    devTools: true,
    middleware: [sagaMiddleware]
})
sagaMiddleware.run(rootSaga);

const LoginForm = () => {
    const dispatch = useDispatch();
    const { username, password, auth, authError, user } = useSelector(({ auth, user }) => ({
        username: auth.username,
        password: auth.password,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));
    const [error, setError] = useState(null);

    // 인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                key: name,
                value
            })
        )
    }

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        dispatch(login({ username, password }));
        // 구현 예정
    };

    // 컴포넌트 처음 렌더링 시 form 초기화
    useEffect(() => {
        dispatch(initializeForm())
    }, [dispatch])

    useEffect(() => {
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
    }, [auth, authError, dispatch])

    useEffect(() => {
        console.log('로그인 상태 확인');
        if(user) {
            console.log('로그인 상태 확인 성공');
        }
    }, [user]);

    return (
        <Wrapper>
            <h2>로그인</h2>
            <form onSubmit={onSubmit}>
                <StyledInput 
                    autoComplete="username" 
                    name="username" 
                    placeholder="아이디"
                    onChange={onChange}
                    value={username}/>
                <StyledInput 
                    autoComplete="new-password"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                    onChange={onChange}
                    value={password}/>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button>확인</Button>
            </form>
            <Footer>
                <p>게스트이신가요?</p>
            </Footer>
        </Wrapper>
    )
}

const LoginBox = () => {
    return (
        <group position={[3, -3, 3]}>
            <mesh 
                rotation={[-Math.PI/20,0,-Math.PI/20]}>
                <boxGeometry args={[5, 0.2, 4.5]}/>
                <meshStandardMaterial/>
                <Html
                    transform
                    occlude={true}
                    distanceFactor={5}
                    rotation-x={Math.PI/2}
                    position={[0, -0.11, 0]}>
                    <Provider store={authStore}>
                        <LoginForm />
                    </Provider>
                </Html>
            </mesh>
        </group>
    )    
}

export default LoginBox;