import * as THREE from 'three';
import { useSpring, config, animated } from '@react-spring/three';
import { forwardRef, useRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIndex, setTarget } from '../../../modules/controller';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { setCurrMode } from '../../../modules/posts';

const Keycap = forwardRef(({position, index, writeBtn}, ref) => {
    const dispatch = useDispatch();
    const focused = useSelector(state => state.controller.focus)
    const target = useSelector(state => state.controller.target)
    const current = useSelector(state => state.controller.index)
    const { nodes } = useGLTF('/keycap.glb')
    const innerRef = useRef();
    useImperativeHandle(ref, () => innerRef.current);

    const threeColor = new THREE.Color()
    const { scale, color } = useSpring({
      scale: focused && index === current ? 1.1 : 1.5,
      color: target === 'board' && index === current ? threeColor.set('rgba(255, 77, 77, 1)').convertSRGBToLinear() : threeColor.set('rgba(255, 255, 255, 1)').convertSRGBToLinear(),
      config: config.wobbly
    });

    const clickAnime = gsap.timeline()
    return (
      <animated.mesh receiveShadow castShadow
        ref={innerRef}
        position={position}
        scale={1.2}
        onClick={(e) => {
          e.stopPropagation()
          if (writeBtn){
            dispatch(setCurrMode('write'))
            dispatch(setTarget('screen'))
          }else {
            dispatch(setCurrMode('post'))
            if (index === current){
              if(focused){
                dispatch(setTarget('key'))
              }else {
                dispatch(setTarget('board'))
              }
            } else {
              dispatch(setIndex(index))
              dispatch(setTarget('board'))
            }
          }
          clickAnime.to(innerRef.current.position, {
            z: 0.5,
            repeat: 1,
            yoyo: true,
            duration: 0.05
          })
        }}
        rotation={[Math.PI/2,0,0]}
        geometry={nodes.Cube.geometry}
        >
        <animated.meshStandardMaterial 
            color={color}
            roughness= {0}
            metalness= {0.8}
            emissive= {new THREE.Color('#ff0000').convertSRGBToLinear()}
            clearcoat= {1}
            clearcoatRoughness={0}
        />
      </animated.mesh>
    )
})

export default Keycap;