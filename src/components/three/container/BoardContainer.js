import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listPosts, loadComplete } from "../../../modules/posts";
import Board from "../common/Board";
import Pagination from "../common/Pagination";
import gsap from "gsap";

const BoardContainer = () => {
  const boardRef = useRef();
  const paginationRef = useRef();
  const { username } = useParams();
  const dispatch = useDispatch();
  const { target, posts, tag, page, error, loading, waiting, complete } = useSelector(
    ({ controller, posts, loading }) => ({
      target: controller.target,
      posts: posts.posts,
      tag: posts.currTag,
      page: posts.currPage,
      error: posts.error,
      waiting: posts.waiting,
      complete: posts.complete,
      loading: loading['posts/listPosts']
    })
  );

  useEffect(() => {
    const tl = gsap.timeline();
    if (target === 'board' && !waiting && complete) {
      console.log(posts);
      tl.add(boardRef.current.boardOnAnime())
        .add(boardRef.current.panelOnAnime())
        .add(paginationRef.current.paginationOnAnime(), "-=1");
    } else if (posts && target === 'key') {
      tl.add(boardRef.current.panelOffAnime())
        .add(paginationRef.current.paginationOffAnime(), "-=0.2")
        .add(boardRef.current.boardOffAnime(), "-=0.2");
    }
  }, [target, waiting, complete])

  useEffect(() => {
    dispatch(listPosts({ page, username, tag }));
  }, [tag])

  useEffect(() => {
    console.log('check change wait, comp: ', waiting, complete);
    if (waiting && !complete) {
      boardRef.current.panelOffAnime();
    } else if (waiting && complete) {
      boardRef.current.panelOnAnime();
    }
  }, [waiting, complete])

  return (
    <group position={[0, 10, -2]}>
      <Board
        ref={boardRef}
      />
      <Pagination
        ref={paginationRef} />
    </group>

  )
}

export default BoardContainer;