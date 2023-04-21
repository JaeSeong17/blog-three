import { WriteReducerCarrier } from 'reducer-carrier-types';
import TagBox from './TagBox';

const TagBoxContainer = ({
  writeReducerCarrier,
}: {
  writeReducerCarrier: WriteReducerCarrier;
}) => {
  const { tags } = writeReducerCarrier.writeState;

  const onChangeTags = (nextTags: Array<string>) => {
    writeReducerCarrier.changeField({
      key: 'tags',
      value: nextTags,
    });
  };
  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
};

export default TagBoxContainer;
