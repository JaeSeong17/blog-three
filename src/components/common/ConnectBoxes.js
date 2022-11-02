import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import { setCamAngle, setCamPos, setScreenOn } from "../../modules/controller";

const ConnectBoxes = () => {
    const boxesRef = useRef([]);
    const boxesPos = [];
    const connectOn = useSelector(state => state.controller.connect);
    const dispatch = useDispatch();

    const setCamera = () => {
        if(connectOn){
            dispatch(setCamAngle({x:0, y: 30, z:12}))
            dispatch(setCamPos({x:0, y: 25, z:12}))
            dispatch(setScreenOn())
        }
    }

    useEffect(() => {
        for(let i = 0; i< boxesRef.current.length; i++){
            boxesPos.push(boxesRef.current[i].position);
          }
        gsap.timeline()
        .to(boxesPos, {
            stagger: 0.03,
            z: connectOn ? 0.5 : -3,
            onComplete: setCamera
        })

    }, [connectOn])

    return (
        <group position={[0, 13, 0]}>
            {Array.from({length:28}, (v,i) => i).map(index => (
                <mesh
                    key={index}
                    ref={el => boxesRef.current[index] = el}
                    position={[0, index, -3]}>
                    <boxGeometry args={[0.5, 1, 3]}/>
                    <meshStandardMaterial />
                </mesh>
            ))}
        </group>
    )
}

export default ConnectBoxes;

