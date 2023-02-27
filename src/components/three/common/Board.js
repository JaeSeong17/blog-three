import { useDispatch, useSelector } from 'react-redux';
import { setTarget } from '../../../modules/root/controller';
import { listPosts, loadComplete } from '../../../modules/root/posts';
import BoardPanel from './BoardPanel';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { useParams } from 'react-router-dom';

const Board = forwardRef(({ props }, ref) => {
  const dispatch = useDispatch();
  const boardRef = useRef();
  const panelsRef = useRef([]);
  useImperativeHandle(ref, () => ({
    boardOnAnime,
    boardOffAnime,
    panelOnAnime,
    panelOffAnime,
  }));

  const { username } = useParams();
  const { posts, tag, page, error, loading, waiting } = useSelector(
    ({ controller, posts, loading }) => ({
      posts: posts.posts,
      tag: posts.currTag,
      page: posts.currPage,
      error: posts.error,
      waiting: posts.waiting,
      loading: loading['posts/listPosts'],
    }),
  );

  function panelOnAnime() {
    dispatch(loadComplete());
    const panelsPos = [];
    for (let i = 0; i < posts.length; i++) {
      panelsPos.push(panelsRef.current[i].position);
    }
    const tl = gsap.timeline().to(panelsPos, {
      z: 1,
      ease: CustomEase.create(
        'custom',
        'M0,0 C0.126,0.382 0.232,1.89 0.49,1.194 0.666,0.718 0.818,1.001 1,1 ',
      ),
      stagger: 0.1,
      duration: 1,
    });
    return tl;
  }

  function panelOffAnime() {
    const panelsPos = [];
    for (let i = 0; i < posts.length; i++) {
      panelsPos.push(panelsRef.current[i].position);
    }
    const tl = gsap.timeline().to(panelsPos, {
      z: 0,
      stagger: 0.1,
      duration: 1,
      onComplete: () => {
        if (waiting) {
          dispatch(listPosts({ page, username, tag }));
        }
      },
    });
    return tl;
  }

  function boardOnAnime() {
    const tl = gsap.timeline().to(boardRef.current.position, {
      z: 2,
      duration: 0.4,
    });
    return tl;
  }

  function boardOffAnime() {
    const tl = gsap.timeline().to(boardRef.current.position, {
      z: 0,
      duration: 0.1,
    });
    return tl;
  }

  if (error) {
    console.log('포스트 리스트 로드에서 오류가 발생했습니다.');
  }

  return (
    <group ref={boardRef}>
      <mesh>
        <boxGeometry args={[20, 10, 2]} />
        <meshStandardMaterial />
      </mesh>
      <mesh
        position={[-9.1, -3.2, 1]}
        onClick={e => {
          dispatch(setTarget('key'));
        }}>
        <boxGeometry args={[1.2, 2.8, 0.3]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {!loading &&
        posts &&
        posts.map((post, idx) => (
          <BoardPanel
            ref={el => (panelsRef.current[idx] = el)}
            post={post}
            key={idx}
            position={[-6.5 + idx * 3.6, 0, 0]}
          />
        ))}
    </group>
  );
});

export default Board;
