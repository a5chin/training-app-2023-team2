import { User } from '@/features/users';

export type Post = {
  id: number;
  title: string;
  body: string;
  user: User;
};

export type Posts = Post[];
