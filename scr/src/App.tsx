import { useMemo, useState } from 'react';
import { AppShell } from './app/layout/AppShell';
import { ApiPage } from './features/api/ApiPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { ReviewPage } from './features/review/ReviewPage';
import { SearchPage } from './features/search/SearchPage';
import { UploadPage } from './features/upload/UploadPage';
import { navItems } from './data/mock';
import type { AppRoute } from './types';

const routeViews: Record<AppRoute, string> = {
  upload: 'upload',
  review: 'review',
  search: 'search',
  api: 'api',
  dashboard: 'dashboard',
};

export default function App() {
  const [route, setRoute] = useState<AppRoute>('upload');
  const current = useMemo(() => navItems.find((item) => item.id === route) ?? navItems[0], [route]);

  return (
    <AppShell
      activeRoute={route}
      activeTitle={current.label}
      activeDescription={current.description}
      onRouteChange={setRoute}
    >
      {routeViews[route] === 'upload' && <UploadPage />}
      {routeViews[route] === 'review' && <ReviewPage />}
      {routeViews[route] === 'search' && <SearchPage />}
      {routeViews[route] === 'api' && <ApiPage />}
      {routeViews[route] === 'dashboard' && <DashboardPage />}
    </AppShell>
  );
}