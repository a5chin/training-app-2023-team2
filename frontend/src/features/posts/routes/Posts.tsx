import { Box, IconButton, Flex, Text, HStack } from '@chakra-ui/react';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { useState } from 'react';
import { usePosts } from '../api/getPosts';
import { Post as PostType } from '../types';

type PostProps = {
  post: PostType;
};

type ColorProps = {
  baseColor: string;
  selectedColor: string;
};

function CustomCommentButton({ baseColor, selectedColor }: ColorProps) {
  const [color, setColor] = useState<string>(baseColor);

  return (
    <IconButton
      bg="inherit"
      size="sm"
      aria-label="comment-button"
      icon={
        <div>
          <AiOutlineComment
            onMouseOver={() => setColor(selectedColor)}
            onMouseOut={() => setColor(baseColor)}
            style={{ color }}
          />
        </div>
      }
      _focus={{ bg: 'inherit' }}
      _hover={{ bg: 'inherit' }}
    />
  );
}

function CustomGoodButton({ baseColor, selectedColor }: ColorProps) {
  const [color, setColor] = useState<string>(baseColor);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <IconButton
      bg="inherit"
      size="sm"
      aria-label="good-button"
      icon={
        <div>
          {isLiked ? (
            <AiFillHeart style={{ color }} />
          ) : (
            <AiOutlineHeart
              onMouseOver={() => setColor(selectedColor)}
              onMouseOut={() => setColor(baseColor)}
              style={{ color }}
            />
          )}
        </div>
      }
      _focus={{ bg: 'inherit' }}
      _hover={{ bg: 'inherit' }}
      onClick={() => {
        setIsLiked(!isLiked);
        setColor(selectedColor);
      }}
    />
  );
}

function Post({ post }: PostProps) {
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
            <CustomCommentButton baseColor="black" selectedColor="red" />
            <CustomGoodButton baseColor="black" selectedColor="pink" />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}

export function Posts() {
  const { posts } = usePosts();

  // console.log(`posts in PostsPage: ${JSON.stringify(posts)}`);

  return (
    <Flex direction="row" w="full">
      {/* Tweets */}
      <Flex flexGrow={2} direction="column" fontSize="md" bg="blue">
        {posts && posts?.map((post) => <Post key={post.id} post={post} />)}
      </Flex>

      {/* Sub information */}
      <Flex flexGrow={1} direction="column" bg="green">
        <Box>Ranking</Box>
        <Box>Recommendation</Box>
      </Flex>
    </Flex>
  );
}
