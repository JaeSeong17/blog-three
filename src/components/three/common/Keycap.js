import * as THREE from 'three';
// import { useSpring, config, animated } from '@react-spring/three';
import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIndex, setTarget } from '../../../modules/root/controller';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { setCurrTag, setCurrMode, setComplete } from '../../../modules/root/posts';

const Keycap = forwardRef(({ position, index, writeBtn, tag }, ref) => {
  const dispatch = useDispatch();
  const target = useSelector(state => state.controller.target);
  const current = useSelector(state => state.controller.index);
  const { nodes } = useGLTF('/keycap.glb');
  const innerRef = useRef();
  useImperativeHandle(ref, () => innerRef.current);

  // const threeColor = new THREE.Color();
  // const { scale, color } = useSpring({
  //   color: target === 'board' && index === current ? threeColor.set('rgba(255, 77, 77, 1)').convertSRGBToLinear() : threeColor.set('rgba(255, 255, 255, 1)').convertSRGBToLinear(),
  //   config: config.wobbly
  // });

  useEffect(() => {
    console.log(innerRef.current);
  }, [target, index]);

  const clickAnime = gsap.timeline();
  return (
    <mesh
      receiveShadow
      castShadow
      ref={innerRef}
      position={position}
      scale={1.2}
      onClick={e => {
        e.stopPropagation();
        if (writeBtn) {
          dispatch(setIndex(-1));
          dispatch(setCurrMode('write'));
          dispatch(setTarget('screen'));
        } else {
          if (current === index) {
            dispatch(setComplete());
          } else {
            dispatch(setIndex(index));
          }
          dispatch(setCurrMode('post'));
          dispatch(setCurrTag(tag === 'Total' ? null : tag));
          dispatch(setTarget('board'));
        }
        clickAnime.to(innerRef.current.position, {
          z: 0.5,
          repeat: 1,
          yoyo: true,
          duration: 0.05,
        });
      }}
      rotation={[Math.PI / 2, 0, 0]}
      geometry={nodes.Cube.geometry}>
      <meshStandardMaterial
        // color={color}
        roughness={0}
        metalness={0.8}
        emissive={new THREE.Color('#ff0000').convertSRGBToLinear()}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  );
});

export default Keycap;
