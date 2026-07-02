import { reviewRows } from '../../data/mock';

export function ReviewPage() {
  return (
    <article className="panel table-panel">
      <h3>Revisión y validación</h3>
      <p>Tabla editable para corregir campos antes de consolidar.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>ColVol</th>
              <th>Localidad</th>
              <th>Resultado</th>
              <th>Búsqueda</th>
            </tr>
          </thead>
          <tbody>
            {reviewRows.map((row) => (
              <tr key={row.id} className={row.needsReview ? 'needs-review' : ''}>
                <td>{row.date}</td>
                <td>{row.colvol}</td>
                <td>{row.locality}</td>
                <td>{row.result}</td>
                <td>{row.searchType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}