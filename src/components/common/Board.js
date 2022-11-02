import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";
import { boxGeometry, meshStandardMaterial } from "three";
import BoardPanel from "./BoardPanel";
import gsap from "gsap";

const Board = forwardRef(({data}, ref) => {
    const focus = useSelector(state => state.controller.focus);
    const innerRef = useRef();
    useImperativeHandle(ref, () => innerRef.current);

    useEffect(() => {
        gsap.to(innerRef.current.position, {
            z: focus ? 5 : -5,
            duration: 1
        });
    }, [focus])

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