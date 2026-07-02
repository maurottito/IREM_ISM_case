import { navItems } from '../../data/mock';
import type { AppRoute } from '../../types';

interface SidebarProps {
  activeRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
}

export function Sidebar({ activeRoute, onRouteChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">ISM</div>
        <div>
          <h1>Vigilancia de malaria</h1>
          <p>RMEI · workspace</p>
        </div>
      </div>

      <nav className="nav-list" aria-label="Navegación principal">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === activeRoute ? 'nav-item active' : 'nav-item'}
            onClick={() => onRouteChange(item.id)}
          >
            <span>{item.label}</span>
            <small>{item.description}</small>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <strong>James Torres</strong>
          <span>Supervisor · Tumaco, Nariño</span>
        </div>
      </div>
    </aside>
  );
}