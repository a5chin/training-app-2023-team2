import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ModalLayoutProps = {
  modalHeader: ReactNode;
  modalBody: ReactNode;
  modalFooter: ReactNode;
  redirectTo?: string;
};

export function ModalLayout({
  modalHeader,
  modalBody,
  modalFooter,
  redirectTo = '/',
}: ModalLayoutProps) {
  const navigate = useNavigate();
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  useEffect(() => {
    if (!isOpen) {
      navigate(redirectTo);
    }
  }, [isOpen, navigate, redirectTo]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modalBody}</ModalBody>

        <ModalFooter>{modalFooter}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
