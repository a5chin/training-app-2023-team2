import { useRoutes, RouteObject, Outlet, Navigate } from 'react-router-dom';

import { PostsRoutes } from '@/features/posts';
import { MainLayout } from '@/components/Layout/MainLayout';

function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export function AppRoutes() {
  const routes: RouteObject = {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/posts" />,
      },
      { path: '/posts/*', element: <PostsRoutes /> },
    ],
  };
  const element = useRoutes([routes]);

  return element;
}
