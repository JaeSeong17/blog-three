import { User } from 'auth-type';
import { ChangeEvent, useState } from 'react';
import { PostReducerCarrier } from 'reducer-carrier-types';
import { Comment } from 'screen-state-types';
import styled from 'styled-components';
import CommentEditor from './CommentEditor';
import CommentEditActionButtons from './CommentEditActionButtons';

const CommentViewerBlock = styled.div`
  display: block;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0.5rem 0 0.5rem 0;
  padding: 0.8rem 0.5rem 0.8rem 0.5rem;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.4rem;

  .username {
    font-size: 0.9rem;
    color: black;
    font-weight: bold;
    margin-right: 0.4rem;
  }
  .date {
    font-size: 0.8rem;
    color: gray;
  }
`;
const Text = styled.div`
  width: 1 0 auth;
  font-size: 0.9rem;
  color: black;
`;

interface CommentViewerParams {
  user: User | null;
  comment: Comment;
  postReducerCarrier: PostReducerCarrier;
}

const CommentViewer = ({
  user,
  comment,
  postReducerCarrier,
}: CommentViewerParams) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const onEdit = () => {
    setEditMode(true);
    setText(comment.body);
  };
  const onCancel = () => {
    setEditMode(false);
    setText('');
  };
  const onDel = () => {
    postReducerCarrier.removeComment(comment._id);
  };
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    console.log(text);
  };
  const onConfirm = () => {
    if (comment.body === text) return;
    postReducerCarrier.updateComment({ commentId: comment._id, body: text });
    setEditMode(false);
    setText('');
  };

  return editMode ? (
    <CommentEditor
      edit
      text={text}
      onConfirm={onConfirm}
      onCancel={onCancel}
      onChangeText={onChangeText}
    />
  ) : (
    <CommentViewerBlock>
      <Header>
        <Info>
          <div className="username">{comment.user.username}</div>
          <div className="date">
            {new Date(comment.publishedDate).toLocaleDateString()}
          </div>
        </Info>
        {user && user._id === comment.user._id && (
          <CommentEditActionButtons onEdit={onEdit} onDel={onDel} />
        )}
      </Header>
      <Text>{comment.body}</Text>
    </CommentViewerBlock>
  );
};

export default CommentViewer;
