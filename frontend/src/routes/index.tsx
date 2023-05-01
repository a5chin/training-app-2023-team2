import { useRoutes, RouteObject } from 'react-router-dom';

import { HelloWorld } from '@/features/helloworld';

export function AppRoutes() {
  const routes: RouteObject[] = [{ path: '/', element: <HelloWorld /> }];

  const element = useRoutes([...routes]);

  return element;
}
