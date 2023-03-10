import { useDispatch, useSelector } from 'react-redux';
import { ScreenState } from 'screen-state-types';
import { changeField } from '../../../modules/screen/write';
import TagBox from './TagBox';

const TagBoxContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector(({ write }: ScreenState) => write.tags);

  const onChangeTags = (nextTags: Array<string>) => {
    dispatch(
      changeField({
        key: 'tags',
        value: nextTags,
      }),
    );
  };
  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
};

export default TagBoxContainer;
