import { useRef, RefObject } from 'react';
import { Text } from '@react-three/drei';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreasePage,
  increasePage,
  loadWaiting,
} from '../../../modules/search';
import { forwardRef, useImperativeHandle } from 'react';
import { RootState } from 'root-state-types';
import { Group, Mesh } from 'three';
import { clickAnim } from '../anim/CommonAnim';

export interface PaginationForwardRef {
  paginationRef: RefObject<Group>;
}
export interface PaginationParams {
  position: [x: number, y: number, z: number];
}

const SearchPagination = forwardRef(({ position }: PaginationParams, ref) => {
  const { currPage, lastPage, waiting, complete } = useSelector(
    ({ search }: RootState) => ({
      currPage: search.currPage,
      lastPage: search.lastPage,
      waiting: search.waiting,
      complete: search.complete,
    }),
  );
  const dispatch = useDispatch();
  const paginationRef = useRef<Group>(null);
  const leftBtnRef = useRef<Mesh>(null);
  const rightBtnRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => paginationRef.current);

  return (
    <group ref={paginationRef} position={position}>
      <mesh
        ref={leftBtnRef}
        position={[0, -1.5, 0]}
        rotation={[Math.PI * 0.5, 0, Math.PI]}
        onClick={() => {
          if (waiting || complete) return; // 로드중 이동 버튼 비활성화
          if (currPage > 1) {
            // 페이지 범위 이내 확인
            clickAnim(leftBtnRef);
            dispatch(decreasePage());
            dispatch(loadWaiting());
          }
        }}>
        <cylinderGeometry args={[0.5, 0.4, 0.4, 3]} />
        <meshStandardMaterial color={currPage > 1 ? 'red' : 'gray'} />
      </mesh>
      <Text
        position={[0, 0, 0]}
        color="black"
        fontSize={0.8}
        rotation={[0, 0, Math.PI * 0.5]}
        children={currPage}
      />
      <mesh
        ref={rightBtnRef}
        position={[0, 1.5, 0]}
        rotation={[Math.PI * 0.5, Math.PI * 1, Math.PI]}
        onClick={() => {
          if (waiting || complete) return; // 로드중 이동 버튼 비활성화
          if (currPage < lastPage) {
            // 페이지 범위 이내 확인
            clickAnim(rightBtnRef);
            dispatch(increasePage());
            dispatch(loadWaiting());
          }
        }}>
        <cylinderGeometry args={[0.5, 0.4, 0.4, 3]} />
        <meshStandardMaterial color={currPage < lastPage ? 'red' : 'gray'} />
      </mesh>
    </group>
  );
});

export default SearchPagination;
