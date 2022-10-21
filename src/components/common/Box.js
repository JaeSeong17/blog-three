import * as THREE from 'three';
import { useSpring, config, animated } from '@react-spring/three';
import { useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIndex } from '../../modules/controller';

const Box = forwardRef(({position, index}, ref) => {
    const dispatch = useDispatch();
    const focused = useSelector(state => state.controller.focus)
    const current = useSelector(state => state.controller.index)


    const threeColor = new THREE.Color()
    const { scale, color } = useSpring({
      scale: focused && index === current ? [1,1,1.2] : [1,1,1],
      color: focused && index === current ? threeColor.set('rgba(255, 0, 0, 1)') : threeColor.set('rgba(255, 77, 77, 1)'),
      config: config.wobbly
    });
  
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <animated.mesh
        ref={ref}
        position={position}
        scale={scale}
        onClick={(e) => dispatch(setIndex(index))}>
        <boxGeometry args={[1, 4, 5]} />
        <animated.meshStandardMaterial 
            color={color}
        />
      </animated.mesh>
    )
})

export default Box;