export function SearchPage() {
  return (
    <article className="panel search-panel">
      <div className="hero-heading">
        <h3>Buscar y descargar</h3>
        <p>Filtra el consolidado local y expórtalo a Excel para seguimiento operativo.</p>
      </div>
      <div className="filters-grid">
        <label><span>Fecha inicio</span><input type="date" defaultValue="2026-06-01" /></label>
        <label><span>Fecha fin</span><input type="date" defaultValue="2026-06-30" /></label>
        <label><span>Localidad</span><input defaultValue="Tumaco" /></label>
        <label><span>Resultado</span><input defaultValue="Todos" /></label>
      </div>
      <div className="download-row">
        <span>Mostrando 24 de 128 registros</span>
        <button className="primary-button" type="button">Descargar Excel</button>
      </div>
    </article>
  );
}