import HtmlWrapper from "../common/HtmlWrapper"
import EditorContainer from "../write/EditorContainer"
import TagBoxContainer from "../write/TagBoxContainer"
import WriteActionButtonsContainer from "../write/WriteActionButtonContainer"
import { useImperativeHandle } from "react";
import { useNavigate } from "../../../../node_modules/react-router-dom/dist/index";
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { initialize } from "../../../modules/write";

const WritePage = forwardRef(({ writeComplete }, ref) => {
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
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer writeComplete={writeComplete} />
    </HtmlWrapper>
  )
});

export default WritePage;
