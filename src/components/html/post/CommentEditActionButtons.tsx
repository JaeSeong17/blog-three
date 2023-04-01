import { useState } from 'react';
import AskRemoveCommentModal from './AskRemoveCommentModal';
import CommentButton from '../common/CommentButton';

interface CommentEditActionButtonsParams {
  onEdit: () => void;
  onDel: () => void;
}

const CommentEditActionButtons = ({
  onEdit,
  onDel,
}: CommentEditActionButtonsParams) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onDel();
  };
  return (
    <>
      <div>
        <CommentButton onClick={onEdit}>Edit</CommentButton>
        <CommentButton onClick={onRemoveClick}>Del</CommentButton>
      </div>
      <AskRemoveCommentModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default CommentEditActionButtons;
