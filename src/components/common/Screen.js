import { Html } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Editor from "./Editor";
import gsap from "gsap";
import { forwardRef } from "react";

const HtmlWrapper = styled.div`
    width: 800px;
    max-height: 768px;
    overflow-y: scroll;
    overflow-x: hidden;
`

const Screen = forwardRef(({data}, ref) => {
    const index = 2
    const focus = useSelector(state => state.controller.focus)
    const editorRef = useRef(null);
    
    useEffect(() => {
        gsap.to(editorRef.current, {
            autoAlpha: focus ? 1 : 0,
            duration: 1,
        })
    }, [focus])

    return (
        <group position={[0, 40, 12]}>
            <mesh >
                <boxGeometry args={[21, 1, 20]}/>
                <meshStandardMaterial/>
                <Html
                    transform
                    occlude={true}
                    distanceFactor={10}
                    rotation-x={Math.PI/2}
                    position={[0, -0.51, 0]}
                    
                    >
                    <HtmlWrapper ref={editorRef}>
                        <Editor/>
                    </HtmlWrapper>
                </Html>
                
            </mesh>
            
        </group>
    )
})

export default Screen;