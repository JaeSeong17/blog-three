import { useDispatch, useSelector } from 'react-redux';
import { setTarget } from 'src/modules/camController';
import { Html } from '@react-three/drei';
import { ChangeEvent, RefObject, useEffect, useRef } from 'react';
import { RootState } from 'root-state-types';
import SearchInput from 'src/components/html/search/SearchInput';
import {
  initializePage,
  loadWaiting,
  searchPosts,
  setKeyword,
  loadComplete,
} from 'src/modules/search';
import SearchPanel from './SearchPanel';
import { Group, Mesh } from 'three';
import SearchPagination from './SearchPagination';
import {
  markOffAnim,
  markOnAnim,
  panelOffAnim,
  panelOnAnim,
} from '../anim/BoardAnim';
import gsap from 'gsap';
import { paginationOnAnim } from '../anim/PaginationAnim';
import NoneMark from './NoneMark';

const SearchBoard = () => {
  const dispatch = useDispatch();
  const { target, keyword, currPage, posts, waiting, complete, loading } =
    useSelector(({ camController, search, loading }: RootState) => ({
      target: camController.target,
      keyword: search.keyword,
      currPage: search.currPage,
      posts: search.posts,
      waiting: search.waiting, // 서버로부터 포스트 응답 대기
      complete: search.complete, // 서버로부터 포스트 응답 완료
      loading: loading['search/searchPosts'],
    }));
  const panelRefs = useRef<(RefObject<Group> | null)[]>([]);
  const pgRef = useRef<Group>(null);
  const markRef = useRef<Mesh>(null);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = e.target['search-input'].value;
    if (inputValue === '') return; // 검색창이 비어있는 경우 검색 요청 무시
    dispatch(initializePage());
    dispatch(setKeyword(inputValue));
    dispatch(loadWaiting());
  };

  // Board On/Off 애니메이션, 검색결과 새로고침 컨트롤
  useEffect(() => {
    // search로 진입했을 때 posts 기록이 있을 경우 새로고침 수행
    if (target === 'search' && posts) {
      dispatch(loadWaiting());
    }
  }, [target]);

  // Panel On/Off 애니메이션, 검색 결과 요청 컨트롤
  useEffect(() => {
    if (!panelRefs || !pgRef) return;
    const tl = gsap.timeline();
    if (waiting && !complete) {
      // animation off를 수행하고 post정보 서버로 요청
      // gsap
      //   .timeline()
      //   .add(panelOffAnim(panelRefs.current))
      //   .add(() => {
      //     dispatch(searchPosts({ page: currPage, keyword }));
      //   });
      if (!posts || posts.length == 0) {
        tl.add(markOffAnim(markRef.current as Mesh));
      } else {
        tl.add(panelOffAnim(panelRefs.current));
      }
      tl.add(() => {
        dispatch(searchPosts({ page: currPage, keyword }));
      });
    } else if (waiting && complete) {
      // gsap
      //   .timeline()
      //   .add(panelOnAnim(panelRefs.current))
      //   .add(paginationOnAnim(pgRef.current as Group))
      //   .add(() => {
      //     dispatch(loadComplete());
      //   });
      if (!posts || posts.length == 0) {
        tl.add(markOnAnim(markRef.current as Mesh));
      } else {
        tl.add(panelOnAnim(panelRefs.current));
      }
      tl.add(() => {
        dispatch(loadComplete());
      });
    }
    tl.play();
  }, [waiting, complete]);

  // search onTarget이 아닌경우 Panel Off
  const onTarget = ['search', 'connect', 'screen'];
  useEffect(() => {
    if (!onTarget.includes(target)) {
      gsap
        .timeline()
        .add(panelOffAnim(panelRefs.current), 'off')
        .add(paginationOnAnim(pgRef.current as Group), 'off');
    }
  }, [target]);

  return (
    <group rotation={[0, Math.PI * 0.25, 0]}>
      <mesh
        position={[-5.2, -5.8, 1.1]}
        onClick={() => {
          dispatch(setTarget('key'));
        }}>
        <boxGeometry args={[1, 2, 0.2]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh>
        <boxGeometry args={[12, 14, 2]} />
        <meshStandardMaterial />
        <Html
          transform
          occlude={true}
          rotation={[0, 0, Math.PI * 0.5]}
          position={[-5.2, 1.2, 1.001]}>
          <SearchInput onSubmit={onSubmit} />
        </Html>
      </mesh>
      {!loading &&
        posts &&
        posts.map((post, idx) => (
          <SearchPanel
            ref={el => (panelRefs.current[idx] = el)}
            post={post}
            key={idx}
            position={[-3.5 + idx * 1.8, 0, 0]}
          />
        ))}
      <NoneMark
        ref={markRef}
        position={[0.5, -1.2, 0]}
        rotation={[0, 0, Math.PI * 0.5]}
      />
      <SearchPagination ref={pgRef} position={[5.1, 0, 0]} />
    </group>
  );
};

export default SearchBoard;
