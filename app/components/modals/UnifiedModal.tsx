import { XMarkIcon } from "@heroicons/react/24/outline";
import * as S from "./Modal.styles";

type UnifiedModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function UnifiedModal({
  isOpen,
  onClose,
  title,
  children,
}: UnifiedModalProps) {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <h2>{title}</h2>
          <button onClick={onClose}>
            <XMarkIcon className="size-6" />
          </button>
        </S.ModalHeader>
        <S.ModalBody>{children}</S.ModalBody>
      </S.ModalContainer>
    </S.Overlay>
  );
}
