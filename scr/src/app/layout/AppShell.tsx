import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import type { AppRoute, UserRole, Identity } from '../../types';

interface AppShellProps {
  activeRoute: AppRoute;
  activeTitle: string;
  activeDescription: string;
  role: UserRole;
  identity: Identity;
  headerActions?: ReactNode;
  onRouteChange: (route: AppRoute) => void;
  onLogout: () => void;
  onLogin: () => void;
  children: ReactNode;
}

export function AppShell({
  activeRoute,
  activeTitle,
  activeDescription,
  role,
  identity,
  headerActions,
  onRouteChange,
  onLogout,
  onLogin,
  children,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar
        activeRoute={activeRoute}
        role={role}
        identity={identity}
        onRouteChange={onRouteChange}
        onLogout={onLogout}
        onLogin={onLogin}
      />
      <div className="main-area">
        <Topbar
          title={activeTitle}
          description={activeDescription}
          identity={identity}
          headerActions={headerActions}
        />
        {children}
      </div>
    </div>
  );
}
