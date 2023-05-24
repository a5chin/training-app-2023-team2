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
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { useAuth } from '@/lib/auth';
import { Posts } from '@/features/users/components/Posts';
import { UpdateProfileModal } from '@/features/users/components/UpdateProfileModal';

export const HeaderFallBackComponent = (
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

export function MyDetail() {
  const { currentUser } = useAuth();
  const { colorMode } = useColorMode();
  const disclosure = useDisclosure();

  if (!currentUser) {
    return <Box>User has not logged in!</Box>;
  }

  return (
    <Stack
      minH="100vh"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
      borderStartWidth="1px"
      borderEndWidth="1px"
    >
      <Image
        src="https://picsum.photos/800/200"
        objectFit="cover"
        alt="header"
        fallback={HeaderFallBackComponent}
      />
      <Box>
        <HStack paddingX={4} marginTop="-12%" justifyContent="space-between">
          <UserIcon name={currentUser.name} size="20%" />
          <Button
            colorScheme="twitter"
            size="sm"
            rounded="full"
            alignSelf="end"
            onClick={disclosure.onOpen}
          >
            プロフィールを編集
          </Button>
        </HStack>
      </Box>
      <HStack justifyContent="space-between" px={4} py={3}>
        <Text fontSize="xl" fontWeight="semibold">
          {currentUser.name}
        </Text>
      </HStack>
      <Text paddingX={4} paddingY={1} fontSize="sm" fontWeight="medium">
        {currentUser.profile}
      </Text>
      <Posts userId={currentUser.id} />
      <UpdateProfileModal disclosure={disclosure} />
    </Stack>
  );
}
