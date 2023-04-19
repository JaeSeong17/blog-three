import { gsap, Linear } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { setTarget } from './modules/camController';
import { useDispatch } from 'react-redux';

const BackGround = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface LoadingProps {
  isComplete: boolean;
}

const Loading = ({ isComplete }: LoadingProps) => {
  const [onLoad, setOnLoad] = useState<boolean>(true);
  const dispatch = useDispatch();
  const spinnerRef = useRef<HTMLImageElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const rotateAnim = spinnerRef.current
    ? gsap.timeline().to(spinnerRef.current, {
        rotation: 360,
        duration: 3,
        ease: Linear.easeNone,
        repeat: -1,
      })
    : null;

  useEffect(() => {
    rotateAnim?.play();
  }, []);

  useEffect(() => {
    if (isComplete) {
      gsap
        .timeline()
        .to(rotateAnim, {
          timeScale: 0,
          duration: 1,
          onComplete: function () {
            this.pause();
          },
        })
        .to(checkRef.current, { opacity: 1 })
        .to(
          backRef.current,
          {
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
              setOnLoad(false);
              dispatch(setTarget('intro'));
            },
          },
          '+=0.5',
        );
    }
  }, [isComplete]);

  return (
    <>
      {onLoad && (
        <BackGround ref={backRef}>
          <img
            ref={spinnerRef}
            className="spinner"
            width={220}
            height={220}
            src={process.env.PUBLIC_URL + '/Gear.png'}
          />
          <div
            ref={checkRef}
            style={{ opacity: 0, width: '300px', height: '300px' }}>
            <svg width={300} height={300} viewBox="-142 -133 150 150">
              <path
                fill="none"
                stroke="#ff2626"
                strokeWidth="6"
                d="m 0 13 L 8 21 L 16 13"
              />
              <path />
            </svg>
          </div>
        </BackGround>
      )}
    </>
  );
};

export default Loading;
