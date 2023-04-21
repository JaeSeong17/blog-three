import { forwardRef, ForwardedRef, useRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHistory, setTarget } from '../../../modules/camController';
import { ThreeEvent } from '@react-three/fiber';
import { setIndex } from 'src/modules/boardController';
import { setCurrMode } from 'src/modules/screenController';
import { Mesh } from 'three';
import { keyClickAnim } from '../anim/CommonAnim';
import { RootState } from 'root-state-types';
import KeycapTemplate from '../template/KeycapTemplate';

interface WriteKeyParams {
  position: [x: number, y: number, z: number];
}

const WriteKey = forwardRef(
  ({ position }: WriteKeyParams, ref: ForwardedRef<Mesh>) => {
    const dispatch = useDispatch();
    const { target, mode, user } = useSelector(
      ({ camController, screenController, user }: RootState) => ({
        target: camController.target,
        mode: screenController.currMode,
        user: user.user,
      }),
    );
    const innerRef = useRef<Mesh>(null);
    useImperativeHandle(ref, () => innerRef.current as Mesh);

    // 키 색상 설정
    let btnColor;
    let btnEmissive;
    // 글작성 버튼 로그인/비로그인 색상 변경
    if (!user) {
      //비로그인시 글작성 비활성화
      btnColor = 'white';
      btnEmissive = 'black';
    } else if (target === 'screen' && mode === 'write') {
      // 글쓰기 버튼 활성화 색상
      btnColor = 'rgba(255, 77, 77, 1)';
      btnEmissive = '#ff0000';
    } else {
      // 글쓰기 버튼 비활성화 색상
      btnColor = 'rgba(255, 255, 255, 1)';
      btnEmissive = '#ff0000';
    }

    function writeKeyClickHandler(e: ThreeEvent<MouseEvent>) {
      e.stopPropagation();
      if (!user) return; // 비 로그인시 클릭 비활성화
      dispatch(setIndex(-1)); // 글쓰기 모드 진입시 태그 키 비 활성화
      dispatch(setHistory('key')); // 스크린 탈출시 key로 돌아오도록 history 설정
      dispatch(setCurrMode('write'));
      dispatch(setTarget('screen'));
      keyClickAnim(innerRef);
    }

    return (
      <KeycapTemplate
        ref={innerRef}
        position={position}
        scale={1.2}
        color={btnColor}
        emissive={btnEmissive}
        clickHandler={writeKeyClickHandler}
      />
    );
  },
);

export default WriteKey;
