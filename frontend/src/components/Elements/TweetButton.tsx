import {
  Button,
  IconButton,
  Modal,
  Textarea,
  useBreakpointValue,
  useDisclosure,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  useColorMode,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BiPen } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { axios } from '@/lib/axios';

type TweetFormInput = {
  content: string;
};

export function TweetButton() {
  const isLessThanMd = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { register, getValues, handleSubmit, reset } =
    useForm<TweetFormInput>();
  const toast = useToast();
  const { colorMode } = useColorMode();

  return (
    <div>
      {isLessThanMd ? (
        <IconButton
          aspectRatio="1/1"
          size="md"
          icon={<BiPen />}
          bg="blue.400"
          aria-label="Tweet button"
          rounded="full"
          onClick={onOpen}
        />
      ) : (
        <Button
          colorScheme="twitter"
          textColor="white"
          fontSize="xl"
          fontWeight="bold"
          width="full"
          variant="solid"
          boxShadow="md"
          rounded="full"
          paddingY={6}
          textAlign="center"
          onClick={onOpen}
        >
          Tweet
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={colorMode === 'light' ? 'white' : 'black'}>
          <form
            onSubmit={handleSubmit(async () => {
              const data = new FormData();
              data.append('content', getValues().content);
              try {
                await axios.post('/posts', data, {
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
            })}
          >
            <ModalHeader
              fontSize="25px"
              color={colorMode === 'light' ? 'black' : 'white'}
            >
              投稿内容
            </ModalHeader>
            <ModalCloseButton
              color={colorMode === 'light' ? 'black' : 'white'}
            />
            <ModalBody pb={6}>
              <FormControl>
                <Textarea
                  variant="unstyled"
                  placeholder="今どうしてる？"
                  size="sm"
                  color={colorMode === 'light' ? 'black' : 'white'}
                  fontSize="25px"
                  resize="none"
                  {...register('content', { required: true })}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="twitter"
                textColor="white"
                size="sm"
                mr={1}
                type="submit"
              >
                投稿する
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
