import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import { setCamAngle, setCamPos, setScreenOn, setTarget } from "../../../modules/controller";

const ConnectBoxes = () => {
  const boxesRef = useRef([]);
  const boxesPos = [];
  const target = useSelector(state => state.controller.target);
  const dispatch = useDispatch();

  const setCamera = () => {
    if (target === 'connect') {
      dispatch(setTarget('screen'))
    }
  }

  useEffect(() => {
    for (let i = 0; i < boxesRef.current.length; i++) {
      boxesPos.push(boxesRef.current[i].position);
    }
    gsap.timeline()
      .to(boxesPos, {
        stagger: 0.03,
        z: target === 'connect' || target === 'screen' ? 0 : -1.5,
        onComplete: setCamera
      })

  }, [target])

  return (
    <group position={[0, 13, 0]}>
      {Array.from({ length: 28 }, (v, i) => i).map(index => (
        <mesh
          key={index}
          ref={el => boxesRef.current[index] = el}
          position={[0, index, -3]}>
          <boxGeometry args={[0.5, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      ))}
    </group>
  )
}

export default ConnectBoxes;

