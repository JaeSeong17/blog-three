import KeyContainer from "../container/KeyContainer";
import Board from "../common/Board";
import Screen from "../common/Screen";
import ConnectBoxes from "../common/ConnectBoxes";
import DataTower from "../common/DataTower";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { setAngle } from "../../../modules/controller";
import * as THREE from 'three'
import StartText3d from "../common/StartText3d";
import FrontContainer from "../container/FrontContainer";

const vec = new THREE.Vector3()
const lookAtPos = new THREE.Vector3()
const MainScene = () => {
    const data = [...require("../../../static/data.json")]
    const brdRef = useRef(null)
    const scrRef = useRef(null)
    const camAngle = useSelector(state => state.controller.camAngle)
    const camPos = useSelector(state => state.controller.camPos)

    useFrame((state) => {
        state.camera.position.lerp(vec.set(camPos.x, camPos.y, camPos.z), .015)
        lookAtPos.lerp(vec.set(camAngle.x, camAngle.y, camAngle.z), .015)
        state.camera.lookAt(lookAtPos)
    })

    return (
        <scene>
            <FrontContainer />
            <KeyContainer/>
            <Board ref={brdRef} data={data}/>
            <ConnectBoxes/>
            <Screen ref={scrRef} data={data}/>
        </scene>
    )
}

export default MainScene;