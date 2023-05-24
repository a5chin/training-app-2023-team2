import { User } from '@/features/users';
import { Entity_Post as PostType } from '@/aspida/@types';

// export type Post = {
//   id: string;
//   body: string;
//   user?: User;
//   is_my_favorite: boolean;
//   favorites_count: number;
// };
//
// export function IsPost(obj: any): obj is Post {
//   return (
//     'id' in obj &&
//     typeof obj.id === 'string' &&
//     'body' in obj &&
//     typeof obj.body === 'string' &&
//     'user' in obj &&
//     typeof obj.user === 'object' &&
//     'is_my_favorite' in obj &&
//     typeof obj.is_my_favorite === 'boolean' &&
//     'favorites_count' in obj &&
//     typeof obj.favorites_count === 'boolean'
//   );
// }

export class Post {
  id: string;

  body: string;

  user: User | undefined;

  isMyFavorite: boolean;

  favoritesCount: number;

  repliesCount: number;

  // eslint-disable-next-line no-use-before-define
  parent: Post | undefined;

  constructor(entity: PostType) {
    this.id = entity.id ? entity.id : '';
    this.body = entity.body ? entity.body : '';
    this.user = entity.user
      ? {
          id: entity.user.id ? entity.user.id : '',
          name: entity.user.name ? entity.user.name : '',
        }
      : undefined;
    this.isMyFavorite = entity.is_my_favorite ? entity.is_my_favorite : false;
    this.favoritesCount = entity.favorites_count ? entity.favorites_count : 0;
    this.parent = entity.parent ? new Post(entity.parent) : undefined;
    this.repliesCount = entity.replies_count ? entity.replies_count : 0;
  }
}

export type Posts = Post[];
