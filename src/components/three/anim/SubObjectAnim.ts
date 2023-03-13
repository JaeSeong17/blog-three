import { Vector3, Mesh } from 'three';
import gsap from 'gsap';

gsap.registerPlugin(CustomEase);

export const connectBoxesOn = (boxes: Mesh[]) => {
  const boxesPos: Array<Vector3> = [];
  boxes.forEach(box => {
    boxesPos.push(box.position);
  });
  return gsap.to(boxesPos, {
    stagger: 0.03,
    z: 0,
  });
};

export const connectBoxesOff = (boxes: Mesh[]) => {
  const boxesPos: Array<Vector3> = [];
  boxes.forEach(box => {
    boxesPos.push(box.position);
  });
  return gsap.to(boxesPos, {
    stagger: 0.03,
    z: -1.5,
  });
};

export const dataTowerAnim = (dataTower: Mesh[]) => {
  const dataPos: Array<Vector3> = [];
  dataTower.forEach(data => {
    dataPos.push(data.position);
  });
  return gsap
    .timeline()
    .to(dataPos, {
      z: 2,
      duration: 1,
    })
    .to(dataPos, {
      delay: 3,
      stagger: 0.05,
      repeat: -1,
      ease: CustomEase.create(
        'custom',
        'M0,0,C0,0,0.295,-0.019,0.322,0.272,0.348,0.56,0.402,1,0.5,1,0.63,1,0.709,0.759,0.816,0.526,0.936,0.261,1,0,1,0',
      ),
      repeatDelay: 3,
      z: 2.1,
    });
};
