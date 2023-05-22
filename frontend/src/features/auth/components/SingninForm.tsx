import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuth } from '@/lib/auth';
import { emailRegexp } from '@/utils';

type SigninFormInput = {
  email: string;
  password: string;
};

export function SigninForm() {
  const toast = useToast();
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
    try {
      await signin(userInput);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast({
          title: 'Error',
          description: e.response?.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // HTTPエラー以外は全て上に伝播させる。
        console.error(`Uknown error: ${JSON.stringify(e)}`);
        throw e;
      }
    }
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
