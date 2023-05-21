import { User } from '@/features/users';

export type Post = {
  id: string;
  body: string;
  user: User;
};

export function IsPost(obj: any): obj is Post {
  return (
    'id' in obj &&
    typeof obj.id === 'string' &&
    'body' in obj &&
    typeof obj.body === 'string' &&
    'user' in obj &&
    typeof obj.user === 'object'
  );
}

export type Posts = Post[];
