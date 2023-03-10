import gsap from 'gsap';
import { GroupProps } from '@react-three/fiber';

export const authBoxOnAnim = (
  box: GroupProps,
  form: HTMLDivElement,
  btn: GroupProps,
) => {
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
    })
    .to(btn.position, {
      y: -0.43,
    });
};

export const authBoxOffAnim = (
  box: GroupProps,
  form: HTMLDivElement,
  btn: GroupProps,
) => {
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
    .to(
      btn.position,
      {
        y: -0.3,
      },
      'closeLabel',
    )
    .to(box.position, {
      z: -3,
      duration: 1,
    });
};
