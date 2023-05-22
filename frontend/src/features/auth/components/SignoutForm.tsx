import { Box, Button, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

export function SignoutForm() {
  const { signout, currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const fromUrl = searchParams.get('from');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, fromUrl, navigate]);

  return (
    <Box padding={4}>
      <VStack>
        <Button bg="blue.400" width="full" onClick={() => signout()}>
          Signout
        </Button>
        <Button
          bg="gray.300"
          width="full"
          onClick={() => navigate(fromUrl ? decodeURIComponent(fromUrl) : '/')}
        >
          Cancel
        </Button>
      </VStack>
    </Box>
  );
}
