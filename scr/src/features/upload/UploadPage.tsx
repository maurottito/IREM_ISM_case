import { useState, useEffect } from 'react';
import { reviewRows } from '../../data/mock';
import { StatusBadge } from '../../components/StatusBadge';
import type { UploadStep } from '../../types';

const ScanIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/>
    <path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
    <path d="M7 12h10"/>
  </svg>
);
const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
  </svg>
);
const CameraIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);

interface UploadPageProps {
  onValidate: () => void;
}

export function UploadPage({ onValidate }: UploadPageProps) {
  const [step, setStep] = useState<UploadStep>('idle');

  useEffect(() => {
    if (step === 'processing') {
      const t = setTimeout(() => setStep('review'), 2000);
      return () => clearTimeout(t);
    }
  }, [step]);

  if (step === 'idle') {
    return (
      <div className="page-content">
        <div>
          <div className="page-title">Cargar registros de diagnóstico</div>
          <div className="page-subtitle">Sube los formatos PDR digitalizados de tus colaboradores voluntarios</div>
        </div>
        <div className="alert alert-info">
          <strong>Digitaliza el Registro de pruebas diagnósticas</strong>
          <span>Sube las fotos del formato «Registro de pruebas diagnósticas» (Anexo 1). El sistema lee las fotos y llena una tabla por ti — solo revisa, corrige y valida antes de subir.</span>
        </div>
        <div className="panel" style={{ padding: 26 }}>
          <div className="upload-dropzone">
            <div className="upload-icon-wrap"><ScanIcon /></div>
            <div>
              <p className="upload-title">Arrastra aquí las fotos de los registros</p>
              <p className="upload-sub">Toma una foto o sube la imagen del formato PDR en papel — el sistema lee los datos y los llena por ti</p>
              <p className="upload-hint">Formatos aceptados: <code>.jpg</code> · <code>.png</code> · <code>.pdf</code></p>
            </div>
            <div className="upload-actions">
              <button type="button" className="btn btn-primary" onClick={() => setStep('processing')}>
                <FolderIcon /> Explorar imágenes
              </button>
              <button type="button" className="btn btn-outline" onClick={() => setStep('processing')}>
                <CameraIcon /> Tomar foto
              </button>
            </div>
            <p className="upload-hint">Máximo 50 imágenes por carga · Última carga hace 4 días</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="page-content">
        <div>
          <div className="page-title">Cargar registros de diagnóstico</div>
          <div className="page-subtitle">Procesando las fotos…</div>
        </div>
        <div className="panel upload-processing">
          <div className="spinner" />
          <div>
            <p className="upload-title">Leyendo las fotos…</p>
            <p className="upload-sub" style={{ maxWidth: 480 }}>
              Estamos leyendo <strong>8 fotos</strong> del formato «Registro de pruebas diagnósticas» y llenando la tabla con la fecha de toma, la localidad, el motivo, el nombre, la identificación, el resultado PDR y el tipo de búsqueda.
            </p>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>Procesando… no cierres esta ventana</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content" style={{ maxWidth: 1400 }}>
      <div>
        <div className="page-title">Cargar registros de diagnóstico</div>
        <div className="page-subtitle">Revisa los datos extraídos y valida antes de consolidar</div>
      </div>
      <div className="alert alert-success">
        <strong>Listo — la tabla se llenó con las fotos</strong>
        <span>Se leyeron <strong>42 registros</strong> de <strong>8 fotos</strong> del corregimiento de Llorente. Revisa los datos y corrige cualquier error antes de validar.</span>
      </div>
      <div className="section-row">
        <div>
          <p style={{ fontWeight: 700, fontSize: 17, color: 'var(--text-strong)', margin: 0 }}>Revisa y corrige los datos</p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '2px 0 0' }}>Mostrando 6 de 42 registros leídos de las fotos · 1 requiere atención</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="btn btn-outline" onClick={() => setStep('idle')}>Subir más imágenes</button>
          <button type="button" className="btn btn-primary" onClick={onValidate}>
            <CheckIcon /> Validar registros
          </button>
        </div>
      </div>
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Fecha toma</th>
                <th>ColVol</th>
                <th>Cód. muestra</th>
                <th>Localidad</th>
                <th>Motivo</th>
                <th>Nombre completo</th>
                <th>Identificación</th>
                <th>Nacionalidad</th>
                <th>Sexo</th>
                <th>Fecha nac.</th>
                <th>PDR</th>
                <th>Tipo de búsqueda</th>
                <th>¿Medicamento?</th>
              </tr>
            </thead>
            <tbody>
              {reviewRows.map((row) => (
                <tr key={row.id} className={row.needsReview ? 'flag-row' : ''}>
                  <td><input className="rev-input" defaultValue={row.date} style={{ width: 88, fontFamily: 'var(--font-mono)', fontSize: 12.5 }} /></td>
                  <td>
                    <input className="rev-input" defaultValue={row.colvol} style={{ marginBottom: 2 }} />
                    <input className="rev-input" defaultValue={row.colvolCode} style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5 }} />
                  </td>
                  <td><input className="rev-input" defaultValue={row.id} style={{ width: 100, fontFamily: 'var(--font-mono)', fontSize: 12.5 }} /></td>
                  <td><input className="rev-input" defaultValue={row.locality} /></td>
                  <td>
                    <select className="rev-select" defaultValue={row.motivo}>
                      <option>Sospechoso</option>
                      <option>Conviviente</option>
                      <option>Seguimiento</option>
                    </select>
                  </td>
                  <td><input className="rev-input" defaultValue={row.nombre} /></td>
                  <td><input className="rev-input" defaultValue={row.ident} style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }} /></td>
                  <td><input className="rev-input" defaultValue={row.nacionalidad} /></td>
                  <td>
                    <select className="rev-select" defaultValue={row.sexo} style={{ width: 62 }}>
                      <option>M</option>
                      <option>H</option>
                    </select>
                  </td>
                  <td><input className="rev-input" defaultValue={row.fnac} style={{ width: 100, fontFamily: 'var(--font-mono)', fontSize: 12.5 }} /></td>
                  <td>
                    {row.needsReview ? (
                      <select className="rev-select warn-select" defaultValue="">
                        <option value="" disabled>⚠ Seleccionar…</option>
                        <option>P. vivax</option>
                        <option>P. falciparum</option>
                        <option>Negativa</option>
                        <option>Inválida</option>
                      </select>
                    ) : (
                      <StatusBadge result={row.result} />
                    )}
                  </td>
                  <td>
                    <select className="rev-select" defaultValue={row.searchType}>
                      <option>Pasiva</option>
                      <option>Proactiva</option>
                      <option>Reactiva</option>
                    </select>
                  </td>
                  <td><input className="rev-input" defaultValue={row.medic} style={{ width: 110 }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--text-faint)' }}>Los registros validados se sincronizan con el consolidado regional y quedan disponibles para especialistas y gerentes.</p>
    </div>
  );
}
