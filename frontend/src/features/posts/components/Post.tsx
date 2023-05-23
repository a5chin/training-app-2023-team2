import { Box, Flex, Text, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CustomCommentButton } from './CustomCommentButton';
import { CustomGoodButton } from './CustomGoodButton';
import { Entity_Post as PostType } from '@/aspida/@types';

type PostProps = {
  post: PostType;
  handleClickLike: (post: PostType) => void;
};

export function Post({ post, handleClickLike }: PostProps) {
  const navigate = useNavigate();

  return (
    <Box
      borderColor="black"
      borderWidth="1px"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      <Flex direction="row" px="19px">
        {/* <Flex direction="column">
            <Icon />
          </Flex> */}
        <Flex direction="column">
          <HStack>
            <Text>{post.user?.name}</Text>
          </HStack>
          <Text>{post.body}</Text>
          <HStack>
            <HStack>
              <CustomCommentButton
                baseColor="black"
                hoverColor="red"
                aria-label="comment-button"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
              <Text>N</Text>
            </HStack>
            <HStack>
              <CustomGoodButton
                baseColor="black"
                hoverColor="pink"
                fillColor="pink"
                aria-label="comment-button"
                disabled={!post.is_my_favorite}
                isLiked={post.is_my_favorite}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickLike(post);
                }}
              />
              <Text>{post.favorites_count}</Text>
            </HStack>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
