import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useDisclosure,
  Text,
  Link,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Link as ReachLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { emailRegexp } from '@/utils';

type SigninFormInput = {
  email: string;
  password: string;
};

function SigninForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormInput>({ mode: 'onBlur' });
  const { signin, currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(redirectUrl ? decodeURIComponent(redirectUrl) : '/');
    }
  }, [currentUser, navigate, redirectUrl]);

  const onSubmit: SubmitHandler<SigninFormInput> = async (userInput) => {
    console.log(`UserInput: ${JSON.stringify(userInput)}`);
    // TODO: エラーレスポンスのハンドリング
    await signin(userInput);
  };

  return (
    <Box padding={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!(errors.email || errors.password)}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="email"
            type="email"
            {...register('email', {
              required: {
                value: true,
                message: 'メールアドレスを入力してください',
              },
              pattern: {
                value: emailRegexp,
                message: 'メールアドレスの形式が合っていません。',
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && <span>{errors.email?.message}</span>}
          </FormErrorMessage>

          <FormLabel htmlFor="password">password</FormLabel>
          <Input
            id="password"
            placeholder="password"
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'パスワードを入力してください',
              },
              minLength: {
                value: 8,
                message: 'パスワードは8文字以上である必要があります',
              },
              maxLength: {
                value: 100,
                message: 'パスワードは100文字以下である必要があります',
              },
            })}
          />
          <FormErrorMessage>
            {errors.password && <span>{errors.password?.message}</span>}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          bg="blue.400"
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
          width="full"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export function Signin() {
  const navigate = useNavigate();
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  useEffect(() => {
    if (!isOpen) {
      navigate('/');
    }
  }, [isOpen, navigate]);

  // TODO: Signin と Signup は Form とテキスト以外は同じなので共通化する。
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Signin</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SigninForm />
        </ModalBody>

        <ModalFooter>
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
