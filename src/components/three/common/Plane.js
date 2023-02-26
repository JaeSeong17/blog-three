import { MeshReflectorMaterial } from '@react-three/drei';
import { useDispatch, useSelector } from 'react-redux';
import * as THREE from 'three';
import { setTarget } from '../../../modules/controller';

function Plane() {
  const color = new THREE.Color('rgba(240, 240, 240, 1)').convertSRGBToLinear();
  const target = useSelector(state => state.target);
  const dispatch = useDispatch();
  return (
    <mesh
      position={[0, 0, 0]}
      receiveShadow
      onClick={e => {
        e.stopPropagation();
        // if(!['start', 'login', 'loading'].includes(target)){
        //   dispatch(setTarget('key'))
        // }
      }}>
      <planeGeometry args={[1000, 1000]} />
      <MeshReflectorMaterial
        metalness={0.9}
        roughness={0.8}
        color={color}
        blur={[400, 100]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={1} // How much blur mixes with surface roughness (default = 1)
        mixStrength={15} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={1} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        distortion={0} // Amount of distortion based on the distortionMap texture
      />
    </mesh>
  );
}

export default Plane;
