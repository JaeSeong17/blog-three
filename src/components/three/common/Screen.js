import { Html } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gsap from 'gsap';
import ScreenHtml from '../../html/root/ScreenHtml';
import { setTarget } from '../../../modules/controller';
import { setCurrMode } from '../../../modules/posts';

const Screen = () => {
  const dispatch = useDispatch();
  const target = useSelector(state => state.controller.target);
  const { currPostUsername, currPostId, currMode } = useSelector(
    state => state.posts,
  );
  const screenRef = useRef(null);

  useEffect(() => {
    gsap.to(screenRef.current, {
      autoAlpha: target === 'screen' ? 1 : 0,
      duration: 1,
    });
  }, [target]);

  function writeComplete() {
    dispatch(setCurrMode('post'));
  }

  return (
    <group position={[0, 40, 12]}>
      <mesh>
        <boxGeometry args={[30, 1, 21]} />
        <meshStandardMaterial />
        <Html
          transform
          occlude={true}
          distanceFactor={10}
          rotation-x={Math.PI / 2}
          position={[0, -0.51, -0.5]}
          style={{ opacity: 0 }}
          ref={screenRef}>
          <ScreenHtml
            currPostUsername={currPostUsername}
            currPostId={currPostId}
            currMode={currMode}
            writeComplete={writeComplete}
          />
        </Html>
      </mesh>
      <mesh
        position={[-13, -0.5, 9.5]}
        onClick={e => {
          if (currMode === 'write') {
            dispatch(setTarget('key'));
          } else if (currMode === 'post') {
            dispatch(setTarget('board'));
          }
          dispatch(setCurrMode('root'));
        }}>
        <boxGeometry args={[3, 0.5, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
};

export default Screen;
