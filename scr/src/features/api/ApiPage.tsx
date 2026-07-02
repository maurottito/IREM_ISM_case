export function ApiPage() {
  return (
    <article className="panel api-panel">
      <h3>Acceso para especialistas</h3>
      <p>Datos anonimizados, filtros por región y descarga para análisis estadístico.</p>
      <pre>{`GET /v1/cases?region=narino&district=tumaco
Authorization: Bearer &lt;API_KEY&gt;`}</pre>
    </article>
  );
}