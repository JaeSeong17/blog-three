import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { Mesh, Vector3 } from 'three';

export const keysOnAnim = (keys: Array<Mesh>, texts: Array<Mesh>) => {
  const keysPos: Array<Vector3> = [];
  const textsPos: Array<Vector3> = [];
  gsap.registerPlugin(CustomEase);
  for (let i = 0; i < keys.length; i++) {
    keysPos.push(keys[i].position);
    textsPos.push(texts[i].position);
  }
  const customEaseValue =
    'M0,0 C0.126,0.382 0.232,1.89 0.49,1.194 0.666,0.718 0.818,1.001 1,1 ';
  return gsap
    .timeline()
    .to(
      keysPos,
      {
        z: 1.1,
        ease: CustomEase.create('custom', customEaseValue),
        duration: 1,
        stagger: 0.2,
      },
      'listLabel',
    )
    .to(
      textsPos,
      {
        z: 0.4,
        ease: CustomEase.create('custom', customEaseValue),
        duration: 1,
        stagger: 0.2,
      },
      'listLabel',
    );
};

export const keysOffAnim = (keys: Array<Mesh>, texts: Array<Mesh>) => {
  const keysPos: Array<Vector3> = [];
  const textsPos: Array<Vector3> = [];
  gsap.registerPlugin(CustomEase);
  for (let i = 0; i < keys.length; i++) {
    keysPos.push(keys[i].position);
    textsPos.push(texts[i].position);
  }
  const customEaseValue =
    'M0,0 C0.126,0.382 0.232,1.89 0.49,1.194 0.666,0.718 0.818,1.001 1,1 ';
  return gsap
    .timeline()
    .to(
      keysPos,
      {
        z: -3,
        ease: CustomEase.create('custom', customEaseValue),
        duration: 1,
      },
      'closeLabel',
    )
    .to(
      textsPos,
      {
        z: -3,
        ease: CustomEase.create('custom', customEaseValue),
        duration: 1,
      },
      'closeLabel',
    );
};

export const keyOnAnim = (key: Mesh, text: Mesh) => {
  return gsap
    .timeline()
    .to(
      key.position,
      {
        z: 1.1,
        duration: 1,
      },
      'writeLabel',
    )
    .to(
      text.position,
      {
        z: 0.4,
        duration: 1,
      },
      'writeLabel',
    );
};

export const keyOffAnim = (key: Mesh, text: Mesh) => {
  return gsap
    .timeline()
    .to(
      key.position,
      {
        z: -3,
        duration: 1,
      },
      'closeLabel',
    )
    .to(
      text.position,
      {
        z: -3,
        duration: 1,
      },
      'closeLabel',
    );
};
