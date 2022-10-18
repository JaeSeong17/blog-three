import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree} from "@react-three/fiber";
import { MeshReflectorMaterial, distortionTexture } from "@react-three/drei";
import styled from "styled-components";
import * as THREE from 'three';
import { useSpring, animated } from "@react-spring/three";

// CameraControls.install({ THREE })

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Box({position}) {
    const ref = useRef();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    const { scale } = useSpring({ scale: clicked ? 1.5 : 1})
    // Subscribe this component to the render-loop, rotate the mesh every frame
    let vec = new THREE.Vector3()
    useFrame((state, delta) => {
      ref.current.rotation.x += 0.01      
      // console.log(state.camera.position);
      if(clicked) {
        state.camera.position.lerp(vec.set(ref.current.position.x*10, 0, 3), .01)
        state.camera.lookAt(ref.current.position)
      }else {
        state.camera.position.lerp(vec.set(0,10,10), .01)
        state.camera.lookAt(vec.set(0,0,0))
        state.camera.up.set(0, 0, 1)
      }
      
    })
    
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <animated.mesh
        position={position}
        ref={ref}
        scale={scale}
        onClick={(e) => {
          click(!clicked);
          // zoomToView(e.object.position);
        }}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 2, 2]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </animated.mesh>
    )
}

function Plane() {
  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[100, 100]}/>
      <MeshReflectorMaterial
        color="#151515"
        blur={[1000, 1000]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={1} // How much blur mixes with surface roughness (default = 1)
        mixStrength={1} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={1} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        distortion={1} // Amount of distortion based on the distortionMap texture
        distortionMap={null} // The red channel of this texture is used as the distortion map. Default is null
        debug={0} /* Depending on the assigned value, one of the following channels is shown:
          0 = no debug
          1 = depth channel
          2 = base channel
          3 = distortion channel
          4 = lod channel (based on the roughness)
        */
      reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
}

function CanvasTest() {
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  return(
      <Wrapper>
        <Canvas camera={{ position: [0, 10, 10], castShadow: true }}>
            <primitive object={new THREE.AxesHelper(10)} />
            <ambientLight />
            <directionalLight color="white" position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <Plane />

        </Canvas>
      </Wrapper>
    )
}

export default CanvasTest;