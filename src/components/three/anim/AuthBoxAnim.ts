import gsap from 'gsap';
import { Group } from 'three';

export const authBoxOnAnim = (box: Group, form: HTMLDivElement) => {
  gsap
    .timeline()
    .to(box.position, {
      z: 3,
      delay: 1,
      duration: 1,
    })
    .to(form, {
      autoAlpha: 1,
      duration: 1,
    });
};

export const authBoxOffAnim = (box: Group, form: HTMLDivElement) => {
  gsap
    .timeline()
    .to(
      form,
      {
        autoAlpha: 0,
        duration: 1,
      },
      'closeLabel',
    )
    .to(box.position, {
      z: -3,
      duration: 1,
    });
};
