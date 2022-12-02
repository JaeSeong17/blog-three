import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";
import { boxGeometry, meshStandardMaterial } from "three";
import BoardPanel from "./BoardPanel";
import gsap from "gsap";

const Board = forwardRef(({data}, ref) => {
    const target = useSelector(state => state.controller.target);
    const innerRef = useRef();
    useImperativeHandle(ref, () => innerRef.current);

    useEffect(() => {
        gsap.to(innerRef.current.position, {
            z: ['board', 'connect', 'screen'].includes(target) ? 5 : -6,
            duration: 1
        });
    }, [target])

    return (
        <group ref={innerRef} position={[0, 10, -5]}>
            <mesh>
                <boxGeometry args={[1, 5, 11]}/>
                <meshStandardMaterial />
            </mesh>
            {data.map((d, idx) => (
                <BoardPanel key={idx} position={[0.55, 0, 4-idx*2]} data={d}/>
            ))}            
        </group>
    )
})

export default Board;