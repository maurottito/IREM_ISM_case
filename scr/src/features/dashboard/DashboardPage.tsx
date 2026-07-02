const metrics = [
  { label: 'Casos confirmados', value: '1.284' },
  { label: 'Tasa de positividad', value: '12.4%' },
  { label: 'Localidades activas', value: '18' },
  { label: 'Registros en revisión', value: '6' },
];

export function DashboardPage() {
  return (
    <article className="panel dashboard-panel">
      <h3>Panel epidemiológico</h3>
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}