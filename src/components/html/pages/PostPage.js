import { forwardRef } from "react";
import HtmlWrapper from "../common/HtmlWrapper"
import PostViewerContainer from "../post/PostViewerContainer";
import { useNavigate } from "react-router-dom";
import { useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { initialize } from "../../../modules/write";

const PostPage = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useImperativeHandle(ref, () => ({
        writeNavigate,
        postNavigate
    }));
    function writeNavigate() {
        dispatch(initialize());
        navigate('/write');
    }
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