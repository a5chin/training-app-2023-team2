import { Box, Flex, Icon, Text } from '@chakra-ui/react';

export function Posts() {
  // const { posts, isLoading, isError } = usePosts();

  return (
    <Flex direction="column">
      {/* Side bar */}
      <Flex direction="row">
        <Box>Home</Box>
        <Box>Profile</Box>
      </Flex>

      {/* Tweets */}
      <Flex direction="row">
        {/* Tweet */}
        <Flex direction="column">
          <Flex direction="row">
            <Icon />
          </Flex>
          <Flex direction="row">
            <Text>This is a first tweet.</Text>
            <Flex direction="column">
              <Box>Comment</Box>
              <Box>Like</Box>
              <Box>Share</Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* Sub information */}
    </Flex>
  );
}
