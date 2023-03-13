import { Vector3, Mesh } from 'three';
import gsap from 'gsap';

export const ConnectBoxesOn = (boxes: Mesh[]) => {
  const boxesPos: Array<Vector3> = [];
  boxes.forEach(box => {
    boxesPos.push(box.position);
  });
  return gsap.to(boxesPos, {
    stagger: 0.03,
    z: 0,
  });
};

export const ConnectBoxesOff = (boxes: Mesh[]) => {
  const boxesPos: Array<Vector3> = [];
  boxes.forEach(box => {
    boxesPos.push(box.position);
  });
  return gsap.to(boxesPos, {
    stagger: 0.03,
    z: -1.5,
  });
};
