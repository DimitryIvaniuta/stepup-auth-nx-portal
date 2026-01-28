import { createBrowserRouter, redirect } from 'react-router-dom';

import { AppLayout } from './ui/layout/AppLayout';
import { DashboardPage } from './ui/pages/DashboardPage';
import { RiskDecisionsPage } from './ui/pages/RiskDecisionsPage';
import { StepUpChallengesPage } from './ui/pages/StepUpChallengesPage';
import { OutboxPage } from './ui/pages/OutboxPage';
import { MonitoringEventsPage } from './ui/pages/MonitoringEventsPage';
import { LoginPage } from './ui/pages/LoginPage';
import { requireAuthLoader } from './state/requireAuthLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'login', element: <LoginPage /> },

      { path: 'risk/decisions', loader: requireAuthLoader, element: <RiskDecisionsPage /> },
      { path: 'risk/challenges', loader: requireAuthLoader, element: <StepUpChallengesPage /> },
      { path: 'ops/outbox', loader: requireAuthLoader, element: <OutboxPage /> },
      { path: 'ops/events', loader: requireAuthLoader, element: <MonitoringEventsPage /> },

      { path: '*', loader: async () => redirect('/') }
    ]
  }
]);
