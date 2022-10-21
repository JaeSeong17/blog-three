import * as THREE from 'three';
import { useSpring, config, animated } from '@react-spring/three';
import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFocusIn, setFocusOut, setIndex } from '../../modules/controller';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';

const material = new THREE.MeshPhysicalMaterial({
  roughness: 0,
  metalness: 0.8,
  emissive: new THREE.Color('#ff0000').convertSRGBToLinear(),
  clearcoat: 1,
  clearcoatRoughness: 0,
})

const Box = forwardRef(({position, index}, ref) => {
    const dispatch = useDispatch();
    const focused = useSelector(state => state.controller.focus)
    const current = useSelector(state => state.controller.index)
    const { nodes } = useGLTF('/keycap.glb')
    const innerRef = useRef();
    useImperativeHandle(ref, () => innerRef.current);

    const threeColor = new THREE.Color()
    const { scale, color } = useSpring({
      scale: focused && index === current ? 1.1 : 1.5,
      color: focused && index === current ? threeColor.set('rgba(255, 77, 77, 1)').convertSRGBToLinear() : threeColor.set('rgba(255, 255, 255, 1)').convertSRGBToLinear(),
      config: config.wobbly
    });

    const clickAnime = gsap.timeline()
    return (
      <animated.mesh receiveShadow castShadow
        ref={innerRef}
        position={position}
        material={material}
        scale={1.2}
        onClick={(e) => {
          if (index === current){
            focused ? dispatch(setFocusOut()) : dispatch(setFocusIn())
          } else {
            dispatch(setFocusIn())
            dispatch(setIndex(index))
          }
          clickAnime.to(innerRef.current.position, {
            z: 0.5,
            repeat: 1,
            yoyo: true,
            duration: 0.1,
            
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

export default Box;