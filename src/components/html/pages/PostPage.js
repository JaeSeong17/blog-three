import { forwardRef } from "react";
import HtmlWrapper from "../common/HtmlWrapper"
import PostViewerContainer from "../post/PostViewerContainer";
import { useNavigate } from "react-router-dom";
import { useImperativeHandle } from "react";

const PostPage = forwardRef((props, ref) => {
    const navigate = useNavigate();
    useImperativeHandle(ref, () => ({
        postNavigate
    }));
    function postNavigate(currPostUsername, currPostId) {
        navigate(`/@${currPostUsername}/${currPostId}`);
    }
    return (
        <HtmlWrapper>
            <PostViewerContainer />
        </HtmlWrapper>
    );
});

export default PostPage;