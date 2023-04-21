import { useEffect, useCallback } from 'react';
import Editor from './Editor';
import { WriteReducerCarrier } from 'reducer-carrier-types';

const EditorContainer = ({
  writeReducerCarrier,
}: {
  writeReducerCarrier: WriteReducerCarrier;
}) => {
  const { title, body } = writeReducerCarrier.writeState;
  const onChangeField = useCallback(
    (payload: { key: 'title' | 'body'; value: string }) => {
      writeReducerCarrier.changeField(payload);
    },
    [],
  );
  // 언마운트시 초기화
  useEffect(() => {
    return () => {
      writeReducerCarrier.initialize();
    };
  }, []);
  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
