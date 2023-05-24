import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  Textarea,
  useBoolean,
  useColorMode,
  UseDisclosureReturn,
  useToast,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { useAuth } from '@/lib/auth';
import { HeaderFallBackComponent } from '@/features/users/routes/MyDetail';

type UpdateProfileInput = {
  profile: string;
};

export function UpdateProfileModal({
  disclosure,
}: {
  disclosure: UseDisclosureReturn;
}) {
  const { updateProfile, currentUser } = useAuth();
  const { colorMode } = useColorMode();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { isDirty, isValid },
  } = useForm<UpdateProfileInput>({
    defaultValues: {
      profile: currentUser?.profile,
    },
  });
  const toast = useToast();
  const [loading, { on: onLoading, off: offLoading }] = useBoolean(false);

  const handleUpdateProfile = useCallback(async () => {
    onLoading();
    try {
      await updateProfile(getValues().profile);
    } catch (e: any) {
      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    disclosure.onClose();
    offLoading();
  }, [disclosure, getValues, offLoading, onLoading, toast, updateProfile]);

  return (
    currentUser && (
      <Modal {...disclosure} colorScheme="twitter">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <ModalHeader
              fontSize="25px"
              color={colorMode === 'dark' ? 'white' : 'gray.500'}
              ml={0}
              px={4}
            >
              <HStack justifyContent="space-between">
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  color="gray"
                  rounded={100}
                  aria-label="close-button"
                  onClick={disclosure.onClose}
                />
                <Heading size="md" pl={4}>
                  プロフィールを編集
                </Heading>
                <Spacer />
                <Button
                  size="sm"
                  colorScheme="twitter"
                  type="submit"
                  rounded={50}
                  px={4}
                  isLoading={loading}
                  isDisabled={!isDirty || !isValid}
                >
                  保存
                </Button>
              </HStack>
            </ModalHeader>
            <ModalBody pb={6} px={0} pt={0}>
              <Image
                src="https://picsum.photos/800/200"
                objectFit="cover"
                alt="header"
                fallback={HeaderFallBackComponent}
              />
              <Box>
                <HStack
                  paddingX={4}
                  marginTop="-12%"
                  justifyContent="space-between"
                >
                  <UserIcon name={currentUser.name} size="20%" />
                </HStack>
              </Box>
              <Stack px={6} py={4}>
                <Text fontWeight="semibold" fontSize="md">
                  {currentUser?.name}
                </Text>
                <Stack
                  p={2}
                  rounded={10}
                  borderColor="gray.100"
                  borderWidth="1px"
                >
                  <FormControl>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="semibold"
                      color={colorMode === 'dark' ? 'white' : 'gray.500'}
                    >
                      自己紹介
                    </FormLabel>
                    <Textarea
                      variant="unstyled"
                      placeholder="自己紹介を記入"
                      size="md"
                      color={colorMode === 'dark' ? 'white' : 'black'}
                      fontSize="md"
                      resize="none"
                      {...register('profile', { required: true })}
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    )
  );
}
