import { Icon, IconProps } from '@chakra-ui/react';
import Avatar, { AvatarProps } from 'boring-avatars';

export function UserIcon({
  name,
  ...iconProps
}: { name: string } & IconProps & AvatarProps) {
  return (
    <Icon
      name={name}
      variant="beam"
      colors={['#FF0092', '#FFCA1B', '#B6FF00', '#228DFF', '#BA01FF']}
      as={Avatar}
      {...iconProps}
    />
  );
}
