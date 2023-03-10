import { CurrPostParams } from 'root-state-types';
import HtmlWrapper from '../common/HtmlWrapper';
import EditorContainer from '../write/EditorContainer';
import TagBoxContainer from '../write/TagBoxContainer';
import WriteActionButtonsContainer from '../write/WriteActionButtonContainer';

const WritePage = ({
  writeComplete,
}: {
  writeComplete: (parms: CurrPostParams) => void;
}) => {
  return (
    <HtmlWrapper>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer writeComplete={writeComplete} />
    </HtmlWrapper>
  );
};

export default WritePage;
