import { Text, Link } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { SignupForm } from '../components/SignupForm';
import { ModalLayout } from '../components/ModalLayout';

export function Signup() {
  const modalHeader = <>Signup</>;
  const modalBody = <SignupForm />;
  const modalFooter = (
    <Text>
      Already have an account?{' '}
      <Link
        fontWeight="bold"
        textColor="blue.400"
        as={ReachLink}
        to="/auth/signin"
      >
        Login
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
