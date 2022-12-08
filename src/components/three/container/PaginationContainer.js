import Pagination from "../common/Pagination"
import { useSelector } from "react-redux";

const PaginationContainer = () => {
    const { currPage, currTag, lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
        currPage: posts.currPage,
        currTag: posts.currTag,
        lastPage: posts.lastPage,
        posts: posts.posts,
        loading: loading['posts/listPosts'],
    }));
    if (!posts || loading) return null;

    return (
        <Pagination 
            tag={currTag}
            page={parseInt(currPage, 10)}
            lastPage={lastPage}
        />
    )
}

export default PaginationContainer;