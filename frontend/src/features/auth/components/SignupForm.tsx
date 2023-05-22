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

type SignupFormInput = {
  name: string;
  email: string;
  password: string;
};

export function SignupForm() {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInput>({ mode: 'onBlur' });
  const { signup, currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(redirectUrl ? decodeURIComponent(redirectUrl) : '/');
    }
  }, [currentUser, navigate, redirectUrl]);

  const onSubmit: SubmitHandler<SignupFormInput> = async (userInput) => {
    console.log(`UserInput: ${JSON.stringify(userInput)}`);
    try {
      await signup(userInput);
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
        <FormControl
          isInvalid={!!(errors.name || errors.email || errors.password)}
        >
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            {...register('name', {
              required: {
                value: true,
                message: 'ユーザー名を入力してください',
              },
              maxLength: {
                value: 40,
                message: 'ユーザー名は40文字以下である必要があります',
              },
            })}
          />
          <FormErrorMessage>
            {errors.name && <span>{errors.name?.message}</span>}
          </FormErrorMessage>

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
