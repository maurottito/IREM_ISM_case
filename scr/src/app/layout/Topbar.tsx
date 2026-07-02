interface TopbarProps {
  title: string;
  description: string;
}

export function Topbar({ title, description }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="topbar-actions">
        <input className="search-input" placeholder="Buscar ID de caso…" />
        <button className="primary-button" type="button">Validar</button>
      </div>
    </header>
  );
}