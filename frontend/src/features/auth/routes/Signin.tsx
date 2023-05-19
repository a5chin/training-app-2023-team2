import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

type UserInput = {
  email: string;
  password: string;
};

export function Signin() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserInput>({ mode: 'onBlur' });
  const { signin, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ユーザーがログイン済みなら / に飛ばす
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const onSubmit: SubmitHandler<UserInput> = async (userInput) => {
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
                value:
                  /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
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
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
