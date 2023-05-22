import {
  Box,
  BoxProps,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { GiHummingbird } from 'react-icons/gi';
import { BiPen } from 'react-icons/bi';
import * as React from 'react';
import { Link, createSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { UserIcon } from '@/components/Avatar/BoringAvatar';

function TweetButton() {
  const isLessThanMd = useBreakpointValue({ base: true, md: false });
  if (isLessThanMd) {
    return (
      <IconButton
        aspectRatio="1/1"
        size="md"
        icon={<BiPen />}
        bg="blue.400"
        aria-label="Tweet button"
        rounded="full"
      />
    );
  }
  return (
    <Button
      bg="blue.400"
      textColor="white"
      fontSize="xl"
      fontWeight="bold"
      width="full"
      variant="solid"
      boxShadow="md"
      rounded="full"
      paddingY={6}
      textAlign="center"
    >
      Tweet
    </Button>
  );
}

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
        flexGrow={0}
        flexShrink={10}
        paddingX={4}
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

      <Box as="main" h="full" flexGrow={3} flexShrink={0}>
        {children}
      </Box>
    </Flex>
  );
}
