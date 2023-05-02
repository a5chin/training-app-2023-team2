import { useRoutes, RouteObject } from 'react-router-dom';

import { HelloWorld } from '@/features/helloworld';
import { PostsRoutes } from '@/features/posts';

export function AppRoutes() {
  const routes: RouteObject[] = [
    { path: '/', element: <HelloWorld /> },
    { path: '/posts', element: <PostsRoutes /> },
  ];

  const element = useRoutes([...routes]);

  return element;
}
