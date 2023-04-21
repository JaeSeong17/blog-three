import { useDispatch, useSelector } from 'react-redux';
import { setTarget } from '../../../modules/camController';
import BoardPanel from './BoardPanel';
import { RefObject, useEffect, useRef } from 'react';
import { RootState } from 'root-state-types';
import { Group } from 'three';
import { panelOffAnim, panelOnAnim } from '../anim/BoardAnim';
import { listPosts, loadComplete } from 'src/modules/boardController';
import gsap from 'gsap';

export interface BoardForwardRef {
  boardRef: RefObject<Group>;
  panelRefs: RefObject<(RefObject<Group> | null)[]>;
}

const Board = () => {
  const dispatch = useDispatch();
  const boardRef = useRef<Group>(null);
  const panelRefs = useRef<(RefObject<Group> | null)[]>([]);
  const { posts, error, waiting, complete, currTag, currPage, loading } =
    useSelector(({ boardController, loading }: RootState) => ({
      posts: boardController.posts,
      error: boardController.error,
      waiting: boardController.waiting,
      complete: boardController.complete,
      currTag: boardController.currTag,
      currPage: boardController.currPage,
      loading: loading['posts/listPosts'],
    }));
  const target = useSelector((state: RootState) => state.camController.target);

  // 포스트 로드 오류시 메시지 출력
  useEffect(() => {
    if (error) {
      console.log('포스트 리스트 로드에서 오류가 발생했습니다.');
    }
  }, [error]);

  // board의 panels 애니메이션과 포스트 목록 요청 로직 컨트롤
  useEffect(() => {
    if (waiting && !complete) {
      gsap
        .timeline()
        .add(panelOffAnim(panelRefs.current))
        .add(() => {
          dispatch(listPosts({ tag: currTag, page: currPage }));
        });
    } else if (waiting && complete) {
      gsap
        .timeline()
        .add(panelOnAnim(panelRefs.current))
        .add(() => {
          dispatch(loadComplete());
        });
    }
  }, [waiting, complete]);

  // board onTarget이 아닌경우 panelOff
  const onTarget = ['board', 'connect', 'screen'];
  useEffect(() => {
    if (!onTarget.includes(target)) {
      gsap.timeline().add(panelOffAnim(panelRefs.current));
    }
  }, [target]);

  return (
    <group ref={boardRef}>
      <mesh>
        <boxGeometry args={[20, 10, 2]} />
        <meshStandardMaterial />
      </mesh>
      <mesh
        position={[-9.1, -3.2, 1]}
        onClick={() => {
          dispatch(setTarget('key'));
        }}>
        <boxGeometry args={[1.2, 2.8, 0.3]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {!loading &&
        posts &&
        posts.map((post, idx) => (
          <BoardPanel
            ref={el => (panelRefs.current[idx] = el)}
            post={post}
            key={idx}
            position={[-6.5 + idx * 3.6, 0, 0]}
          />
        ))}
    </group>
  );
};

export default Board;
