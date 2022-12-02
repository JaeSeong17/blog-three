import { Text3D } from "@react-three/drei";
import * as THREE from 'three';
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { setTarget } from "../../modules/controller";

const material = new THREE.MeshStandardMaterial({
    color:new THREE.Color('#fafafa').convertSRGBToLinear(),
    roughness: 0,
    metalness: 0.8,
    emissive: new THREE.Color('#ff0000').convertSRGBToLinear()
})

const StartText3d = () => {
    const titleRef = useRef();
    const coneRef = useRef();
    const entireRef = useRef();
    const dispatch = useDispatch();
    const target = useSelector(state => state.controller.target);

    useEffect(() => {
        gsap.to(entireRef.current.position, {
            z: target === "start" ? 4 : -2,
            duration: 1.2,
        })
    }, [target])

    useEffect(() => {
        gsap.to(titleRef.current.position, {
            z: 0.2,
            repeat: -1,
            ease: 'power3.inOut',
            duration: 4,
            yoyo: true
        })
        gsap.to(coneRef.current.rotation, {
            y: Math.PI,
            repeat: -1,
            ease: "power2.inOut",
            yoyo: true,
            duration: 2
        })
    }, [])
    
    return (
        <group ref={entireRef}
            position={[0, -2, -2]}>
            <group ref={titleRef}>
                <Text3D
                    position={[0,0,0]}
                    material={material}
                    rotation={[Math.PI/2,-Math.PI/16,0]}
                    bevelEnabled
                    bevelSize={0.04}
                    bevelThickness={0.1}
                    height={0.02}
                    letterSpacing={-0.06}
                    size={0.75}
                    font="/NanumGothic_Regular.json">
                    재성의
                </Text3D>
                <Text3D
                    position={[2,0,-1.2]}
                    material={material}
                    rotation={[Math.PI/2,-Math.PI/12,0]}
                    bevelEnabled
                    bevelSize={0.04}
                    bevelThickness={0.1}
                    height={0.02}
                    letterSpacing={-0.06}
                    size={0.7}
                    font="/NanumGothic_Regular.json">
                    정보저장소
                </Text3D>
            </group>
            <group
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(setTarget('login'))
                }}>
                <Text3D
                    position={[2.2,0,-2.4]}
                    material={material}
                    rotation={[Math.PI/2,-Math.PI/12,0]}
                    bevelEnabled
                    bevelSize={0.03}
                    bevelThickness={0.1}
                    height={0.01}
                    letterSpacing={-0.02}
                    size={0.3}
                    font="/NanumGothic_Regular.json">
                    들어가기
                </Text3D>
                <mesh ref={coneRef}
                    position={[3,0,-3]}
                    rotation={[Math.PI/2*3,0,0]}
                    material={material}>
                    <coneGeometry
                        args={[0.3, 0.6, 5]}/>
                </mesh>
            </group>
        </group>

    )
}

export default StartText3d;