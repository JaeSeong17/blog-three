import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listPosts } from "../../../modules/posts";
import Board from "../common/Board";
import Pagination from "../common/Pagination";

const BoardContainer = () => {
    const { username } = useParams();
    // const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { posts, tag, page, error, loading } = useSelector(
        ({ posts, loading }) => ({
            posts: posts.posts,
            tag: posts.currTag,
            page: posts.currPage,
            error: posts.error,
            loading: loading['posts/listPosts']
        })
    );

    useEffect(() => {
        // const tag = searchParams.get('tag');
        // page없으면 기본값 1
        // const page = parseInt(searchParams.get('page'), 10) || 1
        dispatch(listPosts({ page, username, tag }));
        console.log( page, username, tag );
        console.log(posts);
    }, [dispatch, username, tag, page]);

    return (
        <group position={[0, 10, -5]}>
            <Board
                loading={loading}
                error={error}
                posts={posts}
            />
            <Pagination />
        </group>
        
    )
}

export default BoardContainer;