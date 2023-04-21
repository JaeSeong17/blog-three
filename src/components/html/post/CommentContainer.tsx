import { User } from 'auth-type';
import { ChangeEvent, useState } from 'react';
import { PostReducerCarrier } from 'reducer-carrier-types';
import styled from 'styled-components';
import CommentEditor from './CommentEditor';
import CommentViewer from './CommentViewer';

const CommentContainerBlock = styled.div`
  margin: 1rem 0 1rem 0;
  font-size: 0.8rem;
  font-weight: bold;
  color: gray;
`;

interface CommentContainerParams {
  user: User | null;
  postReducerCarrier: PostReducerCarrier;
}
const CommentContainer = ({
  user,
  postReducerCarrier,
}: CommentContainerParams) => {
  const [text, setText] = useState<string>('');
  const comments = postReducerCarrier.postState.comments;
  const postId = postReducerCarrier.postState.post?._id as string;

  const onConfirm = () => {
    if (text === '') return;
    postReducerCarrier.writeComment({ postId, body: text });
    setText('');
  };
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <CommentContainerBlock>
      <div>comments</div>
      {comments &&
        comments.map((comment, idx) => (
          <CommentViewer
            key={idx}
            user={user}
            comment={comment}
            postReducerCarrier={postReducerCarrier}
          />
        ))}

      {user && (
        <CommentEditor
          text={text}
          onConfirm={onConfirm}
          onChangeText={onChangeText}
        />
      )}
    </CommentContainerBlock>
  );
};

export default CommentContainer;
