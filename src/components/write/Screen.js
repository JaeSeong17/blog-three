import { Html } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useSelector, Provider } from "react-redux";
import gsap from "gsap";
import { forwardRef } from "react";
import { configureStore } from '@reduxjs/toolkit';
import writeReducer, { writeSaga } from '../../modules/write';
import { all } from 'redux-saga/effects';
import { Route, Routes } from "react-router-dom";
import WritePage from "../../pages/WritePage";
import { BrowserRouter } from "../../../node_modules/react-router-dom/dist/index";
import createSagaMiddleware from 'redux-saga';

export function* rootSaga() {
    yield all([writeSaga()]);
}
const sagaMiddleware = createSagaMiddleware();
const writeStore = configureStore({
    reducer: {
        write: writeReducer,
    },
    devTools: true,
    middleware: [sagaMiddleware]
})
sagaMiddleware.run(rootSaga);

const Screen = forwardRef(({data}, ref) => {
    const target = useSelector(state => state.controller.target);
    const screenRef = useRef(null);
    
    useEffect(() => {
        gsap.to(screenRef.current, {
            autoAlpha: target === 'screen' ? 1 : 0,
            duration: 1
        })
    }, [target])

    return (
        <group position={[0, 40, 12]}>
            <mesh>
                <boxGeometry args={[30, 1, 20]}/>
                <meshStandardMaterial/>
                <Html
                    transform
                    occlude={true}
                    distanceFactor={10}
                    rotation-x={Math.PI/2}
                    position={[0, -0.51, 0]}
                    style={{ opacity: 0 }}
                    ref={screenRef}
                    >
                    <Provider store={writeStore} >
                        <BrowserRouter >
                            <Routes>
                                <Route path="/" element={<WritePage/>} />
                            </Routes>
                        </BrowserRouter>
                    </Provider>
                </Html>
                
            </mesh>
            
        </group>
    )
})

export default Screen;