import Quill from 'quill';
import { ChangeEvent, useEffect, useRef } from 'react';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';

const EditorBlock = styled.div`
  padding: 5rem 0 5rem 0;
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
    min-height: 250px;
    font-size: 1.125rem;
    line-height: 1.5;
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
  const quillElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let quill: Quill;
    if (quillElement.current) {
      quill = new Quill(quillElement.current, {
        theme: 'bubble',
        placeholder: '내용을 작성하세요...',
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block', 'link', 'image'],
          ],
        },
      }) as Quill;

      // quill에 test-change 이벤트 핸들러 등록
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

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;