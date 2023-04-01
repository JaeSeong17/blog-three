import { ChangeEvent, useCallback, useRef } from 'react';
import styled from 'styled-components';
import CommentButton from '../common/CommentButton';

const CommentEditorBlock = styled.div`
  display: block;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0.5rem 0 0.5rem 0;
  padding: 0.8rem 0.5rem 0.8rem 0.5rem;
  .clearfix {
    clear: both; /* float 누출을 해결하기 위해 clear: both 속성을 사용합니다. */
  }
`;

const CommentTextArea = styled.textarea`
  font-size: 0.8rem;
  box-sizing: border-box;
  width: 100%;
  margin: 0.4rem 0 0.2rem 0;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const ButtonBlock = styled.div`
  float: right;
`;

interface CommentEditorParams {
  edit?: boolean;
  text: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onChangeText: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CommentEditor = ({
  edit = false,
  text,
  onConfirm,
  onCancel,
  onChangeText,
}: CommentEditorParams) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const autoResizeTextarea = useCallback(() => {
    if (!textRef.current) return;
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
  }, []);

  return (
    <CommentEditorBlock>
      <div>{edit ? 'Edit Comment' : 'Write Comment'}</div>
      <CommentTextArea
        ref={textRef}
        placeholder="댓글을 입력하세요."
        onInput={autoResizeTextarea}
        onChange={onChangeText}
        value={text}
      />
      <ButtonBlock>
        <CommentButton onClick={onConfirm}>Confirm</CommentButton>
        {edit && <CommentButton onClick={onCancel}>Cancel</CommentButton>}
      </ButtonBlock>
      <div className="clearfix" />
    </CommentEditorBlock>
  );
};

export default CommentEditor;
