import { Text } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const BoardPanel = ({position, data}) => {
    const ref = useRef();
    const anime = gsap.timeline()
    function clickEventTrigger() {
        anime.to(ref.current.position, {
            x: "-=0.1",
            duration: 0.05,
            repeat: 1,
            yoyo: true
        })
    }
    return (
        <group 
            ref={ref}
            position={position}
            onClick={(e) => {
                e.stopPropagation()
                clickEventTrigger()
            }}>
            <mesh>
                <boxGeometry args={[0.2, 4, 1.5]}/>
                <meshStandardMaterial color="red"/>
            </mesh>
            <Text 
                position={[0.11,-1.8,0.4]}
                color="black"
                fontSize={0.4}
                rotation={[Math.PI/2, Math.PI/2, 0]}
                anchorX="left" 
                >
                {data.index} {data.title}
            </Text>
            <Text 
                position={[0.11,-1.8,-0.2]}
                color="black"
                fontSize={0.2}
                rotation={[Math.PI/2, Math.PI/2, 0]}
                anchorX="left" 
                maxWidth={3.7}
                text={data.content}
                >
            </Text>
        </group>
    )
}

export default BoardPanel;