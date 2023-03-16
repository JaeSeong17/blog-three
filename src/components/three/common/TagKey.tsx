import { forwardRef, ForwardedRef, useRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTarget } from '../../../modules/root/camController';
import { ThreeEvent } from '@react-three/fiber';
import { setIndex } from 'src/modules/root/boardController';
import { setComplete, setCurrTag } from 'src/modules/root/boardController';
import { Mesh } from 'three';
import { keyClickAnim } from '../anim/CommonAnim';
import { RootState } from 'root-state-types';
import KeycapTemplate from '../template/KeycapTemplate';

interface TagKeyParams {
  position: [x: number, y: number, z: number];
  index: number;
  tag: string;
}

const TagKey = forwardRef(
  ({ position, index, tag }: TagKeyParams, ref: ForwardedRef<Mesh>) => {
    const dispatch = useDispatch();
    const { target, current } = useSelector(
      ({ camController, boardController }: RootState) => ({
        target: camController.target,
        current: boardController.index,
      }),
    );
    const innerRef = useRef<Mesh>(null);
    useImperativeHandle(ref, () => innerRef.current as Mesh);

    // 키 색상 설정
    let btnColor;
    let btnEmissive;
    if (target === 'board' && index === current) {
      // 태그 버튼 활성화 색상
      btnColor = 'rgba(255, 77, 77, 1)';
      btnEmissive = '#ff0000';
    } else {
      // 태그 버튼 비활성화 색상
      btnColor = 'rgba(255, 255, 255, 1)';
      btnEmissive = '#ff0000';
    }

    function tagKeyClickHandler(e: ThreeEvent<MouseEvent>) {
      e.stopPropagation();
      if (current === index) {
        dispatch(setComplete());
      } else {
        dispatch(setIndex(index));
      }
      dispatch(setCurrTag(tag));
      dispatch(setTarget('board'));
      keyClickAnim(innerRef);
    }

    return (
      <KeycapTemplate
        ref={innerRef}
        position={position}
        scale={1.2}
        color={btnColor}
        emissive={btnEmissive}
        clickHandler={tagKeyClickHandler}
      />
    );
  },
);

export default TagKey;
