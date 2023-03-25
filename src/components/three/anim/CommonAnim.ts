import { RefObject } from 'react';
import { Group, Mesh } from 'three';
import gsap from 'gsap';

export const clickAnim = (refObj: RefObject<Mesh | Group | null>) => {
  if (refObj.current) {
    gsap.to(refObj.current.position, {
      z: '-=0.2',
      duration: 0.05,
      repeat: 1,
      yoyo: true,
    });
  }
};

export const keyClickAnim = (key: RefObject<Mesh | Group | null>) => {
  if (key.current) {
    gsap.to(key.current.position, {
      z: '-=0.5',
      repeat: 1,
      yoyo: true,
      duration: 0.05,
    });
  }
};
