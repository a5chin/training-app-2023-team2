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
      colors={['#272932', '#1D9BF0', '#E9D2F4', '#F05D5E']}
      as={Avatar}
      {...iconProps}
    />
  );
}
