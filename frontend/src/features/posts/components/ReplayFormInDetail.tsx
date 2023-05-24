import {
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { useAuth } from '@/lib/auth';
import { Post } from '@/features/posts';

type TweetFormInput = {
  content: string;
};

export function ReplayFormInDetail({
  handleReply,
  post,
}: {
  handleReply: (content: string) => void;
  post: Post;
}) {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<TweetFormInput>();

  const { currentUser } = useAuth();
  const [focus, { on: onFocus, off: offFocus }] = useBoolean(false);
  const [loading, { on: onLoading, off: offLoading }] = useBoolean(false);

  const onSubmit = useCallback(() => {
    onLoading();
    handleReply(getValues().content);
    reset();
    offLoading();
    offFocus();
  }, [getValues, handleReply, offFocus, offLoading, onLoading, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems="start" px={4}>
        <Divider mt={2} />
        <HStack w="full" py={4}>
          <Stack>{currentUser && <UserIcon name={currentUser.name} />}</Stack>
          <Stack flex="auto">
            {post.user && focus && (
              <HStack px={2}>
                <Text fontSize="sm">返信先：</Text>
                <Link href="/" color="blue.500">
                  @{post.user.name}
                </Link>
                <Text fontSize="sm">さん</Text>
              </HStack>
            )}
            <HStack>
              <FormControl width="100%">
                <Input
                  size="sm"
                  type="text"
                  fontSize="lg"
                  placeholder="返信を投稿"
                  bg="inherit"
                  variant="ghost"
                  onClick={onFocus}
                  {...register('content', {
                    required: true,
                  })}
                />
              </FormControl>
              {!focus && (
                <Button
                  size="md"
                  colorScheme="twitter"
                  type="submit"
                  rounded={50}
                  px={6}
                  isDisabled
                >
                  返信
                </Button>
              )}
            </HStack>
          </Stack>
        </HStack>
        {focus && (
          <HStack justifyContent="end" w="full">
            <Button
              size="md"
              colorScheme="twitter"
              type="submit"
              rounded={50}
              px={6}
              isLoading={loading}
              isDisabled={!isDirty || !isValid}
            >
              返信
            </Button>
          </HStack>
        )}
      </Stack>
    </form>
  );
}
