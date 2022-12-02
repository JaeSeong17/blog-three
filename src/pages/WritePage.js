import HtmlWrapper from "../components/common/HtmlWrapper"
import EditorContainer from "../components/write/EditorContainer"
import TagBoxContainer from "../components/write/TagBoxContainer"
import WriteActionButtonsContainer from "../components/write/WriteActionButtonContainer"

const WritePage = () => {
    return (
        <HtmlWrapper>
            <EditorContainer/>
            <TagBoxContainer/>
            <WriteActionButtonsContainer/>
        </HtmlWrapper>
    )
}

export default WritePage;