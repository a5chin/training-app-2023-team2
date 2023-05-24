import {
  Button,
  Center,
  Divider,
  FormControl,
  HStack,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useBoolean,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { axios } from '@/lib/axios';
import { Post } from '@/features/posts';
import { aspidaClient } from '@/lib/aspida';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { useAuth } from '@/lib/auth';

type DisclosureType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
};

type Props = {
  disclosure: DisclosureType;
  post: Post;
};

type TweetFormInput = {
  content: string;
};

export function ReplyModal({ disclosure, post }: Props) {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<TweetFormInput>();

  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useAuth();
  const [loading, { on: onLoading, off: offLoading }] = useBoolean(false);

  const handleReply = useCallback(async () => {
    onLoading();
    const replyClient = aspidaClient.posts._postId(post.id).replies;
    const data = new FormData();
    data.append('content', getValues().content);
    try {
      await axios.post(replyClient.$path(), data, {
        withCredentials: true,
      });
      reset();
      navigate(0);
    } catch (e: any) {
      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    offLoading();
  }, [getValues, navigate, offLoading, onLoading, post.id, reset, toast]);

  return (
    currentUser && (
      <Modal {...disclosure} colorScheme="twitter">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleReply)}>
            <ModalHeader fontSize="25px" color="white" ml={0}>
              <HStack justifyContent="start">
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  color="gray"
                  rounded={100}
                  aria-label="close-button"
                  onClick={disclosure.onClose}
                />
              </HStack>
            </ModalHeader>
            <ModalBody pb={6}>
              <Stack>
                <HStack alignItems="start">
                  <Stack>
                    {post.user && <UserIcon name={post.user.name} />}
                    <Center h="50px">
                      <Divider
                        orientation="vertical"
                        size="lg"
                        colorScheme="twitter"
                        border="1px"
                      />
                    </Center>
                  </Stack>
                  <Stack>
                    <Stack px={1} fontSize="sm">
                      <Text fontWeight="semibold" fontSize="md">
                        {post.user?.name}
                      </Text>
                      <Text fontSize="sm">{post.body}</Text>
                      {post.user && (
                        <HStack>
                          <Text fontSize="sm">返信先：</Text>
                          <Link href="/" color="blue.500">
                            @{post.user.name}
                          </Link>
                          <Text fontSize="sm">さん</Text>
                        </HStack>
                      )}
                    </Stack>
                  </Stack>
                </HStack>
                <HStack alignItems="start">
                  <Stack>
                    <UserIcon name={currentUser.name} />
                  </Stack>
                  <FormControl>
                    <Textarea
                      variant="unstyled"
                      placeholder="返信を投稿"
                      size="md"
                      color={colorMode === 'dark' ? 'white' : 'black'}
                      fontSize="lg"
                      resize="none"
                      p={3}
                      {...register('content', { required: true })}
                    />
                  </FormControl>
                </HStack>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                size="sm"
                colorScheme="twitter"
                type="submit"
                rounded={50}
                px={4}
                isLoading={loading}
                isDisabled={!isDirty || !isValid}
              >
                返信
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    )
  );
}
