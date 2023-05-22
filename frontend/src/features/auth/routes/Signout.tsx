import { ModalLayout } from '../components/ModalLayout';
import { SignoutForm } from '../components/SignoutForm';

export function Signout() {
  const modalHeader = <>Are you sure you want to log out?</>;
  const modalBody = <SignoutForm />;
  const modalFooter = null;
  return (
    <ModalLayout
      modalHeader={modalHeader}
      modalBody={modalBody}
      modalFooter={modalFooter}
    />
  );
}
