import { RefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts, loadComplete } from '../../../modules/root/boardController';
import Board, { BoardForwardRef } from '../board/Board';
import Pagination, { PaginationForwardRef } from '../board/Pagination';
import gsap from 'gsap';
import {
  boardOnAnim,
  boardOffAnim,
  panelOnAnim,
  panelOffAnim,
} from '../anim/BoardAnim';
import { RootState } from 'root-state-types';
import { Group } from 'three';
import { paginationOffAnim, paginationOnAnim } from '../anim/PaginationAnim';

const BoardContainer = () => {
  const boardRef = useRef<BoardForwardRef>(null);
  const paginationRef = useRef<PaginationForwardRef>();
  const dispatch = useDispatch();
  const { target, posts, tag, page, waiting, complete, error } = useSelector(
    ({ camController, boardController }: RootState) => ({
      target: camController.target,
      posts: boardController.posts,
      tag: boardController.currTag,
      page: boardController.currPage,
      waiting: boardController.waiting,
      complete: boardController.complete,
      error: boardController.error,
    }),
  );

  // 키 버튼 변경시 해당 태그에 맞는 포스트 로드
  useEffect(() => {
    dispatch(listPosts({ page, tag }));
  }, [tag]);

  // 포스트 로드 오류시 메시지 출력
  useEffect(() => {
    if (error) {
      console.log('포스트 리스트 로드에서 오류가 발생했습니다.');
    }
  }, [error]);

  // Board 전체 On/Off 애니메이션
  useEffect(() => {
    if (boardRef.current && paginationRef.current) {
      const br = boardRef.current.boardRef.current;
      const prs = boardRef.current.panelRefs.current;
      const pg = paginationRef.current.paginationRef.current;
      const tl = gsap.timeline();
      if (
        br &&
        prs &&
        prs.length > 0 &&
        prs.every(item => item !== null) &&
        pg
      ) {
        if (target === 'board' && !waiting && complete) {
          tl.add(() => {
            dispatch(loadComplete());
          })
            .add(boardOnAnim(br))
            .add(panelOnAnim(prs as RefObject<Group>[]))
            .add(paginationOnAnim(pg), '-=1');
        } else if (posts && target === 'key') {
          tl.add(panelOffAnim(prs as RefObject<Group>[]))
            .add(paginationOffAnim(pg), 'offLabel')
            .add(boardOffAnim(br), 'offLabel');
        }
      }
    }
  }, [
    target,
    waiting,
    complete,
    boardRef.current,
    boardRef.current ? boardRef.current.panelRefs.current : null,
  ]);

  // 페이지 전환 시 패널 On/Off 애니메이션
  useEffect(() => {
    if (boardRef.current) {
      const prs = boardRef.current.panelRefs.current;
      if (prs && prs.length > 0 && prs.every(item => item !== null)) {
        if (waiting && !complete) {
          gsap
            .timeline()
            .add(panelOffAnim(prs as RefObject<Group>[]))
            .add(() => {
              dispatch(listPosts({ page, tag }));
            });
        } else if (waiting && complete) {
          gsap
            .timeline()
            .add(panelOnAnim(prs as RefObject<Group>[]))
            .add(() => {
              dispatch(loadComplete());
            });
        }
      }
    }
  }, [
    waiting,
    complete,
    boardRef.current,
    boardRef.current ? boardRef.current.panelRefs.current : boardRef.current,
  ]);

  return (
    <group position={[0, 10, -2]}>
      <Board ref={boardRef} />
      <Pagination ref={paginationRef} />
    </group>
  );
};

export default BoardContainer;
