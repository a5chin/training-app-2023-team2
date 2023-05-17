import { Box, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAuthContext } from '@/lib/auth';

export function Signup() {
  const { signup, currentUser } = useAuthContext();

  useEffect(() => {
    // TODO: ユーザーがログイン済みなら /posts に飛ばす
    console.log(`currentUser has changed! ${JSON.stringify(currentUser)}`);
  }, [currentUser]);

  return (
    <Box>
      <Box>This is signup page.</Box>
      <Box>currentUser: {currentUser ? currentUser.name : 'Not signined'}</Box>
      <Button
        onClick={async () => {
          await signup({
            name: 'Test User',
            email: 'testuser@a.com',
            password: 'password',
          });
        }}
      >
        Signup!
      </Button>
    </Box>
  );
}
