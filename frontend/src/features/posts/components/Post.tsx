import {
  Box,
  Text,
  HStack,
  useColorMode,
  Stack,
  Link,
  Divider,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomCommentButton } from './CustomCommentButton';
import { CustomGoodButton } from './CustomGoodButton';
import { Post as PostType } from '@/features/posts';
import { UserIcon } from '@/components/Avatar/BoringAvatar';

type PostProps = {
  post: PostType;
  handleClickLike: (post: PostType) => void;
};

export function Post({ post, handleClickLike }: PostProps) {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const location = useLocation();

  return (
    <Stack _hover={{ bg: colorMode === 'dark' ? 'blackAlpha.400' : 'gray.50' }}>
      <Divider />
      <Box p={3} onClick={() => navigate(`/posts/${post.id}`)}>
        <HStack alignItems="start">
          <Stack>{post.user && <UserIcon name={post.user.name} />}</Stack>
          <Stack>
            <Stack px={1}>
              <Text fontWeight="semibold" fontSize="md">
                {post.user?.name}
              </Text>
              {post.parent &&
                location.pathname !== `/posts/${post.parent?.id}` && (
                  <Link
                    href={`${post.parent?.id}`}
                    fontSize="sm"
                    color="blue.500"
                  >
                    この返信を表示
                  </Link>
                )}
              <Text fontSize="sm">{post.body}</Text>
            </Stack>
            <HStack pt={2}>
              <HStack>
                <CustomCommentButton
                  baseColor={colorMode === 'light' ? 'black' : 'white'}
                  hoverColor="red"
                  aria-label="comment-button"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
                <Text fontSize="sm">N</Text>
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
                <Text fontSize="sm">{post.favoritesCount}</Text>
              </HStack>
            </HStack>
          </Stack>
        </HStack>
      </Box>
    </Stack>
  );
}
