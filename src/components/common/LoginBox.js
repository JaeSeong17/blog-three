import { Html } from "@react-three/drei";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeField, initializeForm } from "../../modules/auth";
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../modules/auth';
import loadingReducer from '../../modules/loading';
import { Provider } from 'react-redux';

const Wrapper = styled.div`
    background-color: white;
    width: 340px;
    height: 240px;
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
const Footer = styled.div`
    text-align: right;
    color: gray;
    &:hover {
        color: black;
    }
`;

const store = configureStore({
    reducer: {
      auth: authReducer,
      loading: loadingReducer,
    },
    devTools: true
})

const LoginForm = () => {
    const dispatch = useDispatch();
    const { username, password } = useSelector(state => state.auth)

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
        // 구현 예정
    }

    // 컴포넌트 처음 렌더링 시 form 초기화
    useEffect(() => {
        dispatch(initializeForm())
    },[dispatch])

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
                <Button>확인</Button>
                <Footer>
                    <a>게스트이신가요?</a>
                </Footer>
            </form>
        </Wrapper>
    )
}

const LoginBox = () => {
    return (
        <group position={[3, -3, 3]}>
            <mesh 
                rotation={[-Math.PI/20,0,-Math.PI/20]}>
                <boxGeometry args={[5, 0.2, 4]}/>
                <meshStandardMaterial/>
                <Html
                    transform
                    occlude={true}
                    distanceFactor={5}
                    rotation-x={Math.PI/2}
                    position={[0, -0.11, 0]}>
                    <Provider store={store}>
                        <LoginForm />
                    </Provider>
                </Html>
            </mesh>
        </group>
    )    
}

export default LoginBox;