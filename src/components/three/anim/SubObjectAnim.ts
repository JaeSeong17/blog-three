import { Vector3, Mesh, Group } from 'three';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

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

export const dataTowerIdleAnim = (dataTower: Mesh[]) => {
  const dataPos: Array<Vector3> = [];

  gsap.registerPlugin(CustomEase);
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

export const titlesOnAnim = (titles: Group) => {
  return gsap.to(titles.position, {
    z: 4,
    duration: 1.2,
  });
};

export const titlesOffAnim = (titles: Group) => {
  return gsap.to(titles.position, {
    z: -2,
    duration: 1.2,
  });
};

export const titleIdleAnim = (title: Group) => {
  return gsap.to(title.position, {
    z: 0.2,
    repeat: -1,
    ease: 'power3.inOut',
    duration: 2.5,
    yoyo: true,
  });
};

export const coneIdleAnim = (cone: Mesh) => {
  return gsap.to(cone.rotation, {
    y: Math.PI,
    repeat: -1,
    ease: 'power2.inOut',
    yoyo: true,
    duration: 2,
  });
};

export const profileOnAnim = (text1: Mesh, text2: Mesh) => {
  return gsap
    .timeline()
    .to(text1.position, {
      z: 0,
      delay: 1.8,
      duration: 1.2,
    })
    .to(text2.position, {
      z: 0,
      duration: 1.2,
    });
};

export const profileOffAnim = (text1: Mesh, text2: Mesh) => {
  return gsap
    .timeline()
    .to(
      text1.position,
      {
        z: -2,
        duration: 1.2,
      },
      'closeLabel',
    )
    .to(
      text2.position,
      {
        z: -2,
        duration: 1.2,
      },
      'closeLabel',
    );
};

export const logBtnOnAnim = (btn: Group) => {
  return gsap.to(btn.position, {
    z: 1,
    delay: 4,
    duration: 1.2,
  });
};

export const logBtnOffAnim = (btn: Group) => {
  return gsap.to(btn.position, {
    z: -3,
    duration: 1.2,
  });
};
