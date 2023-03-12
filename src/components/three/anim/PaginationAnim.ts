import { Group, Mesh } from 'three';
import gsap from 'gsap';
import { RefObject } from 'react';

export function paginationOnAnim(paginationRef: Group) {
  return gsap.timeline().to(paginationRef.position, {
    z: 2,
    duration: 0.4,
  });
}

export function paginationOffAnim(paginationRef: Group) {
  return gsap.timeline().to(paginationRef.position, {
    z: 0,
    duration: 0.4,
  });
}

export function pageBtnClickAnim(pageBtn: RefObject<Mesh | null>) {
  if (pageBtn.current) {
    gsap.to(pageBtn.current.position, {
      z: '-=0.1',
      duration: 0.05,
      repeat: 1,
      yoyo: true,
    });
  }
}
