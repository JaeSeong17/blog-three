import { useRef, useState, useEffect, forwardRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial, Environment, Lightformer, useScroll, ScrollControls, PerspectiveCamera } from "@react-three/drei";
import styled from "styled-components";
import * as THREE from 'three';
import { useSpring, animated, config } from "@react-spring/three";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { setFocusIn, setFocusOut, setIndex, setClickable } from './modules/controller';
import { useDispatch, useSelector } from 'react-redux';
import { isVisible } from "@testing-library/user-event/dist/utils";


// CameraControls.install({ THREE })

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  ::-webkit-scrollbar{
    display: none;
  }
`;

const Box = forwardRef(({ position, focused }, ref) => {
  // Hold state for hovered and clicked events
  // const ref = useRef();

  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame

  const threeColor = new THREE.Color()
  const { scale, color } = useSpring({
    scale: focused ? [1, 1, 1.5] : [1, 1, 1],
    color: focused ? threeColor.set('rgba(255, 0, 0, 1)') : threeColor.set('rgba(255, 77, 77, 1)'),
    config: config.wobbly
  });

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <animated.mesh
      ref={ref}
      position={position}
      scale={scale}
      onClick={(e) => click(!clicked)}>
      <boxGeometry args={[1, 4, 5]} />
      <animated.meshStandardMaterial color={color} />
    </animated.mesh>
  )
})

function BoxContainer() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  const boxesRef = useRef([]);
  const boxesPos = []
  const conRef = useRef()
  const scroll = useScroll()
  const [clicked, click] = useState(false)
  const camera = useThree((state) => state.camera)

  //redux test
  const dispatch = useDispatch();

  const index = useSelector(state => state.controller.index)
  const focused = useSelector(state => state.controller.focus)
  const clickable = useSelector(state => state.controller.clickable)

  gsap.registerPlugin(CustomEase);
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      boxesPos.push(boxesRef[i].position);
    }
    gsap.timeline()
      .to(boxesPos, {
        z: 0,
        ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.232,1.89 0.49,1.194 0.666,0.718 0.818,1.001 1,1 "),
        duration: 1,
        stagger: 0.1
      })
  }, [])

  useEffect(() => {
    gsap.to(boxesRef[index].position, {
      z: focused ? 8 : 0,
      duration: 0.5
    })
    if (!focused) {
      scroll.offset = index / (data.length - 1)
    }
  }, [focused])

  useFrame(() => {
    if (!focused) {
      camera.position.x = 12 - (scroll.offset * (data.length - 1) * 1.5);
      dispatch(setIndex(parseInt((scroll.offset < 0.0001 ? 0 : scroll.offset) * data.length)))
      dispatch(setClickable(scroll.delta < 0.001))
      console.log(scroll)
    }

  })
  return (
    <group
      ref={conRef}
      onClick={(e) => {
        if (clickable) {
          dispatch(setFocusIn())
          e.stopPropagation()
        }
      }} >
      {data.map((i, idx) => (
        <Box
          ref={el => boxesRef[idx] = el}
          key={i}
          index={idx}
          position={[idx * -1.5, 0, -4]}
          focused={index === idx} />
      ))}
    </group>
  )
}

function Plane() {
  const color = new THREE.Color('rgba(255, 255, 255, 1)');
  const dispatch = useDispatch();
  return (
    <mesh position={[0, 0, -1]} onClick={(e) => dispatch(setFocusOut())}>
      <planeGeometry args={[1000, 1000]} />
      <MeshReflectorMaterial
        color={color}
        blur={[1000, 1000]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={0.8} // How much blur mixes with surface roughness (default = 1)
        mixStrength={1} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={1} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        distortion={0} // Amount of distortion based on the distortionMap texture
        distortionMap={null} // The red channel of this texture is used as the distortion map. Default is null
        reflectorOffset={1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
}

function CanvasTest() {
  const color = new THREE.Color('rgba(220, 220, 220, 1)');
  const lightColor = new THREE.Color('rgba(200, 200, 200, 1)')
  const focus = useSelector(state => state.controller.focus)

  return (
    <Wrapper>
      <Canvas shadows camera={{
        position: [12, 12, 12],
        castShadow: true,
        up: [0, 0, 1]
      }}>
        <primitive object={new THREE.AxesHelper(10)} />
        <fog attach="fog" args={[color, 10, 60]} />
        <color attach="background" args={[color]} />
        <ambientLight intensity={0.5} />
        {/* <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}/> */}
        {/* <pointLight position={[-10, -10, -10]} color={lightColor} intensity={3} /> */}
        <spotLight position={[50, 50, -30]} castShadow />
        <directionalLight position={[0, -5, 0]} color={lightColor} intensity={2} />
        <ScrollControls enabled={!focus} distance={3}>
          <BoxContainer />
        </ScrollControls>
        <Plane />
        <Environment resolution={32}>
          <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
          <Lightformer position={[10, 0, -10]} scale={10} color={lightColor} intensity={6} />
          <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
        </Environment>

      </Canvas>
    </Wrapper>
  )
}

export default CanvasTest;