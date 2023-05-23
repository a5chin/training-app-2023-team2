import { Box, Flex, Text, HStack, useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { CustomCommentButton } from './CustomCommentButton';
import { CustomGoodButton } from './CustomGoodButton';
import { CustomInfoButton } from './CustomInfoButton';
import { Post as PostType } from '@/features/posts';

type PostProps = {
  post: PostType;
  handleDeleteTweet: (post: PostType) => void;
  handleClickLike: (post: PostType) => void;
};

export function Post({ post, handleDeleteTweet, handleClickLike }: PostProps) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { colorMode } = useColorMode();

  return (
    <Box
      borderColor="gray.400"
      borderBottomWidth="1px"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      <Flex direction="row" pl="19px">
        {/* <Flex direction="column">
            <Icon />
          </Flex> */}
        <Flex direction="column" w="100%">
          <HStack justifyContent="space-between">
            <Text>{post.user?.name}</Text>
            <CustomInfoButton
              baseColor={colorMode === 'light' ? 'black' : 'white'}
              hoverColor="blue"
              aria-label="info-button"
              canDelete={currentUser?.id === post?.user?.id}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTweet(post);
              }}
            />
          </HStack>
          <Text>{post.body}</Text>
          <HStack>
            <HStack>
              <CustomCommentButton
                baseColor={colorMode === 'light' ? 'black' : 'white'}
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
                baseColor={colorMode === 'light' ? 'black' : 'white'}
                hoverColor="pink"
                fillColor="pink"
                aria-label="comment-button"
                disabled={!post.isMyFavorite}
                isLiked={post.isMyFavorite}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickLike(post);
                }}
              />
              <Text>{post.favoritesCount}</Text>
            </HStack>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
