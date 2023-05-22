import { IconButton } from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export function CustomBackButton({ path }: { path: string }) {
  const navigate = useNavigate();

  return (
    <IconButton
      bg="inherit"
      size="sm"
      aria-label="good-button"
      icon={<AiOutlineArrowLeft />}
      _focus={{ bg: 'inherit' }}
      _hover={{ bg: 'gray.300' }}
      onClick={() => navigate(path)}
    />
  );
}
