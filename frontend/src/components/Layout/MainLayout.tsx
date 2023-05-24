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
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { GiHummingbird } from 'react-icons/gi';
import * as React from 'react';
import { Link, createSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { TweetButton } from '../Elements/TweetButton';
import { truncateWithEllipsis } from '@/utils/strings';

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
            <Text fontSize={{ base: '0', md: 'md' }} fontWeight="semibold">
              {currentUser
                ? truncateWithEllipsis(currentUser.name, 13)
                : 'Not Logged in'}
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
  const { toggleColorMode, colorMode } = useColorMode();
  const location = useLocation();
  return (
    <Flex
      as="header"
      direction="column"
      paddingX={4}
      py={4}
      bg={useColorModeValue('gray.50', 'gray.900')}
      minH="full"
      {...rest}
    >
      <Stack>
        <Stack gap={3} px={3} pb={4}>
          <Icon boxSize={8} as={GiHummingbird} />
          <HStack as={Link} to="/" spacing={4}>
            <Icon boxSize={6} as={AiFillHome} />
            <Text
              fontSize={{ base: '0', md: 'xl' }}
              fontWeight={
                location.pathname === '/posts' ? 'semibold' : 'medium'
              }
            >
              ホーム
            </Text>
          </HStack>
          <HStack as={Link} to="/" spacing={4}>
            <Icon boxSize={6} as={AiOutlineUser} />
            <Text
              fontSize={{ base: '0', md: 'xl' }}
              fontWeight={
                location.pathname === '/users/me' ? 'semibold' : 'medium'
              }
            >
              プロフィール
            </Text>
          </HStack>
          <HStack onClick={toggleColorMode} spacing={4}>
            <Icon
              boxSize={6}
              as={
                colorMode === 'light' ? MdOutlineDarkMode : MdOutlineLightMode
              }
            />
            <Text fontSize={{ base: '0', md: 'xl' }} fontWeight="medium">
              カラーテーマ
            </Text>
          </HStack>
        </Stack>
        <TweetButton />
      </Stack>
      <AccountMenu marginTop="auto" paddingX={4} />
    </Flex>
  );
}

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const headerWidth = { base: '5rem', md: '18rem' };

  return (
    <Box minW="100vw" minH="100vh">
      <MainHeader width={headerWidth} pos="fixed" />
      <Box as="main" h="full" paddingLeft={headerWidth}>
        {children}
      </Box>
    </Box>
  );
}
