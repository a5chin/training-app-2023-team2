import { Box, Flex, Text, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CustomCommentButton } from './CustomCommentButton';
import { CustomGoodButton } from './CustomGoodButton';
import { Post as PostType } from '../types';

type PostProps = {
  post: PostType;
};

export function Post({ post }: PostProps) {
  const { id, body, user } = post;
  const navigate = useNavigate();

  return (
    <Box
      borderColor="black"
      borderWidth="1px"
      onClick={() => navigate(`/posts/${id}`)}
    >
      <Flex direction="row" px="19px">
        {/* <Flex direction="column">
            <Icon />
          </Flex> */}
        <Flex direction="column">
          <HStack>
            <Text>{user?.name}</Text>
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
