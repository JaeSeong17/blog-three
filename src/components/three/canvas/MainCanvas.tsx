import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import Plane from '../common/Plane';
import MainScene from '../scene/MainScene';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  opacity: 0;
`;

const MainCanvas = () => {
  const backColor = '#fcfafa';
  const lightColor = 'rgba(240, 40, 40, 1)';
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        opacity: 1,
        duration: 2.5,
      });
    }
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Canvas
        camera={{
          position: [0, -35, 3],
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
    </Wrapper>
  );
};

export default MainCanvas;
