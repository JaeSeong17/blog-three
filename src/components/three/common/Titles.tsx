import { Group, Mesh, MeshStandardMaterial } from 'three';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTarget } from '../../../modules/camController';
import { RootState } from 'root-state-types';
import {
  titleIdleAnim,
  coneIdleAnim,
  titlesOnAnim,
  titlesOffAnim,
} from '../anim/SubObjectAnim';
import { Text3dTemplate } from '../template/Text3DTemplate';
import { ThreeEvent } from '@react-three/fiber';

const material = new MeshStandardMaterial({
  color: '#fafafa',
  roughness: 0,
  metalness: 0.8,
  emissive: '#ff0000',
});

const Titles = () => {
  const dispatch = useDispatch();
  const entireRef = useRef<Group>(null);
  const titleRef = useRef<Group>(null);
  const coneRef = useRef<Mesh>(null);
  const [idle, setIdle] = useState<{ title: any; cone: any }>({
    title: null,
    cone: null,
  });
  const { target, user } = useSelector(
    ({ camController, user }: RootState) => ({
      target: camController.target,
      user: user.user,
    }),
  );

  // 제목 마우스 클릭 핸들러
  function onClickHandler(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    if (user) {
      dispatch(setTarget('loading'));
      setTimeout(() => dispatch(setTarget('key')), 1500);
    } else {
      dispatch(setTarget('login'));
    }
  }

  // 처음 3D 컴포넌트 렌더링 시 Idle 애니메이션 등록
  useEffect(() => {
    if (titleRef.current && coneRef.current) {
      setIdle({
        title: titleIdleAnim(titleRef.current),
        cone: coneIdleAnim(coneRef.current),
      });
    }
  }, [titleRef, coneRef]);

  // Titles 전체 애니메이션 컨트롤
  useEffect(() => {
    if (entireRef.current) {
      if (target === 'start') {
        titlesOnAnim(entireRef.current).play();
        if (idle.title) {
          idle.title.play();
        }
        if (idle.cone) {
          idle.cone.play();
        }
      } else {
        titlesOffAnim(entireRef.current).play();
        if (idle.title) {
          idle.title.pause();
        }
        if (idle.cone) {
          idle.cone.pause();
        }
      }
    }
  }, [target, entireRef, idle]);

  return (
    <group ref={entireRef} position={[0, -2, -2]} onClick={onClickHandler}>
      <group ref={titleRef}>
        <Text3dTemplate
          innerText="재성의"
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, -Math.PI / 16, 0]}
          size={0.75}
          height={0.02}
          bevelSize={0.04}
          letterSpacing={-0.06}
        />
        <Text3dTemplate
          innerText="정보저장소"
          position={[2, 0, -1.2]}
          rotation={[Math.PI / 2, -Math.PI / 12, 0]}
          size={0.7}
          height={0.02}
          bevelSize={0.04}
          letterSpacing={-0.06}
        />
      </group>
      <group>
        <Text3dTemplate
          innerText="들어가기"
          position={[2.2, 0, -2.4]}
          rotation={[Math.PI / 2, -Math.PI / 12, 0]}
          size={0.3}
          height={0.01}
          bevelSize={0.03}
          letterSpacing={-0.02}
        />
        <mesh
          ref={coneRef}
          position={[3, 0, -3]}
          rotation={[(Math.PI / 2) * 3, 0, 0]}
          material={material}>
          <coneGeometry args={[0.3, 0.6, 5]} />
        </mesh>
      </group>
    </group>
  );
};

export default Titles;
