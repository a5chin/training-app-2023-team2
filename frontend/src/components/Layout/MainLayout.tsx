import {
  Box,
  BoxProps,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { GiHummingbird } from 'react-icons/gi';
import * as React from 'react';
import { Link, createSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { TweetButton } from '../Elements/TweetButton';

function AccountMenu({ ...props }: BoxProps) {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <Box {...props}>
      <Menu isLazy>
        <MenuButton>
          <HStack spacing={4}>
            <UserIcon
              boxSize={8}
              name={currentUser ? currentUser.name : 'None'}
              border={2}
              borderColor="black"
            />
            <Text fontSize={{ base: '0', md: '3xl' }} fontWeight="medium">
              {currentUser ? currentUser.name : 'Not Logged in'}
            </Text>
          </HStack>
        </MenuButton>
        <MenuList>
          {/* MenuItems are not rendered unless Menu is open */}
          {currentUser ? (
            <>
              <MenuItem>Settings</MenuItem>
              <MenuItem
                as={Link}
                to={{
                  pathname: '/auth/signout',
                  search: `?${createSearchParams({
                    from: encodeURIComponent(
                      location.pathname + location.search
                    ),
                  })}`,
                }}
              >
                Signout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                as={Link}
                to={{
                  pathname: '/auth/signup',
                  search: `?${createSearchParams({
                    redirect: encodeURIComponent(
                      location.pathname + location.search
                    ),
                  })}`,
                }}
              >
                Signup
              </MenuItem>
              <MenuItem
                as={Link}
                to={{
                  pathname: '/auth/signin',
                  search: `?${createSearchParams({
                    redirect: encodeURIComponent(
                      location.pathname + location.search
                    ),
                  })}`,
                }}
              >
                Signin
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
}

type MainHeaderProps = BoxProps;

function MainHeader({ ...rest }: MainHeaderProps) {
  return (
    <Flex
      as="header"
      direction="row-reverse"
      flexGrow={0}
      flexShrink={10}
      paddingX={4}
      bg={useColorModeValue('white', 'gray.900')}
      minH="full"
      {...rest}
    >
      <Flex flexDirection="column" flexBasis={{ md: '275px' }}>
        <Stack>
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
        <AccountMenu marginTop="auto" />
      </Flex>
    </Flex>
  );
}

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  // TODO: 以下の情報を渡せるようにする
  // - SideMenuのどの項目のページを表示しているか
  return (
    <Flex direction="row" minW="100vw" minH="100vh">
      <MainHeader />
      <Box as="main" h="full" flexGrow={3} flexShrink={0}>
        {children}
      </Box>
    </Flex>
  );
}
