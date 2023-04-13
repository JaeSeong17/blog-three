import Quill from 'quill';
import { ChangeEvent, useEffect, useRef } from 'react';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';

const EditorBlock = styled.div`
  padding: 4rem 0 4rem 0;
  background-color: white;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid black;
  margin: 0 0 2rem 0;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 290px;
    font-size: 1.1rem;
    line-height: 1.4;
  }
  .ql-editor .ql-blank::before {
    left: 0px;
  }
`;

interface EditorParams {
  title: string;
  onChangeField: (payload: any) => any;
  body: string;
}

const Editor = ({ title, onChangeField, body }: EditorParams) => {
  const quillElement = useRef<HTMLDivElement>(null); // quill 에디터가 마운트될 DOM요소를 가리키는 ref
  const quillInstance = useRef<Quill>(); // useEffect에서 생성한 Quill 에디터 인스턴스를 저장하는 ref

  useEffect(() => {
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        theme: 'bubble',
        placeholder: '내용을 작성하세요...',
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [
              {
                background: [
                  '#bbbbbb',
                  '#f06666',
                  '#ffc266',
                  '#66b966',
                  '#66a3e0',
                  '#c285ff',
                ],
              },
            ],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block', 'link', 'image'],
            ['clean'],
          ],
        },
      }) as Quill;

      // quill에 test-change 이벤트 핸들러 등록
      const quill = quillInstance.current;
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          onChangeField({ key: 'body', value: quill.root.innerHTML });
        }
      });
    }
  }, [onChangeField]);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  useEffect(() => {
    if (quillInstance.current) {
      quillInstance.current.root.innerHTML = body;
    }
  }, []);

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        defaultValue={title}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
