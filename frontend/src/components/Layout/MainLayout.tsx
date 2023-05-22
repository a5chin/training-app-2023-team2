import { Box, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { GiHummingbird } from 'react-icons/gi';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { TweetButton } from '../Elements/TweetButton';

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  // TODO: 以下の情報を渡せるようにする
  // - SideMenuのどの項目のページを表示しているか
  return (
    <Flex direction="row" w="100vw" h="100vh">
      <Flex
        as="header"
        direction="row-reverse"
        bg="red"
        flexGrow={1}
        paddingX={4}
      >
        <Stack width={{ md: '275px' }}>
          <Icon boxSize={8} as={GiHummingbird} />
          <Box>
            <HStack as={Link} to="/" spacing={4}>
              <Icon boxSize={8} as={AiFillHome} />
              <Text fontSize={{ base: '0', md: '3xl' }} fontWeight="medium">
                Home
              </Text>
            </HStack>
            <HStack as={Link} to="/" spacing={4}>
              <Icon boxSize={8} as={AiOutlineUser} />
              <Text fontSize={{ base: '0', md: '3xl' }} fontWeight="medium">
                Profile
              </Text>
            </HStack>
          </Box>
          <TweetButton />
        </Stack>
      </Flex>

      <Box as="main" h="full" flexGrow={3} flexShrink={0}>
        {children}
      </Box>
    </Flex>
  );
}
