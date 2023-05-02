import { useRoutes, RouteObject, Outlet } from 'react-router-dom';

import { HelloWorld } from '@/features/helloworld';
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
      { path: '/', element: <HelloWorld /> },
      { path: '/posts', element: <PostsRoutes /> },
    ],
  };
  const element = useRoutes([routes]);

  return element;
}
