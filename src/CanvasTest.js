import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import styled from "styled-components";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import * as THREE from 'three';
import { AxesHelper } from "three";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Box(props) {
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
      ref.current.rotation.x += 0.01
      if (clicked){
        state.camera.position.lerp(new THREE.Vector3().set(ref.current.position.x, 0, 3), .005)
        // state.camera.quaternion.slerp(
        //   new THREE.Quaternion.setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI / 2), .005)
      } else {
        state.camera.position.lerp(new THREE.Vector3().set(0, 0, 10), .005)
      }
      
    })
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 2, 2]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
}

function CanvasTest() {
    return(
        <Wrapper>
          <Canvas>
              <primitive object={new THREE.AxesHelper(10)} />
              <ambientLight />
              {/* <pointLight position={[10, 10, 10]} /> */}
              <directionalLight color="white" position={[10, 10, 10]} />
              <Box position={[-1.2, 0, 0]} />
              <Box position={[1.2, 0, 0]} />
              {/* <OrbitControls /> */}
          </Canvas>
        </Wrapper>
      )
}

export default CanvasTest;