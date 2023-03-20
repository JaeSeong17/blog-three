import { WritePageParams } from 'reducer-carrier-types';
import HtmlWrapper from '../common/HtmlWrapper';
import EditorContainer from '../write/EditorContainer';
import TagBoxContainer from '../write/TagBoxContainer';
import WriteActionButtonsContainer from '../write/WriteActionButtonContainer';

const WritePage = ({
  scReducerCarrier,
  writeReducerCarrier,
}: WritePageParams) => {
  return (
    <HtmlWrapper>
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
