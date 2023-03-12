import { useRef, RefObject } from 'react';
import { Text } from '@react-three/drei';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreasePage,
  increasePage,
  loadWaiting,
} from '../../../modules/root/boardController';
import { forwardRef, useImperativeHandle } from 'react';
import { RootState } from 'root-state-types';
import { pageBtnClickAnim } from '../anim/PaginationAnim';
import { Group, Mesh } from 'three';

export interface PaginationForwardRef {
  paginationRef: RefObject<Group>;
}

const Pagination = forwardRef((_, ref) => {
  const { currPage, lastPage } = useSelector(
    ({ boardController }: RootState) => ({
      currPage: boardController.currPage,
      lastPage: boardController.lastPage,
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
          if (currPage > 1) {
            pageBtnClickAnim(leftBtnRef);
            dispatch(decreasePage());
            dispatch(loadWaiting());
          }
        }}>
        <cylinderGeometry args={[0.7, 0.7, 0.7, 3]} />
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
          if (currPage < lastPage) {
            pageBtnClickAnim(rightBtnRef);
            dispatch(increasePage());
            dispatch(loadWaiting());
          }
        }}>
        <cylinderGeometry args={[0.7, 0.7, 0.7, 3]} />
        <meshStandardMaterial color={currPage < lastPage ? 'red' : 'gray'} />
      </mesh>
    </group>
  );
});

export default Pagination;
