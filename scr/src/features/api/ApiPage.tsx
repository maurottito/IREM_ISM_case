export function ApiPage() {
  return (
    <article className="panel api-panel">
      <div className="hero-heading">
        <h3>Descarga de datos de vigilancia</h3>
        <p>Acceso para especialistas mediante API o descarga manual filtrada.</p>
      </div>
      <pre>{`GET /v1/cases?region=narino&district=tumaco
Authorization: Bearer &lt;API_KEY&gt;`}</pre>
    </article>
  );
}