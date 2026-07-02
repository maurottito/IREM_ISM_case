import { navItems } from '../../data/mock';
import type { AppRoute, UserRole, Identity } from '../../types';

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
  </svg>
);
const DashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>
  </svg>
);
const LoginIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/>
  </svg>
);

const iconMap: Record<AppRoute, React.ReactNode> = {
  upload: <UploadIcon />,
  search: <SearchIcon />,
  api: <DownloadIcon />,
  dashboard: <DashIcon />,
};

const allowedByRole: Record<UserRole, AppRoute[]> = {
  supervisor: ['upload', 'search', 'dashboard'],
  specialist: ['api', 'dashboard'],
  manager: ['dashboard'],
  guest: ['dashboard'],
};

const groupLabels = { supervisor: 'Supervisor', specialist: 'Especialista', consulta: 'Consulta' };

interface SidebarProps {
  activeRoute: AppRoute;
  role: UserRole;
  identity: Identity;
  onRouteChange: (route: AppRoute) => void;
  onLogout: () => void;
  onLogin: () => void;
}

export function Sidebar({ activeRoute, role, identity, onRouteChange, onLogout, onLogin }: SidebarProps) {
  const allowed = allowedByRole[role];

  const groups = ['supervisor', 'specialist', 'consulta'] as const;
  const groupedItems = groups
    .map((g) => ({ label: groupLabels[g], items: navItems.filter((n) => n.group === g && allowed.includes(n.id)) }))
    .filter((g) => g.items.length > 0);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo-ism-malaria-white.png" alt="ISM Malaria" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <div>
          <div className="sidebar-logo-text">Vigilancia de malaria</div>
          <div className="sidebar-logo-sub">RMEI · workspace</div>
        </div>
      </div>

      {groupedItems.map(({ label, items }) => (
        <div key={label}>
          <div className="nav-group-label">{label}</div>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item${item.id === activeRoute ? ' active' : ''}`}
              onClick={() => onRouteChange(item.id)}
            >
              {iconMap[item.id]}
              {item.label}
            </button>
          ))}
        </div>
      ))}

      <div className="nav-spacer" />

      <div className="sidebar-footer">
        {role === 'guest' ? (
          <>
            <p className="sidebar-guest-msg">Estás viendo el panel público. Inicia sesión para acceder a tus herramientas.</p>
            <button type="button" className="sidebar-login-btn" onClick={onLogin}>
              <LoginIcon /> Iniciar sesión
            </button>
          </>
        ) : (
          <div className="sidebar-user">
            <div className="avatar" style={{ background: identity.avatarBg }}>{identity.initials}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{identity.user}</div>
              <div className="sidebar-user-role">{identity.role}</div>
            </div>
            <button type="button" className="logout-btn" title="Cerrar sesión" onClick={onLogout}>
              <LogoutIcon />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
