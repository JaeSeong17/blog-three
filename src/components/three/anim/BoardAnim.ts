import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { RefObject } from 'react';
import { Group, Vector3 } from 'three';

export function panelOnAnim(panels: Array<RefObject<Group> | null>) {
  const panelsPos: Array<Vector3> = [];
  panels.forEach(panel => {
    if (panel && panel.current) {
      panelsPos.push(panel.current.position);
    }
  });
  if (panelsPos.length === 0) {
    return gsap.to({}, {});
  }
  return gsap.to(panelsPos, {
    z: 1,
    ease: CustomEase.create(
      'custom',
      'M0,0 C0.126,0.382 0.232,1.89 0.49,1.194 0.666,0.718 0.818,1.001 1,1 ',
    ),
    stagger: 0.1,
    duration: 1,
  });
}

export function panelOffAnim(panels: Array<RefObject<Group> | null>) {
  const panelsPos: Array<Vector3> = [];
  panels.forEach(panel => {
    if (panel && panel.current) {
      panelsPos.push(panel.current.position);
    }
  });
  if (panelsPos.length === 0) {
    return gsap.to({}, {});
  }
  return gsap.to(panelsPos, {
    z: 0,
    stagger: 0.1,
    duration: 1,
  });
}

export const boardOnAnim = (board: Group) => {
  return gsap.to(board.position, {
    z: 0,
    duration: 0.4,
  });
};

export const boardOffAnim = (board: Group) => {
  return gsap.to(board.position, {
    z: -2,
    duration: 0.1,
  });
};

export const panelClickAnim = (panel: Group | null) => {
  if (panel) {
    gsap.to(panel.position, {
      z: '-=0.1',
      duration: 0.05,
      repeat: 1,
      yoyo: true,
    });
  }
};

export const searchBoardOnAnim = (board: Group) => {
  return gsap.to(board.position, {
    z: 4,
    duration: 1.2,
  });
};

export const searchBoardOffAnim = (board: Group) => {
  return gsap.to(board.position, {
    z: -5,
    duration: 1,
  });
};
