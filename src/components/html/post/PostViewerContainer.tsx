import { useEffect } from 'react';
import { PostPageParams } from 'reducer-carrier-types';
import { PostResponse } from 'screen-state-types';
import { removePost } from 'src/lib/api/posts';
import PostActionButtons from './PostActionButtons';
import PostViewer from './PostViewer';

const PostViewerContainer = ({
  user,
  camReducerCarrier,
  scReducerCarrier,
  postReducerCarrier,
  writeReducerCarrier,
  loadingReducerCarrier,
}: PostPageParams) => {
  const { post, error } = postReducerCarrier.postState;
  const { ['post/readPost']: loading } = loadingReducerCarrier.loadingState;
  const { currPostId } = scReducerCarrier.scState;

  // 수정 버튼 클릭 이벤트 핸들러
  function onEdit() {
    writeReducerCarrier.setOriginalPost(post as PostResponse);
    scReducerCarrier.setCurrMode('write');
  }
  // 삭제 버튼 클릭 이벤트 핸들러
  async function onRemove() {
    try {
      await removePost(currPostId as string);
      camReducerCarrier.setTarget('key');
    } catch (e) {
      console.log(e);
    }
  }

  // 계정과 포스트의 작성자가 일치하는 경우에만 수정/삭제 버튼 활성화
  const ownPost = (user && user._id) === (post && post.user._id);

  useEffect(() => {
    // 처음 마운트 시 포스틑 읽기 요청
    if (currPostId) {
      postReducerCarrier.readPost(currPostId);
    }
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      postReducerCarrier.unloadPost();
    };
  }, [currPostId]);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={
        ownPost ? (
          <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
        ) : null
      }
    />
  );
};

export default PostViewerContainer;
