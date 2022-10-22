import * as THREE from 'three';
import { useSpring, config, animated } from '@react-spring/three';
import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFocusIn, setFocusOut, setIndex, setCamAngle, setCamPos } from '../../modules/controller';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';

const Keycap = forwardRef(({position, index}, ref) => {
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
        scale={1.2}
        onClick={(e) => {
          e.stopPropagation()
          if (index === current){
            if(focused){
              dispatch(setFocusOut())
              dispatch(setCamAngle({x:0, y: 3, z:0}))
              dispatch(setCamPos({x:15, y: 5, z:20}))
            }else {
              dispatch(setFocusIn())
              dispatch(setCamAngle({x:0, y: 12, z:5}))
              dispatch(setCamPos({x:10, y: 12, z:4}))
            }
          } else {
            dispatch(setFocusIn())
            dispatch(setIndex(index))
            dispatch(setCamAngle({x:0, y: 12, z:5}))
            dispatch(setCamPos({x:10, y: 12, z:4}))
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