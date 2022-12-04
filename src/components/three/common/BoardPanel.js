import { useRef } from "react";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { setScreenMode, setTarget } from "../../../modules/controller";
import { Html } from "@react-three/drei";
import PostItem from "../../html/common/PostItem";
import { setCurrPost } from "../../../modules/posts";

const BoardPanel = ({position, post}) => {
    const { publishedDate, user, tags, title, body, _id } = post;
    const ref = useRef();
    const dispatch = useDispatch();
    const anime = gsap.timeline()
    function clickAnimation() {
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
                e.stopPropagation();
                clickAnimation();
                dispatch(setCurrPost({ username: user.username, postId: _id }));
                dispatch(setTarget('connect'));
            }}>
            <mesh>
                <boxGeometry args={[0.2, 4.6, 1.8]}/>
                <meshStandardMaterial color="red"/>
                <Html
                    transform
                    occlude={true}
                    distanceFactor={3.9}
                    position={[0.1001, 0, 0]}
                    rotation={[Math.PI/2, Math.PI/2, 0]}>
                    <PostItem post={post}/>
                </Html>
            </mesh>
        </group>
    )
}

export default BoardPanel;