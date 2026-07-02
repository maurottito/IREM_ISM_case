import type { Identity } from '../../types';

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
  </svg>
);

interface TopbarProps {
  title: string;
  description: string;
  showSearch?: boolean;
  identity: Identity;
}

export function Topbar({ title, description, showSearch = true, identity }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-titles">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="topbar-right">
        {showSearch && (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: 10, color: 'var(--text-faint)', display: 'flex' }}><SearchIcon /></span>
            <input className="search-input" style={{ paddingLeft: 32 }} placeholder="Buscar ID de caso…" />
          </div>
        )}
        <div className="topbar-identity">
          <div>
            <div className="topbar-user-name">{identity.user}</div>
            <div className="topbar-user-role">{identity.role}</div>
          </div>
          <div className="avatar" style={{ background: identity.avatarBg, width: 36, height: 36, fontSize: 13 }}>
            {identity.initials}
          </div>
        </div>
      </div>
    </header>
  );
}
