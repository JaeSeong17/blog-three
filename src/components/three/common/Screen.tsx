import { Html } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gsap from 'gsap';
import ScreenHtml from '../../html/root/ScreenHtml';
import { setTarget } from '../../../modules/camController';
import { setCurrMode, setCurrPost } from '../../../modules/screenController';
import { CurrPostParams, RootState } from 'root-state-types';
import { ModeSet, TargetSet } from 'preset-types';
import { readPost, unloadPost } from 'src/modules/post';
import {
  changeField,
  initialize,
  setOriginalPost,
  updatePost,
  writePost,
} from 'src/modules/write';
import {
  PostResponse,
  UpdateRequestParams,
  WriteInputParams,
  WriteRequestParams,
} from 'screen-state-types';

const Screen = () => {
  const dispatch = useDispatch();
  const { target, currMode, user } = useSelector(
    ({ camController, screenController, user }: RootState) => ({
      target: camController.target,
      currMode: screenController.currMode,
      user: user.user,
    }),
  );
  const screenRef = useRef(null);

  // 스크린 내부 html에게 root store의 reducer 전달할 객체
  const scReducerCarrier = {
    scState: useSelector((state: RootState) => state.screenController),
    setCurrPost: (params: CurrPostParams) => dispatch(setCurrPost(params)),
    setCurrMode: (params: ModeSet) => dispatch(setCurrMode(params)),
  };
  const writeReducerCarrier = {
    writeState: useSelector((state: RootState) => state.write),
    changeField: (params: WriteInputParams) => dispatch(changeField(params)),
    initialize: () => dispatch(initialize()),
    writePost: (params: WriteRequestParams) => dispatch(writePost(params)),
    updatePost: (params: UpdateRequestParams) => dispatch(updatePost(params)),
    setOriginalPost: (params: PostResponse) =>
      dispatch(setOriginalPost(params)),
  };
  const postReducerCarrier = {
    postState: useSelector((state: RootState) => state.post),
    readPost: (param: string) => dispatch(readPost(param)),
    unloadPost: () => dispatch(unloadPost()),
  };
  const loadingReducerCarrier = {
    loadingState: useSelector((state: RootState) => state.loading),
  };
  const camReducerCarrier = {
    setTarget: (param: TargetSet) => dispatch(setTarget(param)),
  };

  // 스크린 닫기 버튼 클릭 이벤트 핸들러
  function escClickHandler() {
    if (currMode === 'write') {
      dispatch(setTarget('key'));
    } else if (currMode === 'post') {
      dispatch(setTarget('board'));
    }
    dispatch(setCurrMode('none'));
  }

  // 스크린 활성화/비활성화 애니메이션
  useEffect(() => {
    gsap.to(screenRef.current, {
      autoAlpha: target === 'screen' ? 1 : 0,
      duration: 1,
    });
  }, [target]);

  return (
    <group position={[0, 40, 12]}>
      <mesh>
        <boxGeometry args={[30, 1, 21]} />
        <meshStandardMaterial />
        <Html
          transform
          occlude={true}
          distanceFactor={10}
          rotation-x={Math.PI / 2}
          position={[0, -0.51, -0.5]}
          style={{ opacity: 0 }}
          ref={screenRef}>
          <ScreenHtml
            camReducerCarrier={camReducerCarrier}
            scReducerCarrier={scReducerCarrier}
            writeReducerCarrier={writeReducerCarrier}
            postReducerCarrier={postReducerCarrier}
            loadingReducerCarrier={loadingReducerCarrier}
            user={user}
          />
        </Html>
      </mesh>
      <mesh position={[-13, -0.5, 9.5]} onClick={escClickHandler}>
        <boxGeometry args={[3, 0.5, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
};

export default Screen;
