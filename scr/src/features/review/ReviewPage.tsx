import { reviewRows } from '../../data/mock';

export function ReviewPage() {
  return (
    <article className="panel table-panel">
      <div className="hero-heading">
        <h3>Revisión y validación</h3>
        <p>Corrige los datos leídos desde las fotos antes de consolidar y sincronizar.</p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>ColVol</th>
              <th>Localidad</th>
              <th>Nombre</th>
              <th>Identificación</th>
              <th>Resultado</th>
              <th>Búsqueda</th>
              <th>Medicamento</th>
            </tr>
          </thead>
          <tbody>
            {reviewRows.map((row) => (
              <tr key={row.id} className={row.needsReview ? 'needs-review' : ''}>
                <td>{row.date}</td>
                <td>{row.colvol}</td>
                <td>{row.locality}</td>
                <td>{row.id}</td>
                <td>CC · pendiente</td>
                <td>{row.result}</td>
                <td>{row.searchType}</td>
                <td>{row.needsReview ? 'Revisar' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="panel-footnote">Los registros validados se sincronizan con el consolidado regional y quedan disponibles para especialistas y gerencia.</p>
    </article>
  );
}