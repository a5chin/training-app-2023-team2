import {
  Box,
  BoxProps,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { User } from '@/features/users';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { useAuth } from '@/lib/auth';

const dummy: User[] = [
  { id: 'aaaa', name: 'iam' },
  { id: 'test', name: 'test' },
  { id: 'aaaa', name: 'iam' },
];

const axios = Axios.create();

export function Recommendation({ ...rest }: BoxProps) {
  const { colorMode } = useColorMode();
  const { currentUser } = useAuth();

  const [users, setUsers] = useState<User[]>(dummy);

  useEffect(() => {
    axios
      .get(`http://localhost:8888/${currentUser?.id}`, {})
      .then((res) => setUsers(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      {...rest}
      rounded={18}
      bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
      pt={3}
      px={4}
      minH="200px"
    >
      <Heading size="md">おすすめユーザー</Heading>
      <Stack py={5} gap={4}>
        {users &&
          users.map((user) => (
            <HStack gap={1}>
              <Stack>{user && <UserIcon name={user.name} />}</Stack>
              <Text fontWeight="semibold">{user.name}</Text>
            </HStack>
          ))}
        <Link href="/" fontSize="sm" color="blue.500">
          この返信を表示
        </Link>
      </Stack>
    </Box>
  );
}
