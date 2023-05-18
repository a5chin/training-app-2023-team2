import { Box, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAuth } from '@/lib/auth';

export function Signin() {
  const { signin, signout, currentUser } = useAuth();

  useEffect(() => {
    // TODO: ユーザーがログイン済みなら /posts に飛ばす
    console.log(`currentUser has changed! ${JSON.stringify(currentUser)}`);
  }, [currentUser]);

  return (
    <Box>
      <Box>This is signin page.</Box>
      <Box>currentUser: {currentUser ? currentUser.name : 'Not signined'}</Box>
      <Button
        onClick={async () => {
          await signin({
            email: 'testuser@a.com',
            password: 'password',
          });
        }}
      >
        Signin!
      </Button>
      <Button
        onClick={async () => {
          await signout();
        }}
      >
        Signout!
      </Button>
    </Box>
  );
}
