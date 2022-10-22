import { forwardRef } from "react";
import { boxGeometry, meshStandardMaterial } from "three";
import BoardPanel from "./BoardPanel";

const Board = forwardRef(({data}, ref) => {
    const boardPos = {
        x: 0,
        y: 10,
        z: 5
    }
    return (
        <group ref={ref} position={[boardPos.x, boardPos.y, boardPos.z]}>
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