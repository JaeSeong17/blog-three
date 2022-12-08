import { useRef } from "react";
import { Text } from "@react-three/drei";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { decreasePage, increasePage } from "../../../modules/posts";

const Pagination = () => {
    const { currPage, lastPage } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const leftBtnRef = useRef();
    const rightBtnRef = useRef();
    const anime = gsap.timeline();
    function clickAnimation(ref) {
        anime.to(ref.current.position, {
            z: "-=0.1",
            duration: 0.05,
            repeat: 1,
            yoyo: true
        })
    }
    return (
        <group position={[4,0,5]}>
            <mesh 
                ref={leftBtnRef}
                position={[0,-2,0]}
                rotation={[Math.PI*0.5,0,0]}
                onClick={(e) => {
                    if (currPage > 1) {
                        clickAnimation(leftBtnRef);
                        dispatch(decreasePage());
                    }
                }}>
                <cylinderGeometry args={[0.7, 0.7, 0.7, 3]}/>
                <meshStandardMaterial color={currPage > 1 ? "red" : "gray"}/>
            </mesh>
            <Text
                position={[0,0,0.4]}
                color="black" 
                fontSize={0.8}
                rotation={[0,Math.PI/4,Math.PI/2]}>
                {currPage}
            </Text>
            <mesh 
                ref={rightBtnRef}
                position={[0,2,0]}
                rotation={[Math.PI*0.5,Math.PI*1,0]}
                onClick={(e) => {
                    if (currPage < lastPage) {
                        clickAnimation(rightBtnRef);
                        dispatch(increasePage());
                    }
                }}>
                <cylinderGeometry args={[0.7, 0.7, 0.7, 3]}/>
                <meshStandardMaterial color={currPage < lastPage ? "red" : "gray"}/>
            </mesh>
        </group>
    )

}

export default Pagination;