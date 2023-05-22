import { Text, Link } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { ModalLayout } from '../components/ModalLayout';
import { SigninForm } from '../components/SingninForm';

export function Signin() {
  const modalHeader = <>Signin</>;
  const modalBody = <SigninForm />;
  const modalFooter = (
    <Text>
      New to here?{' '}
      <Link
        fontWeight="bold"
        textColor="blue.400"
        as={ReachLink}
        to="/auth/signup"
      >
        Create an account
      </Link>
    </Text>
  );

  return (
    <ModalLayout
      modalHeader={modalHeader}
      modalBody={modalBody}
      modalFooter={modalFooter}
    />
  );
}
