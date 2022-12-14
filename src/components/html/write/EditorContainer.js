import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { changeField, initialize } from "../../../modules/write";
import Editor from "./Editor";

const EditorContainer = () => {
    const dispatch = useDispatch();
    const { title, body } = useSelector(({ write }) => ({
        title: write.title,
        body: write.body,
    }));
    const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
        dispatch,
    ]);
    // 언마운트시 초기화
    useEffect(() => {
        return () => {
            dispatch(initialize());
        };
    }, [dispatch]);
    return <Editor onChangeField={onChangeField} title={title} body={body} />;
}

export default EditorContainer;