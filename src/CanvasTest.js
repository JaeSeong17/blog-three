import { useRef, useState, useEffect, forwardRef } from "react";
import { Canvas, useFrame, useThree} from "@react-three/fiber";
import { MeshReflectorMaterial, Environment, Lightformer, useScroll, ScrollControls } from "@react-three/drei";
import styled from "styled-components";
import * as THREE from 'three';
import { useSpring, animated, config } from "@react-spring/three";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

// CameraControls.install({ THREE })

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Box = forwardRef(({position, focused}, ref) => {
    // Hold state for hovered and clicked events
    // const ref = useRef();

    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame

    const { scale, color } = useSpring({
      scale: focused ? [1,1,1.5] : [1,1,1],
      color: focused ? new THREE.Color('rgba(255, 0, 0, 1)') : new THREE.Color('rgba(255, 77, 77, 1)'),
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
  const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  const boxesRef = useRef([]);
  const boxesPos = []
  const conRef = useRef();
  const scroll = useScroll()
  const [focused, focus] = useState(0)

  gsap.registerPlugin(CustomEase);
  useEffect(() => {
    for(let i = 0; i< data.length; i++){
      boxesPos.push(boxesRef[i].position);
    }
    gsap.timeline()
    .to(boxesPos, {
      z: 0,
      ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.232,1.89 0.49,1.194 0.666,0.718 0.818,1.001 1,1 "),
      duration: 1,
      stagger: 0.1 
    })
  })
  
  const vec = new THREE.Vector3();
  useFrame(() => {
    conRef.current.position.x = scroll.offset * (data.length-1) * 1.5;
    const index = parseInt((scroll.offset < 0.0001 ? 0 : scroll.offset )* data.length)
    focus(index)
    // if (scroll.offset * data.length === )
  })
  return (
    <group ref={conRef}>
      {data.map((i,idx) => (
        <Box ref={el=>boxesRef[idx]=el} key={i} index={idx} position={[idx*-1.5, 0, -4]} focused={focused===idx}/>
      ))}
    </group>
  )
}

function Plane() {
  const color = new THREE.Color('rgba(255, 255, 255, 1)');
  return (
    <mesh position={[0,0,-1]}>
      <planeGeometry args={[1000, 1000]}/>
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
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  const color = new THREE.Color('rgba(220, 220, 220, 1)');
  return(
      <Wrapper>
        <Canvas shadows camera={{ 
              position: [12, 12, 12],
              castShadow: true,
              up: [0, 0, 1]
              }}>
            {/* <primitive object={new THREE.AxesHelper(10)} /> */}
            <fog attach="fog" args={[color, 10, 60]} />
            <color attach="background" args={[color]} />
            <ambientLight intensity={0.5} />
            {/* <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}/> */}
            <pointLight position={[-10, -10, -10]} color="red" intensity={3} />
            <spotLight position={[50, 50, -30]} castShadow />
            <directionalLight position={[0, -5, 0]} color="red" intensity={2} />
            <ScrollControls distance={3}>
              <BoxContainer/>
            </ScrollControls>
            <Plane />
            <Environment resolution={32}>
              <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
              <Lightformer position={[10, 0, -10]} scale={10} color="red" intensity={6} />
              <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
            </Environment>

        </Canvas>
      </Wrapper>
    )
}

export default CanvasTest;