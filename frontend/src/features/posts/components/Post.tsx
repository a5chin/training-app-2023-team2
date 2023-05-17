import { Box, Flex, Text, HStack } from '@chakra-ui/react';
import { CustomCommentButton } from './CustomCommentButton';
import { CustomGoodButton } from './CustomGoodButton';
import { Post as PostType } from '../types';

type PostProps = {
  post: PostType;
};

export function Post({ post }: PostProps) {
  const { title, body, user } = post;

  return (
    <Box borderColor="black" borderWidth="1px">
      <Flex direction="row" px="19px">
        {/* <Flex direction="column">
            <Icon />
          </Flex> */}
        <Flex direction="column">
          <HStack>
            <Text>{title}</Text>
            <Text>written by {user.name}</Text>
          </HStack>
          <Text>{body}</Text>
          <HStack>
            <CustomCommentButton baseColor="black" hoverColor="red" />
            <CustomGoodButton
              baseColor="black"
              hoverColor="pink"
              fillColor="pink"
            />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
