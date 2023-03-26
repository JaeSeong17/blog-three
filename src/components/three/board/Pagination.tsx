import { useRef, RefObject } from 'react';
import { Text } from '@react-three/drei';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreasePage,
  increasePage,
  loadWaiting,
} from '../../../modules/boardController';
import { forwardRef, useImperativeHandle } from 'react';
import { RootState } from 'root-state-types';
import { Group, Mesh } from 'three';
import { clickAnim } from '../anim/CommonAnim';

export interface PaginationForwardRef {
  paginationRef: RefObject<Group>;
}

const Pagination = forwardRef((_, ref) => {
  const { currPage, lastPage, waiting, complete } = useSelector(
    ({ boardController }: RootState) => ({
      currPage: boardController.currPage,
      lastPage: boardController.lastPage,
      waiting: boardController.waiting,
      complete: boardController.waiting,
    }),
  );
  const dispatch = useDispatch();
  const paginationRef = useRef<Group>(null);
  const leftBtnRef = useRef<Mesh>(null);
  const rightBtnRef = useRef<Mesh>(null);

  useImperativeHandle(
    ref,
    (): PaginationForwardRef => ({
      paginationRef,
    }),
  );

  return (
    <group ref={paginationRef} position={[12, 0, 0]}>
      <mesh
        ref={leftBtnRef}
        position={[0, -2, 0]}
        rotation={[Math.PI * 0.5, 0, 0]}
        onClick={() => {
          if (waiting || complete) return; // 로드중 이동 버튼 비활성화
          if (currPage > 1) {
            clickAnim(leftBtnRef);
            dispatch(decreasePage());
            dispatch(loadWaiting());
          }
        }}>
        <cylinderGeometry args={[0.6, 0.7, 0.7, 3]} />
        <meshStandardMaterial color={currPage > 1 ? 'red' : 'gray'} />
      </mesh>
      <Text
        position={[0, 0, 0.4]}
        color="black"
        fontSize={0.8}
        rotation={[0, Math.PI / 8, Math.PI / 2]}
        children={currPage}
      />
      <mesh
        ref={rightBtnRef}
        position={[0, 2, 0]}
        rotation={[Math.PI * 0.5, Math.PI * 1, 0]}
        onClick={() => {
          if (waiting || complete) return; // 로드중 이동 버튼 비활성화
          if (currPage < lastPage) {
            clickAnim(rightBtnRef);
            dispatch(increasePage());
            dispatch(loadWaiting());
          }
        }}>
        <cylinderGeometry args={[0.6, 0.7, 0.7, 3]} />
        <meshStandardMaterial color={currPage < lastPage ? 'red' : 'gray'} />
      </mesh>
    </group>
  );
});

export default Pagination;
