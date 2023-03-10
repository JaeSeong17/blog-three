import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CurrPostParams } from 'root-state-types';
import { WriteState } from 'screen-state-types';
import { setTarget } from '../../../modules/root/camController';
import { writePost } from '../../../modules/screen/write';
import WriteActionButtons from './WriteActionButtons';

const WriteActionButtonsContainer = ({
  writeComplete,
}: {
  writeComplete: (parms: CurrPostParams) => void;
}) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError } = useSelector(
    ({ write }: { write: WriteState }) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
    }),
  );

  // 포스트 등록
  const onPublish = () => {
    dispatch(
      writePost({
        title,
        body,
        tags,
      }),
    );
  };

  // 취소
  const onCancel = () => {
    dispatch(setTarget('key'));
  };

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      const currPostParams: CurrPostParams = {
        username: user.username,
        postId: _id,
      };
      writeComplete(currPostParams);
    }
    if (postError) {
      console.log(postError);
    }
  }, [post, postError]);
  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};

export default WriteActionButtonsContainer;
