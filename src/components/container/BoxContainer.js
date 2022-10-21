import Box from "../common/Box";
import { useRef, useEffect } from "react";
import * as THREE from 'three';
import { useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useSelector, useDispatch } from "react-redux";
import { setClickable, setFocusIn, setFocusOut} from "../../modules/controller";

const lookAtPos = new THREE.Vector3(0,0,0)

function BoxContainer() {
    const data = [
      {
        index: 1,
        title: 'React'
      },
      {
        index: 2,
        title: 'Javascript'
      },
      {
        index: 3,
        title: 'Network'
      },
      {
        index: 4,
        title: 'Computer Science'
      },
      {
        index: 5,
        title: 'Dev Log'
      }
    ]

    const dispatch = useDispatch();
    const index = useSelector(state => state.controller.index)
    const focused = useSelector(state => state.controller.focus)
    const clickable = useSelector(state => state.controller.clickable)

    const boxesRef = useRef([]);
    const boxesPos = []
    const textsRef = useRef([]);
    const textsPos = []
    const conRef = useRef()
    const camera = useThree((state) => state.camera)

    const vec = new THREE.Vector3()

    gsap.registerPlugin(CustomEase)

    useEffect(() => {
      for(let i = 0; i< data.length; i++){
        boxesPos.push(boxesRef.current[i].position)
        textsPos.push(textsRef[i].position)
      }
      gsap.timeline()
      .to(boxesPos, {
        z: 1.1,
        ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.232,1.89 0.49,1.194 0.666,0.718 0.818,1.001 1,1 "),
        duration: 1,
        stagger: 0.2 
      })
      .to(textsPos, {
        z: 0.4,
        ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.232,1.89 0.49,1.194 0.666,0.718 0.818,1.001 1,1 "),
        duration: 1,
        stagger: 0.2 
      })
      .then(dispatch(setClickable()))
    }, [])
    
    useFrame((state) => {
      lookAtPos.lerp(vec.set(0,4,0), .01)
      state.camera.lookAt(lookAtPos)
    })

    return (
      <group 
        ref={conRef} >
        {data.map((d,idx) => (
          <group key={idx}>
            <Box 
              ref={el=>boxesRef.current[idx]=el} 
              index={idx} 
              position={[8-(idx*4), 0, -3]} 
              focused={false} />
            <Text
              ref={el=>textsRef[idx]=el} 
              color="black" 
              position={[8-(idx*4), 1.5, -2]} 
              fontSize={0.6}
              rotation={[0,Math.PI/4,Math.PI/2]}
              anchorX="left"
              >
              {d.title}
            </Text>
          </group>
        ))}

      </group>
    )
  }

export default BoxContainer;