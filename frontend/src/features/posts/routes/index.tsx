import { Navigate, Route, Routes } from 'react-router-dom';
import { Posts } from './Posts';
import { PostDetail } from './PostDetail';

export function PostsRoutes() {
  return (
    <Routes>
      <Route path="" element={<Posts />} />
      <Route path=":postId" element={<PostDetail />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}
