import {
  Box,
  Text,
  HStack,
  useColorMode,
  Stack,
  Link,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomCommentButton } from './CustomCommentButton';
import { CustomGoodButton } from './CustomGoodButton';
import { CustomInfoButton } from './CustomInfoButton';
import { Post as PostType } from '@/features/posts';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { ReplyModal } from '@/features/posts/components/ReplyModal';
import { useAuth } from '@/lib/auth';

type PostProps = {
  post: PostType;
  handleDeleteTweet: (() => void) | ((post: PostType) => void);
  handleClickLike: (post: PostType) => void;
};

export function Post({ post, handleDeleteTweet, handleClickLike }: PostProps) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { colorMode } = useColorMode();
  const location = useLocation();
  const replyModalDisclosure = useDisclosure();

  return (
    <Stack _hover={{ bg: colorMode === 'dark' ? 'blackAlpha.400' : 'gray.50' }}>
      <Divider />
      <Box
        p={3}
        width="100%"
        onClick={() => navigate(`/posts/${post.id}`)}
        pos="relative"
      >
        <HStack alignItems="start" width="100%">
          <Stack>{post.user && <UserIcon name={post.user.name} />}</Stack>
          <Stack width="100%">
            <Stack justifyContent="space-between">
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
                  hoverColor={
                    colorMode === 'light' ? 'blackAlpha.400' : 'gray.50'
                  }
                  aria-label="comment-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    replyModalDisclosure.onOpen();
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
          <CustomInfoButton
            baseColor={colorMode === 'light' ? 'black' : 'white'}
            hoverColor="blue"
            aria-label="info-button"
            canDelete={currentUser?.id === post?.user?.id}
            pos="absolute"
            top="0"
            right="0"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTweet(post);
            }}
          />
        </HStack>
      </Box>
      <ReplyModal disclosure={replyModalDisclosure} post={post} />
    </Stack>
  );
}
