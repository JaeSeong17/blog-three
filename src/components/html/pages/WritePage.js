import HtmlWrapper from "../common/HtmlWrapper"
import EditorContainer from "../write/EditorContainer"
import TagBoxContainer from "../write/TagBoxContainer"
import WriteActionButtonsContainer from "../write/WriteActionButtonContainer"
import { useImperativeHandle } from "react";
import { useNavigate } from "../../../../node_modules/react-router-dom/dist/index";
import { forwardRef } from "react";

const WritePage = forwardRef(({writeComplete}, ref) => {
    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
        writeNavigate,
        postNavigate
    }));
    function writeNavigate() {
        navigate('/write');
    }
    function postNavigate(currPostUsername, currPostId) {
        navigate(`/@${currPostUsername}/${currPostId}`);
    }
    return (
        <HtmlWrapper>
            <EditorContainer/>
            <TagBoxContainer/>
            <WriteActionButtonsContainer writeComplete={writeComplete}/>
        </HtmlWrapper>
    )
});

export default WritePage;
