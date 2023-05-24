import { Box, Stack, Image, Button, HStack, Text } from '@chakra-ui/react';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { User } from '@/features/auth';

type MyDetailProps = {
  currentUser: User | null;
};

export function MyDetail({ currentUser }: MyDetailProps) {
  return (
    <Stack>
      <Image
        src="https://picsum.photos/800/200"
        objectFit="cover"
        alt="header"
      />
      {currentUser ? (
        <Box>
          <Box paddingX={5} marginTop="-8%">
            <UserIcon name={currentUser.name} size="10%" />
          </Box>
        </Box>
      ) : (
        <Box>User has not logged in!</Box>
      )}
      <HStack justifyContent="space-between" padding="10">
        <Text fontSize="3xl" fontWeight="medium">
          {currentUser && currentUser.name}
        </Text>
        <Button colorScheme="twitter" rounded="full" alignSelf="end">
          プロフィールを入力
        </Button>
      </HStack>
      <Text paddingX={10} paddingY={-10} fontSize="2xl" fontWeight="medium">
        {currentUser?.profile}
      </Text>
    </Stack>
  );
}
