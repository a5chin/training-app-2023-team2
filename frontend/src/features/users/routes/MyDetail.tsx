import {
  Box,
  Stack,
  Image,
  HStack,
  Text,
  Spinner,
  Flex,
  AspectRatio,
  Button,
} from '@chakra-ui/react';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { useAuth } from '@/lib/auth';

export function MyDetail() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Box>User has not logged in!</Box>;
  }

  const HeaderFallBackComponent = (
    <AspectRatio zIndex="hide" ratio={8 / 2}>
      <Flex
        justifyContent="center"
        alignItems="center"
        width="full"
        height="full"
        bg="gray.900"
      >
        <Spinner size="xl" colorScheme="twitter" />
      </Flex>
    </AspectRatio>
  );

  return (
    <Stack>
      <Image
        src="https://picsum.photos/800/200"
        objectFit="cover"
        alt="header"
        fallback={HeaderFallBackComponent}
      />
      <Box>
        <Box paddingX={5} marginTop="-8%">
          <UserIcon name={currentUser.name} size="20%" />
        </Box>
      </Box>
      <HStack justifyContent="space-between" padding="10">
        <Text fontSize="3xl" fontWeight="medium">
          {currentUser.name}
        </Text>
        <Button colorScheme="twitter" rounded="full" alignSelf="end">
          プロフィールを入力
        </Button>
      </HStack>
      <Text paddingX={10} paddingY={-10} fontSize="2xl" fontWeight="medium">
        {currentUser.profile}
      </Text>
    </Stack>
  );
}
