import { WritePageParams } from 'reducer-carrier-types';
import HtmlWrapper from '../common/HtmlWrapper';
import EditorContainer from './EditorContainer';
import TagBoxContainer from './TagBoxContainer';
import WriteActionButtonsContainer from './WriteActionButtonContainer';

const WritePage = ({
  scReducerCarrier,
  writeReducerCarrier,
}: WritePageParams) => {
  return (
    <HtmlWrapper
      onClick={e => e.stopPropagation()}
      onMouseOver={e => e.stopPropagation()}>
      <EditorContainer writeReducerCarrier={writeReducerCarrier} />
      <TagBoxContainer writeReducerCarrier={writeReducerCarrier} />
      <WriteActionButtonsContainer
        scReducerCarrier={scReducerCarrier}
        writeReducerCarrier={writeReducerCarrier}
      />
    </HtmlWrapper>
  );
};

export default WritePage;
