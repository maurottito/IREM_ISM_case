import type { ReactNode } from 'react';
import type { Identity } from '../../types';

interface TopbarProps {
  title: string;
  description: string;
  identity: Identity;
  headerActions?: ReactNode;
}

export function Topbar({ title, description, identity, headerActions }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-titles">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="topbar-right">
        {headerActions}
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
