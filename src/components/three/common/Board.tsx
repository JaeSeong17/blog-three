import { useDispatch, useSelector } from 'react-redux';
import { setTarget } from '../../../modules/root/camController';
import BoardPanel from './BoardPanel';
import { forwardRef, RefObject, useImperativeHandle, useRef } from 'react';
import { RootState } from 'root-state-types';
import { Group } from 'three';

export interface BoardForwardRef {
  boardRef: RefObject<Group>;
  panelRefs: RefObject<(RefObject<Group> | null)[]>;
}

const Board = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const boardRef = useRef<Group>(null);
  const panelRefs = useRef<(RefObject<Group> | null)[]>([]);
  useImperativeHandle(
    ref,
    (): BoardForwardRef => ({
      boardRef,
      panelRefs,
    }),
  );

  const { posts, loading } = useSelector(
    ({ boardController, loading }: RootState) => ({
      posts: boardController.posts,
      loading: loading['posts/listPosts'],
    }),
  );

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
});

export default Board;
