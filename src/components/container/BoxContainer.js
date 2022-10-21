import Box from "../common/Box";
import { useRef, useState, useEffect } from "react";
import * as THREE from 'three';
import { useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useSelector, useDispatch } from "react-redux";
import { setFocusIn, setFocusOut } from "../../modules/controller";

const lookAtPos = new THREE.Vector3(0,0,0)

function BoxContainer() {
    const data = [1,2,3,4,5]
    const boxesRef = useRef([]);
    const boxesPos = []
    const conRef = useRef()
    const camera = useThree((state) => state.camera)

    const dispatch = useDispatch();
    const index = useSelector(state => state.controller.index)
    const focused = useSelector(state => state.controller.focus)

    const vec = new THREE.Vector3()

    gsap.registerPlugin(CustomEase);
    useEffect(() => {
      for(let i = 0; i< data.length; i++){
        boxesPos.push(boxesRef[i].position);
      }
      gsap.timeline()
      .to(boxesPos, {
        z: 2,
        ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.232,1.89 0.49,1.194 0.666,0.718 0.818,1.001 1,1 "),
        duration: 1,
        stagger: 0.2 
      })
    }, [])

    useEffect(() => {
        gsap.timeline()
        .to(boxesRef[index].position, {
          y: focused ? 5: 0,
          duration: 0.5
        })
        .to(camera.position, {
            x: focused ? boxesRef[index].position.x + 4 : 10,
            y: focused ? 5 : 10,
            z: focused ? boxesRef[index].position.z - 1 : 5,
            duration: 1
        })
      }, [focused])
    
    useFrame((state) => {
      if (focused){
        lookAtPos.lerp(vec.set(boxesRef[index].position.x, boxesRef[index].position.y, boxesRef[index].position.z+0.5), .1)
      } else {
        lookAtPos.lerp(vec.set(0,0,0), .01)
      }
      state.camera.lookAt(lookAtPos)
      console.log(lookAtPos)
      // state.camera.lookAt(lookAtPos)
    })

    return (
      <group 
        ref={conRef} 
        onClick={(e) => {
            if (focused){
              dispatch(setFocusOut())
            }else{
              dispatch(setFocusIn())
            }
            e.stopPropagation()
          }} >
        {data.map((i,idx) => (
          <Box 
            ref={el=>boxesRef[idx]=el} 
            key={i} 
            index={idx} 
            position={[6-(idx*4), 0, -3]} 
            focused={false} />
        ))}
      </group>
    )
  }

export default BoxContainer;