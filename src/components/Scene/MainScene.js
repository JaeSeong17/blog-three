import KeyContainer from "../container/KeyContainer";
import Board from "../common/Board";
import Screen from "../common/Screen";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { setAngle } from "../../modules/controller";
import * as THREE from 'three'

const vec = new THREE.Vector3()
const lookAtPos = new THREE.Vector3()
const MainScene = () => {
    const data = [...require("../../static/data.json")]
    const brdRef = useRef(null)
    const scrRef = useRef(null)
    const camAngle = useSelector(state => state.controller.camAngle)
    const camPos = useSelector(state => state.controller.camPos)
    const focus = useSelector(state => state.controller.focus)
    const index = useSelector(state => state.controller.index)
    const dispatch = useDispatch()

    useFrame((state) => {
        state.camera.position.lerp(vec.set(camPos.x, camPos.y, camPos.z), .05)
        lookAtPos.lerp(vec.set(camAngle.x, camAngle.y, camAngle.z), .05)
        state.camera.lookAt(lookAtPos)
    })

    return (
        <scene>
            <KeyContainer data={data}/>
            <Board ref={brdRef} data={data}/>
            <Screen ref={scrRef} data={data}/>
        </scene>
    )
}

export default MainScene;