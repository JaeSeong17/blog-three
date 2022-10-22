import Quill from 'quill'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import gsap from 'gsap'

const EditorBlock = styled.div`
    padding: 5rem 1rem 5rem 1rem;
    background-color: white;
`

const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid black;
    margin: 0 0 2rem 0;
    width: 100%;
`

const QuillWrapper = styled.div`
    .ql-editor {
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor .ql-blank::before {
        left: 0px;
    }
`

const Editor = () => {
    const quillElement = useRef(null)
    const quillInstance = useRef(null)

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '내용을 작성하세요...',
            modules: {
                toolbar: [
                    [{header: '1'}, {header: '2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{list: 'ordered' }, {list: 'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });
    },[])


    return (
        <EditorBlock >
            <TitleInput placeholder="제목을 입력하세요" />
            <QuillWrapper>
                <div ref={quillElement} />
            </QuillWrapper>
        </EditorBlock>
    )
}

export default Editor;