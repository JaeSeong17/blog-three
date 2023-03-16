import { Group } from 'three';
import gsap from 'gsap';

export const paginationOnAnim = (paginationRef: Group) => {
  return gsap.timeline().to(paginationRef.position, {
    z: 2,
    duration: 0.4,
  });
};

export const paginationOffAnim = (paginationRef: Group) => {
  return gsap.timeline().to(paginationRef.position, {
    z: 0,
    duration: 0.4,
  });
};
