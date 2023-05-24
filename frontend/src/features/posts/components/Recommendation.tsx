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
import { User } from '@/features/users';
import { UserIcon } from '@/components/Avatar/BoringAvatar';

// const Users: User[] = [
//   { id: 'aaaa', name: 'iam' },
//   { id: 'test', name: 'test' },
//   { id: 'aaaa', name: 'iam' },
// ];

const axios = Axios.create();

const Users: User[] = await axios
  .get('http://localhost:8888/hoge', {})
  .then((res) => res.data.data);

export function Recommendation({ ...rest }: BoxProps) {
  const { colorMode } = useColorMode();
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
        {Users.map((user) => (
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
