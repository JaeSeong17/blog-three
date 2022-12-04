import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { listPosts } from "../../../modules/posts";
import Board from "../common/Board";

const BoardContainer = () => {
    const { username } = useParams();
    // const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { posts, error, loading } = useSelector(
        ({ posts, loading }) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/listPosts']
        })
    );

    useEffect(() => {
        // const tag = searchParams.get('tag');
        const tag = null;
        // page없으면 기본값 1
        // const page = parseInt(searchParams.get('page'), 10) || 1;
        const page = 1;
        dispatch(listPosts({ tag, username, page }));
    }, [dispatch, username]);

    return (
        <Board
            loading={loading}
            error={error}
            posts={posts}
        />
    )
}

export default BoardContainer;