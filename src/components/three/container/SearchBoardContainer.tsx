import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'root-state-types';
import { Group } from 'three';
import { searchBoardOffAnim, searchBoardOnAnim } from '../anim/BoardAnim';
import SearchBoard from '../search/SearchBoard';
import gsap from 'gsap';

const SearchBoardContainer = () => {
  const { target, history } = useSelector(({ camController }: RootState) => ({
    target: camController.target,
    history: camController.history,
  }));
  const boardRef = useRef<Group>(null);
  const onTarget = ['search', 'connect', 'screen'];
  useEffect(() => {
    if (!boardRef.current) return;
    if (onTarget.includes(target) && history === 'search') {
      gsap.timeline().add(searchBoardOnAnim(boardRef.current));
    } else {
      gsap.timeline().add(searchBoardOffAnim(boardRef.current));
    }
  }, [target]);
  return (
    <group ref={boardRef} position={[-16, 14, -5]}>
      <SearchBoard />
    </group>
  );
};

export default SearchBoardContainer;
