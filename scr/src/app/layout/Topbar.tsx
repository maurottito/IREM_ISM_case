interface TopbarProps {
  title: string;
  description: string;
  showSearch?: boolean;
  actionLabel?: string;
}

export function Topbar({ title, description, showSearch = true, actionLabel = 'Validar' }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="topbar-actions">
        {showSearch ? <input className="search-input" placeholder="Buscar ID de caso…" /> : null}
        <button className="primary-button" type="button">{actionLabel}</button>
      </div>
    </header>
  );
}