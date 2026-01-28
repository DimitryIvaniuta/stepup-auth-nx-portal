import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './ui/layout/AppShell';
import { LoginPage } from './ui/pages/LoginPage';
import { AuthorizePage } from './ui/pages/AuthorizePage';
import { VerifyPage } from './ui/pages/VerifyPage';
import { HistoryPage } from './ui/pages/HistoryPage';

/**
 * End-user router.
 */
export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <AuthorizePage /> },
      { path: 'verify/:challengeId', element: <VerifyPage /> },
      { path: 'history', element: <HistoryPage /> }
    ]
  }
]);
