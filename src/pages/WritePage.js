import HtmlWrapper from "../components/html/common/HtmlWrapper"
import EditorContainer from "../components/html/write/EditorContainer"
import TagBoxContainer from "../components/html/write/TagBoxContainer"
import WriteActionButtonsContainer from "../components/html/write/WriteActionButtonContainer"

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