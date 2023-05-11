import { Box, Flex, Icon } from '@chakra-ui/react';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import * as React from 'react';

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  // TODO: 以下の情報を渡せるようにする
  // - SideMenuのどの項目のページを表示しているか
  // - MainContentを渡す
  // - SubInformationを渡す
  return (
    <Flex direction="row" w="100vw" h="100vh">
      <Flex
        as="header"
        direction="row"
        bg="red"
        flexGrow={1}
        justifyContent="right"
        p={1}
      >
        <Box>
          <Box>
            <Icon as={AiFillHome} />
            Home
          </Box>
          <Box>
            <Icon as={AiOutlineUser} />
            Profile
          </Box>
        </Box>
      </Flex>
      <Box as="main" h="full" flexGrow={2} flexShrink={0}>
        {children}
      </Box>
    </Flex>
  );
}
