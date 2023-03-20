import { useEffect } from 'react';
import { WritePageParams } from 'reducer-carrier-types';
import { CurrPostParams } from 'root-state-types';
import WriteActionButtons from './WriteActionButtons';

const WriteActionButtonsContainer = ({
  scReducerCarrier,
  writeReducerCarrier,
}: WritePageParams) => {
  const { title, body, tags, post, postError, originalPostId } =
    writeReducerCarrier.writeState;

  // 포스트 등록
  const onPublish = () => {
    if (originalPostId) {
      // 기존 글 수정
      writeReducerCarrier.updatePost({ title, body, tags, id: originalPostId });
    } else {
      // 새 글 작성
      writeReducerCarrier.writePost({
        title,
        body,
        tags,
      });
    }
  };

  // 취소
  const onCancel = () => {
    // dispatch(setTarget('key'));
  };

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      const currPostParams: CurrPostParams = {
        username: user.username,
        postId: _id,
      };
      scReducerCarrier.setCurrPost(currPostParams);
      scReducerCarrier.setCurrMode('post');
    }
    if (postError) {
      console.log(postError);
    }
  }, [post, postError]);
  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
    />
  );
};

export default WriteActionButtonsContainer;
