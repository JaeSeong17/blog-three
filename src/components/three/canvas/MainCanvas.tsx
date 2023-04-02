import styled from 'styled-components';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Plane from '../common/Plane';
import MainScene from '../scene/MainScene';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainCanvas = () => {
  const backColor = new THREE.Color('#fcfafa');
  const lightColor = new THREE.Color('rgba(240, 40, 40, 1)');

  return (
    <Wrapper>
      <Canvas
        camera={{
          position: [0, -33, 3],
          castShadow: true,
          up: [0, 0, 1],
        }}>
        <fog attach="fog" args={[backColor, 20, 60]} />
        <color attach="background" args={[backColor]} />
        <ambientLight intensity={0.25} />
        <directionalLight
          castShadow
          intensity={0.2}
          position={[10, 6, 6]}
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight
          position={[10, 10, 10]}
          color={lightColor}
          intensity={0.7}
          castShadow
        />
        <pointLight
          position={[-10, -10, 10]}
          color={lightColor}
          intensity={0.3}
          castShadow
        />
        <MainScene />
        <Plane />
        {/* <OrbitControls /> */}
      </Canvas>
      <Loader />
    </Wrapper>
  );
};

export default MainCanvas;
