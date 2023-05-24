import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export function CustomBackButton({
  path,
  ...attributes
}: { path: string } & IconButtonProps) {
  const navigate = useNavigate();

  return (
    <IconButton
      bg="inherit"
      size="sm"
      icon={<AiOutlineArrowLeft />}
      _focus={{ bg: 'inherit' }}
      _hover={{ bg: 'gray.300' }}
      onClick={() => navigate(path)}
      {...attributes}
    />
  );
}
