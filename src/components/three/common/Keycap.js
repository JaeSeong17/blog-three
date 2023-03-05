import { forwardRef, useRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIndex, setTarget } from '../../../modules/root/controller';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { setCurrTag, setCurrMode, setComplete } from 'src/modules/root/posts';

const Keycap = forwardRef(({ position, index, writeBtn, tag }, ref) => {
  const dispatch = useDispatch();
  const target = useSelector(state => state.controller.target);
  const user = useSelector(state => state.user.user);
  const current = useSelector(state => state.controller.index);
  const { nodes } = useGLTF('/keycap.glb');
  const innerRef = useRef();
  useImperativeHandle(ref, () => innerRef.current);

  let btnColor;
  let btnEmissive;
  if (writeBtn && !user) {
    btnColor = 'white';
    btnEmissive = 'black';
  } else if (target === 'board' && index === current) {
    btnColor = 'rgba(255, 77, 77, 1)';
    btnEmissive = '#ff0000';
  } else {
    btnColor = 'rgba(255, 255, 255, 1)';
    btnEmissive = '#ff0000';
  }

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
          if (!user) return;
          dispatch(setIndex(-1));
          dispatch(setCurrMode('write'));
          dispatch(setTarget('screen'));
        } else {
          if (current === index) {
            dispatch(setComplete());
          } else {
            dispatch(setIndex(index));
          }
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
        color={btnColor}
        roughness={0}
        metalness={0.8}
        emissive={btnEmissive}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  );
});

export default Keycap;
