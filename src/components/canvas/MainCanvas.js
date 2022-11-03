import styled from "styled-components";
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useProgress, Loader } from "@react-three/drei";
import Plane from "../common/Plane";
import { useEffect, useRef } from "react";

import MainScene from "../Scene/MainScene";
import { Suspense } from "react";


const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

// function Loader() {
//   const { active, progress, errors, item, loaded, total } = useProgress()
//   return <Html center>
//     <div>
//       {progress} % loaded
//     </div>
//     </Html>
// }

function MainCanvas() {
    const backColor = new THREE.Color('#fcfafa').convertSRGBToLinear();
    const lightColor = new THREE.Color('rgba(240, 40, 40, 1)').convertSRGBToLinear()
    const data = [...require("../../static/data.json")]
    const brdRef = useRef(null)
    const scrRef = useRef(null)


    return(
        <Wrapper>
          <Canvas camera={{ 
                position: [0, -33, 3],
                castShadow: true,
                up: [0, 0, 1]
                }}>
              {/* <primitive object={new THREE.AxesHelper(10)} /> */}
              <fog attach="fog" args={[backColor, 20, 60]} />
              <color attach="background" args={[backColor]} />
              <ambientLight intensity={0.25} />
              <directionalLight castShadow intensity={0.2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}/>
              <pointLight position={[10, 10, 10]} color={lightColor} intensity={0.7} castShadow/>
              <pointLight position={[-10, -10, 10]} color={lightColor} intensity={0.3} castShadow/>
              {/* <spotLight position={[15, 0, 20]} angle={0.4} penumbra={0.6} intensity={1} /> */}
              <Suspense fallback={null}>
                <MainScene />
              </Suspense>
              <Plane />
              {/* <OrbitControls /> */}
          </Canvas>
          <Loader />
        </Wrapper>
      )
  }
  
  export default MainCanvas;