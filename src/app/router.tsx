import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import CenteredLoader from '../features/pages/CenteredLoader';

const UsersListPage = lazy(() => import('../features/pages/UsersListPage'));
const UserDetailsPage = lazy(() => import('../features/pages/UserDetailsPage'));
const NotFoundPage = lazy(() => import('../features/pages/NotFoundPage'));



export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CenteredLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<UsersListPage />} />
            <Route path="/users/:id" element={<UserDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
