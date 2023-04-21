import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import Plane from '../common/Plane';
import MainScene from '../scene/MainScene';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useSelector } from 'react-redux';
import { RootState } from 'root-state-types';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  opacity: 0;
`;

interface MainCanvasProps {
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainCanvas = ({ setComplete }: MainCanvasProps) => {
  const backColor = '#fcfafa';
  const lightColor = 'rgba(240, 40, 40, 1)';
  const wrapperRef = useRef<HTMLDivElement>(null);
  const target = useSelector((state: RootState) => state.camController.target);
  // 캔버스 인트로 fade-in 애니메이션
  useEffect(() => {
    if (target === 'intro' && wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        opacity: 1,
        duration: 2.5,
      });
    }
  }, [target]);

  return (
    <Wrapper ref={wrapperRef}>
      <Canvas
        camera={{
          position: [0, -35, 3],
          castShadow: true,
          up: [0, 0, 1],
        }}
        onCreated={() => setComplete(true)}>
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
