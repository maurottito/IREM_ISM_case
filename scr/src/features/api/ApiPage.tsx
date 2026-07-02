import { useState } from 'react';

const CodeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 9h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2z"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
  </svg>
);

const steps = [
  { t: 'Autentícate con tu clave', d: 'Incluye el encabezado Authorization: Bearer <API_KEY> en cada petición.' },
  { t: 'Consulta el endpoint de casos', d: 'GET /v1/cases con parámetros de región, distrito y rango de fechas.' },
  { t: 'Pagina y procesa', d: 'La respuesta es JSON paginado (200 registros/página) con datos anonimizados.' },
];

const endpoints = [
  { method: 'GET', path: '/v1/cases', desc: 'Casos individuales anonimizados' },
  { method: 'GET', path: '/v1/cases/summary', desc: 'Agregados por localidad y semana' },
  { method: 'GET', path: '/v1/localities', desc: 'Catálogo de territorios' },
];

const codeSnippet = `import requests

API = "https://api.rmei.org/v1/cases"
HEADERS = {"Authorization": "Bearer rmei_live_a3f9..."}

params = {
    "region": "narino",
    "district": "tumaco",
    "from": "2026-06-01",
    "to": "2026-06-30",
}

r = requests.get(API, headers=HEADERS, params=params)
data = r.json()          # datos anonimizados
print(len(data["results"]), "casos")`;

const anonRows = [
  { id: 'anon-a231', semana: '2026-W26', distrito: 'Tumaco', localidad: 'Llorente', motivo: 'Sospechoso', sexo: 'M', grupo: '25-34', pdr: 'P. falciparum', busqueda: 'Pasiva' },
  { id: 'anon-a232', semana: '2026-W26', distrito: 'Tumaco', localidad: 'Llorente', motivo: 'Conviviente', sexo: 'H', grupo: '35-44', pdr: 'Negativa', busqueda: 'Reactiva' },
  { id: 'anon-a233', semana: '2026-W26', distrito: 'Tumaco', localidad: 'Espriella', motivo: 'Sospechoso', sexo: 'M', grupo: '5-14', pdr: 'P. vivax', busqueda: 'Pasiva' },
  { id: 'anon-a234', semana: '2026-W26', distrito: 'Tumaco', localidad: 'Tumaco', motivo: 'Seguimiento', sexo: 'H', grupo: '25-34', pdr: 'Negativa', busqueda: 'Proactiva' },
  { id: 'anon-a235', semana: '2026-W26', distrito: 'Barbacoas', localidad: 'Chajal', motivo: 'Conviviente', sexo: 'M', grupo: '15-24', pdr: 'P. vivax', busqueda: 'Proactiva' },
  { id: 'anon-a236', semana: '2026-W26', distrito: 'Tumaco', localidad: 'San Luis', motivo: 'Sospechoso', sexo: 'H', grupo: '45-59', pdr: 'P. vivax', busqueda: 'Reactiva' },
];

interface ApiPageProps {
  onToast: (msg: string) => void;
}

export function ApiPage({ onToast }: ApiPageProps) {
  const [tab, setTab] = useState<'api' | 'manual'>('api');

  return (
    <div className="page-content">
      <div>
        <div className="page-title">Descarga de datos de vigilancia</div>
        <div className="page-subtitle">Accede al consolidado regional anonimizado vía API o descarga manual filtrada</div>
      </div>

      <div className="tab-switcher">
        <button type="button" className={`tab-btn${tab === 'api' ? ' active' : ' inactive'}`} onClick={() => setTab('api')}>
          <CodeIcon /> Uso de la API
        </button>
        <button type="button" className={`tab-btn${tab === 'manual' ? ' active' : ' inactive'}`} onClick={() => setTab('manual')}>
          <FilterIcon /> Filtro manual
        </button>
      </div>

      {tab === 'api' && (
        <div className="api-two-col" style={{ animation: 'slideUp .24s ease both' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="panel">
              <div style={{ height: 3, background: 'var(--blue-500)', margin: '-22px -22px 20px', borderRadius: '20px 20px 0 0' }} />
              <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-strong)', margin: '0 0 4px' }}>Pasos para consumir la API</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 16px' }}>Endpoint REST · datos anonimizados · actualización diaria</p>
              {steps.map((s, i) => (
                <div key={i} className="api-step">
                  <div className="api-step-num">{i + 1}</div>
                  <div>
                    <div className="api-step-title">{s.t}</div>
                    <div className="api-step-desc">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">ejemplo — Python (requests)</span>
                <button type="button" className="code-copy-btn" onClick={() => onToast('Fragmento de código copiado al portapapeles')}>
                  <CopyIcon /> Copiar
                </button>
              </div>
              <pre className="code-body">{codeSnippet}</pre>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="panel">
              <div className="api-section-label">Tu clave de API</div>
              <div className="api-key-wrap">
                <span className="api-key-val">rmei_live_a3f9•••••••••2b71</span>
                <button type="button" className="btn-icon" onClick={() => onToast('Clave de API copiada al portapapeles')}><CopyIcon /></button>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-faint)', margin: '9px 0 0' }}>Regenerada hace 12 días · Ámbito: solo lectura, Nariño</p>
            </div>

            <div className="panel">
              <div className="api-section-label">Endpoints disponibles</div>
              {endpoints.map((ep, i) => (
                <div key={i} className="endpoint-row">
                  <span className="method-tag">{ep.method}</span>
                  <span className="endpoint-path">{ep.path}</span>
                </div>
              ))}
            </div>

            <div className="alert alert-info">
              <strong>Datos anonimizados</strong>
              <span>Todos los registros de la API se entregan sin identificadores personales, conforme al protocolo de datos de la RMEI.</span>
            </div>

            <div className="panel">
              <div className="api-section-label">¿Necesitas datos no anonimizados?</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 14px' }}>
                El acceso a datos con identificadores personales requiere una solicitud formal y aprobación previa. Sigue estos pasos:
              </p>
              {[
                { t: 'Redacta la solicitud', d: 'Envía una solicitud al Departamento de Epidemiología del Ministerio de Salud.' },
                { t: 'Justifica el acceso', d: 'Indica claramente el porqué requieres acceso a los datos no anonimizados y el uso previsto.' },
                { t: 'Espera la respuesta', d: 'Tu solicitud será atendida en un plazo máximo de 30 días.' },
              ].map((s, i) => (
                <div key={i} className="api-step">
                  <div className="api-step-num">{i + 1}</div>
                  <div>
                    <div className="api-step-title">{s.t}</div>
                    <div className="api-step-desc">{s.d}</div>
                  </div>
                </div>
              ))}
              <div className="alert alert-warning">
                <strong>Solicitud a Epidemiología · MinSalud</strong>
                <span>Dirige tu solicitud al Departamento de Epidemiología del Ministerio de Salud justificando el motivo del acceso. La respuesta se emite en un plazo máximo de 30 días.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'manual' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'slideUp .24s ease both' }}>
          <div className="panel filters-panel">
            <div className="filters-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
              <label className="filter-label">
                Región
                <select className="filter-select">
                  <option>Nariño</option><option>Chocó</option><option>Cauca</option><option>Amazonas</option>
                </select>
              </label>
              <label className="filter-label">
                Distrito
                <select className="filter-select">
                  <option>Tumaco</option><option>Barbacoas</option><option>Roberto Payán</option><option>Todos</option>
                </select>
              </label>
              <label className="filter-label">
                Localidad
                <select className="filter-select">
                  <option>Todas</option><option>Llorente</option><option>Espriella</option><option>Chajal</option>
                </select>
              </label>
              <label className="filter-label">
                Periodo
                <select className="filter-select">
                  <option>Junio 2026</option><option>Q2 2026</option><option>Año 2026</option>
                </select>
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>Vista previa: <strong style={{ color: 'var(--text-strong)' }}>1.284</strong> registros anonimizados coinciden</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-outline" onClick={() => onToast('Descargando casos_narino_jun2026.csv (1.284 registros)')}>
                  <DownloadIcon /> CSV
                </button>
                <button type="button" className="btn btn-primary" onClick={() => onToast('Descargando casos_narino_jun2026.xlsx (1.284 registros)')}>
                  <DownloadIcon /> Descargar Excel
                </button>
              </div>
            </div>
          </div>

          <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)', fontSize: 13, fontWeight: 600, color: 'var(--text-strong)' }}>
              Vista previa del conjunto de datos <span style={{ fontWeight: 400, color: 'var(--text-faint)' }}>· sin identificadores personales</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Caso (anón.)</th><th>Sem. epi.</th><th>Distrito</th><th>Localidad</th>
                    <th>Motivo</th><th>Sexo</th><th>Grupo edad</th><th>PDR</th><th>Tipo de búsqueda</th>
                  </tr>
                </thead>
                <tbody>
                  {anonRows.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-strong)' }}>{r.id}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-muted)' }}>{r.semana}</td>
                      <td>{r.distrito}</td>
                      <td>{r.localidad}</td>
                      <td>{r.motivo}</td>
                      <td style={{ textAlign: 'center' }}>{r.sexo}</td>
                      <td>{r.grupo}</td>
                      <td>
                        <span className={`badge ${r.pdr === 'Negativa' ? 'badge-negative' : 'badge-positive'}`}>{r.pdr}</span>
                      </td>
                      <td>{r.busqueda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
