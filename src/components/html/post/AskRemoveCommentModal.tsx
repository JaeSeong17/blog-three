import AskModal from '../common/AskModal';

interface AskRemoveModalParams {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const AskRemoveCommentModal = ({
  visible,
  onConfirm,
  onCancel,
}: AskRemoveModalParams) => {
  return (
    <AskModal
      visible={visible}
      title="댓글 삭제"
      description="해당 댓글을 정말 삭제하시겠습니까?"
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskRemoveCommentModal;
