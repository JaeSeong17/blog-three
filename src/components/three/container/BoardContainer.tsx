import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Board from '../board/Board';
import Pagination from '../board/Pagination';
import gsap from 'gsap';
import { boardOnAnim, boardOffAnim } from '../anim/BoardAnim';
import { RootState } from 'root-state-types';
import { Group } from 'three';

const BoardContainer = () => {
  const boardRef = useRef<Group>(null);
  const { target, history } = useSelector(({ camController }: RootState) => ({
    target: camController.target,
    history: camController.history,
  }));

  // Board 전체 On/Off 애니메이션
  const onTarget = ['board', 'screen', 'connect'];
  useEffect(() => {
    if (boardRef.current) {
      const tl = gsap.timeline();
      if (onTarget.includes(target) && history === 'board') {
        tl.add(boardOnAnim(boardRef.current));
      } else {
        tl.add(boardOffAnim(boardRef.current));
      }
    }
  }, [target]);

  return (
    <group ref={boardRef} position={[0, 10, -2]}>
      <Board />
      <Pagination />
    </group>
  );
};

export default BoardContainer;
