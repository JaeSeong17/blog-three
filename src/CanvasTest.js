import { useRef, useState, useMemo, useEffect, forwardRef } from "react";
import { Canvas, useFrame, useThree} from "@react-three/fiber";
import { MeshReflectorMaterial, distortionTexture, Environment } from "@react-three/drei";
import styled from "styled-components";
import * as THREE from 'three';
import { useSpring, animated, to } from "@react-spring/three";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

// CameraControls.install({ THREE })

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Box = forwardRef(({position}, ref) => {
    // Hold state for hovered and clicked events
    // const ref = useRef();
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    const { scale } = useSpring({ scale: clicked ? 1.5 : 1})
    // Subscribe this component to the render-loop, rotate the mesh every frame

    // let vec = new THREE.Vector3();
    // useFrame((state) => {
    //   ref.current.position.lerp(vec.set(ref.current.position.x, ref.current.position.y, 5), .03)
    // })

    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <animated.mesh
        ref={ref}
        position={position}
        scale={scale}
        onClick={(e) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 3, 5]} />
        <meshStandardMaterial color={hovered ? 'red' : '#bb86a1'} />
      </animated.mesh>
    )
})

function BoxContainer() {
  const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    
  const boxesRef = useRef([]);
  let boxesPos = []

  gsap.registerPlugin(CustomEase);
  useEffect(() => {
    for(let i = 0; i< data.length; i++){
      boxesPos.push(boxesRef[i].position);
    }
    gsap.timeline()
    .to(boxesPos, {
      z: 0,
      ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.232,1.89 0.49,1.194 0.666,0.718 0.818,1.001 1,1 "),
      duration: 2,
      stagger: 0.1 
    })
  })
  return (
    <group>
      {data.map((i,idx) => (
        <Box ref={el=>boxesRef[idx]=el} key={i} position={[i*1.5, 0, -4]} />
      ))}
    </group>
  )
}

function Plane() {
  return (
    <mesh position={[0,0,-1]}>
      <planeGeometry args={[1000, 1000]}/>
      <MeshReflectorMaterial
        color='white'
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
        distortion={1} // Amount of distortion based on the distortionMap texture
        distortionMap={null} // The red channel of this texture is used as the distortion map. Default is null
        reflectorOffset={1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
}

function CanvasTest() {
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})


  return(
      <Wrapper>
        <Canvas camera={{ position: [20, 20, 20], castShadow: true, up: [0, 0, 1] }}>
            <primitive object={new THREE.AxesHelper(10)} />
            <fog attach="fog" args={['#bbbbbb', 10, 60]} />
            <color attach="background" args={['#bbbbbb']} />
            <ambientLight intensity={0.5} />
            {/* <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}/> */}
            <pointLight position={[-10, -10, -10]} color="red" intensity={3} />
            <spotLight position={[50, 50, -30]} castShadow />
            <directionalLight position={[0, -5, 0]} color="red" intensity={2} />
            <BoxContainer/>
            <Plane />
        </Canvas>
      </Wrapper>
    )
}

export default CanvasTest;