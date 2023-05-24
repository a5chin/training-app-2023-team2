import { Box, Stack } from '@chakra-ui/react';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { User } from '../types';

type MyDetailProps = {
  currentUser: User | null;
};

export function MyDetail({ currentUser }: MyDetailProps) {
  return (
    <Stack>
      {currentUser ? (
        <UserIcon name={currentUser.name} />
      ) : (
        <Box>User has not logged in!</Box>
      )}
    </Stack>
  );
}
