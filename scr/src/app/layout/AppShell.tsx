import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import type { AppRoute } from '../../types';

interface AppShellProps {
  activeRoute: AppRoute;
  activeTitle: string;
  activeDescription: string;
  onRouteChange: (route: AppRoute) => void;
  children: ReactNode;
}

export function AppShell({
  activeRoute,
  activeTitle,
  activeDescription,
  onRouteChange,
  children,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar activeRoute={activeRoute} onRouteChange={onRouteChange} />
      <main className="main-area">
        <Topbar title={activeTitle} description={activeDescription} />
        <section className="content-grid">{children}</section>
      </main>
    </div>
  );
}