import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTarget } from "../../../modules/controller";
import BoardPanel from "./BoardPanel";
import gsap from "gsap";

const Board = ({ posts, loading, error }) => {
    const dispatch = useDispatch();
    const target = useSelector(state => state.controller.target);
    const boardRef = useRef();

    useEffect(() => {
        gsap.to(boardRef.current.position, {
            z: ['board', 'connect', 'screen'].includes(target) ? 10 : -6,
            duration: 1
        });
    }, [target])
    
    if (error) {
        console.log('포스트 리스트 로드에서 오류가 발생했습니다.');
    }

    return (
        <group ref={boardRef}>
            <mesh>
                <boxGeometry args={[1, 5, 11.5]}/>
                <meshStandardMaterial />
            </mesh>
            <mesh
                position={[0.5, -1.6, 5.3]}
                onClick={(e) => {
                    dispatch(setTarget('key'));
                }}>
                <boxGeometry args={[0.3, 1.4, 0.6]}/>
                <meshStandardMaterial color="red"/>
            </mesh>
            {!loading && posts && posts.map((post, idx) => (
                <BoardPanel 
                    post={post}
                    key={idx} 
                    position={[0.55, 0, 4-idx*2]}
                />
            ))}     
        </group>
    )
}

export default Board;