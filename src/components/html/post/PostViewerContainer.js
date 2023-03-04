import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readPost, unloadPost } from '../../../modules/screen/post';
import PostViewer from './PostViewer';

const PostViewerContainer = ({ currPostId }) => {
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/readPost'],
  }));

  useEffect(() => {
    // 처음 마운트 시 포스틑 읽기 요청
    dispatch(readPost(currPostId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [currPostId]);

  return <PostViewer post={post} loading={loading} error={error} />;
};

export default PostViewerContainer;
