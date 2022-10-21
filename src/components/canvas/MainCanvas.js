import styled from "styled-components";
import * as THREE from 'three';
import { Canvas, useFrame, useThree} from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import Plane from "../common/Plane";
import BoxContainer from "../container/BoxContainer";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";


const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

function MainCanvas() {
    const backColor = new THREE.Color('rgba(220, 220, 220, 1)');
    const lightColor = new THREE.Color('rgba(255, 255, 255, 1)')
    const focus = useSelector(state => state.controller.focus)
    const camRef = useRef();

    return(
        <Wrapper>
          <Canvas camera={{ 
                position: [10, 10, 5],
                castShadow: true,
                up: [0, 0, 1]
                }}>
              {/* <primitive object={new THREE.AxesHelper(10)} /> */}
              <fog attach="fog" args={[backColor, 20, 70]} />
              <color attach="background" args={[backColor]} />
              <ambientLight intensity={0.25} />
              <directionalLight castShadow intensity={0.2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}/>
              <pointLight position={[10, 10, 10]} color={lightColor} intensity={1} castShadow/>
              {/* <spotLight position={[10, 0, 5]} angle={0.5} penumbra={0.4} intensity={1.5} /> */}
              {/* <directionalLight position={[0, -5, 0]} color={lightColor} intensity={2} /> */}

              <BoxContainer/>
              <Plane />
              {/* <Environment resolution={32}>
                <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
                <Lightformer position={[10, 0, -10]} scale={10} color={lightColor} intensity={6} />
                <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
              </Environment> */}
              {/* <OrbitControls ref={camRef}/> */}
          </Canvas>
        </Wrapper>
      )
  }
  
  export default MainCanvas;