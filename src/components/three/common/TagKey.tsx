import { forwardRef, ForwardedRef, useRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHistory, setTarget } from '../../../modules/camController';
import { ThreeEvent } from '@react-three/fiber';
import {
  initializePage,
  loadWaiting,
  setIndex,
} from 'src/modules/boardController';
import { setCurrTag } from 'src/modules/boardController';
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
    const { target, current, waiting, complete } = useSelector(
      ({ camController, boardController }: RootState) => ({
        target: camController.target,
        current: boardController.index,
        waiting: boardController.waiting,
        complete: boardController.complete,
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

    const clickableTaget = ['key', 'board'];
    function tagKeyClickHandler(e: ThreeEvent<MouseEvent>) {
      e.stopPropagation();
      if (!clickableTaget.includes(target)) return; // 허용된 시점 이외 클릭 잠금
      if (waiting || complete) return; // 로딩 중 클릭 잠금
      dispatch(setIndex(index)); // 키 활성화
      dispatch(initializePage()); // 페이지 초기화
      dispatch(setCurrTag(tag)); // 활성화된 키로 태그 설정
      dispatch(setTarget('board')); // board로 시점 변경
      dispatch(setHistory('board')); // 스크린 탈출 시 돌아올 history 설정
      dispatch(loadWaiting()); // 포스트 목록 요청
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
