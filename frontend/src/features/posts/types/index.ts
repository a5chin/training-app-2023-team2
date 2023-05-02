import { User } from '@/features/users';

export type Post = {
  body: string;
  id: number;
  title: string;
  user: User;
};

export type Posts = Post[];
