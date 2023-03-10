import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WriteState } from 'screen-state-types';
import { changeField, initialize } from '../../../modules/screen/write';
import Editor from './Editor';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }: { write: WriteState }) => ({
    title: write.title,
    body: write.body,
  }));
  const onChangeField = useCallback(
    (payload: { key: 'title' | 'body'; value: string }) =>
      dispatch(changeField(payload)),
    [dispatch],
  );
  // 언마운트시 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
