import { Navigate, Route, Routes } from 'react-router-dom';

import { Posts } from './Posts';

export function PostsRoutes() {
  return (
    <Routes>
      <Route path="" element={<Posts />} />
      {/* <Route path=":id" element={<Post />} /> */}
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}
