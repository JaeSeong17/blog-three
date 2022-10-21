import { MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from 'three';


function Plane() {
    const color = new THREE.Color('rgba(240, 240, 240, 1)');
    return (
      <mesh position={[0,0,0]}>
        <planeGeometry args={[1000, 1000]}/>
        <MeshReflectorMaterial
          color={color}
          blur={0} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={1} // How much blur mixes with surface roughness (default = 1)
          mixStrength={3} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={1} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          distortion={0} // Amount of distortion based on the distortionMap texture
          reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh>
    );
  }

  export default Plane;