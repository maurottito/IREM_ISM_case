import { useMemo, useState } from 'react';

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
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>
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

interface AnonRow {
  id: string; semana: string; distrito: string; localidad: string;
  motivo: string; sexo: string; grupo: string; pdr: string; busqueda: string;
}

const anonRows: AnonRow[] = [
  { id: 'anon-a231', semana: '2026-W26', distrito: 'Tumaco', localidad: 'Llorente', motivo: 'Sospechoso', sexo: 'M', grupo: '25-34', pdr: 'P. falciparum', busqueda: 'Pasiva' },
  { id: 'anon-a232', semana: '2026-W26', distrito: 'Tumaco', localidad: 'Llorente', motivo: 'Conviviente', sexo: 'H', grupo: '35-44', pdr: 'Negativa', busqueda: 'Reactiva' },
  { id: 'anon-a233', semana: '2026-W26', distrito: 'Tumaco', localidad: 'Espriella', motivo: 'Sospechoso', sexo: 'M', grupo: '5-14', pdr: 'P. vivax', busqueda: 'Pasiva' },
  { id: 'anon-a234', semana: '2026-W26', distrito: 'Tumaco', localidad: 'Tumaco', motivo: 'Seguimiento', sexo: 'H', grupo: '25-34', pdr: 'Negativa', busqueda: 'Proactiva' },
  { id: 'anon-a235', semana: '2026-W26', distrito: 'Barbacoas', localidad: 'Chajal', motivo: 'Conviviente', sexo: 'M', grupo: '15-24', pdr: 'P. vivax', busqueda: 'Proactiva' },
  { id: 'anon-a236', semana: '2026-W26', distrito: 'Tumaco', localidad: 'San Luis', motivo: 'Sospechoso', sexo: 'H', grupo: '45-59', pdr: 'P. vivax', busqueda: 'Reactiva' },
];

type PdrKey = 'pv' | 'pf' | 'neg';
const pdrChips: { key: PdrKey; label: string; color: string; pdr: string }[] = [
  { key: 'pv', label: 'P. vivax', color: 'var(--species-vivax)', pdr: 'P. vivax' },
  { key: 'pf', label: 'P. falciparum', color: 'var(--species-falciparum)', pdr: 'P. falciparum' },
  { key: 'neg', label: 'Negativa', color: 'var(--status-negative-500)', pdr: 'Negativa' },
];
const pdrToKey: Record<string, PdrKey> = { 'P. vivax': 'pv', 'P. falciparum': 'pf', 'Negativa': 'neg' };

interface ManualFilters {
  distrito: string; localidad: string; motivo: string; busqueda: string; pdr: Record<PdrKey, boolean>;
}

interface ApiPageProps {
  onToast: (msg: string) => void;
  userEmail: string;
}

export function ApiPage({ onToast, userEmail }: ApiPageProps) {
  const [tab, setTab] = useState<'api' | 'manual'>('api');

  const [distrito, setDistrito] = useState('Todos');
  const [localidad, setLocalidad] = useState('Todas');
  const [motivo, setMotivo] = useState('Todos');
  const [busqueda, setBusqueda] = useState('Todas');
  const [pdr, setPdr] = useState<Record<PdrKey, boolean>>({ pv: true, pf: true, neg: true });
  const [applied, setApplied] = useState<ManualFilters | null>(null);
  const [sending, setSending] = useState(false);

  const toggle = (k: PdrKey) => setPdr((f) => ({ ...f, [k]: !f[k] }));

  const matchRow = (r: AnonRow, f: ManualFilters): boolean => {
    const key = pdrToKey[r.pdr];
    if (key && !f.pdr[key]) return false;
    if (f.distrito !== 'Todos' && r.distrito !== f.distrito) return false;
    if (f.localidad !== 'Todas' && r.localidad !== f.localidad) return false;
    if (f.motivo !== 'Todos' && r.motivo !== f.motivo) return false;
    if (f.busqueda !== 'Todas' && r.busqueda !== f.busqueda) return false;
    return true;
  };

  const displayRows = useMemo(
    () => (applied ? anonRows.filter((r) => matchRow(r, applied)) : anonRows),
    [applied],
  );

  const runSearch = () => {
    const f = { distrito, localidad, motivo, busqueda, pdr };
    setApplied(f);
    const count = anonRows.filter((r) => matchRow(r, f)).length;
    onToast(`Se encontraron ${count} ${count === 1 ? 'registro' : 'registros'} anonimizados que coinciden`);
  };

  const clearFilters = () => {
    setDistrito('Todos'); setLocalidad('Todas'); setMotivo('Todos'); setBusqueda('Todas');
    setPdr({ pv: true, pf: true, neg: true });
    setApplied(null);
  };

  const buildCsv = (): string => {
    const headers = ['Caso (anón.)', 'Semana epi.', 'Distrito', 'Localidad', 'Motivo', 'Sexo', 'Grupo edad', 'PDR', 'Tipo de búsqueda'];
    const esc = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`;
    const lines = [headers.map(esc).join(',')];
    for (const r of displayRows) {
      lines.push([r.id, r.semana, r.distrito, r.localidad, r.motivo, r.sexo, r.grupo, r.pdr, r.busqueda].map((v) => esc(String(v))).join(','));
    }
    return '﻿' + lines.join('\r\n');
  };

  const fileName = `casos_anonimizados_${new Date().toISOString().slice(0, 10)}.csv`;

  const downloadExcel = () => {
    const blob = new Blob([buildCsv()], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = fileName;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    onToast(`Descargando ${fileName} (${displayRows.length} ${displayRows.length === 1 ? 'registro' : 'registros'})`);
  };

  const sendEmail = async () => {
    setSending(true);
    try {
      const csv = buildCsv();
      const resp = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: userEmail, filename: fileName, csvBase64: btoa(unescape(encodeURIComponent(csv))), count: displayRows.length }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        onToast(err.error || `No se pudo enviar el correo (${resp.status})`);
      } else {
        onToast(`Correo enviado a ${userEmail} con ${displayRows.length} ${displayRows.length === 1 ? 'registro' : 'registros'} adjuntos`);
      }
    } catch {
      onToast('Error de red al enviar el correo');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page-content full">
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
            <div className="alert alert-info" style={{ marginBottom: 16 }}>
              <strong>Todos los campos son opcionales</strong>
              <span>Deja los filtros vacíos para ver todo el conjunto anonimizado, o combina los que necesites y pulsa «Buscar registros».</span>
            </div>
            <div className="filters-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
              <label className="filter-label">
                Distrito
                <select className="filter-select" value={distrito} onChange={(e) => setDistrito(e.target.value)}>
                  <option>Todos</option><option>Tumaco</option><option>Barbacoas</option><option>Roberto Payán</option>
                </select>
              </label>
              <label className="filter-label">
                Localidad
                <select className="filter-select" value={localidad} onChange={(e) => setLocalidad(e.target.value)}>
                  <option>Todas</option><option>Llorente</option><option>Espriella</option><option>Tumaco</option><option>Chajal</option><option>San Luis</option>
                </select>
              </label>
              <label className="filter-label">
                Motivo
                <select className="filter-select" value={motivo} onChange={(e) => setMotivo(e.target.value)}>
                  <option>Todos</option><option>Sospechoso</option><option>Conviviente</option><option>Seguimiento</option>
                </select>
              </label>
              <label className="filter-label">
                Tipo de búsqueda
                <select className="filter-select" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}>
                  <option>Todas</option><option>Pasiva</option><option>Proactiva</option><option>Reactiva</option>
                </select>
              </label>
            </div>

            <div style={{ marginTop: 18 }}>
              <div className="filter-section-label">Resultado del diagnóstico</div>
              <div className="chip-row">
                {pdrChips.map((chip) => {
                  const on = pdr[chip.key];
                  return (
                    <button
                      key={chip.key}
                      type="button"
                      className="pdr-chip"
                      onClick={() => toggle(chip.key)}
                      style={{
                        borderColor: on ? chip.color : 'var(--border-default)',
                        background: on ? `color-mix(in srgb, ${chip.color} 12%, #fff)` : '#fff',
                        color: on ? 'var(--text-strong)' : 'var(--text-muted)',
                      }}
                    >
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: on ? chip.color : 'var(--border-default)', flexShrink: 0, display: 'inline-block' }} />
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="filters-footer">
              <button type="button" className="btn btn-ghost" onClick={clearFilters}>Limpiar</button>
              <button type="button" className="btn btn-primary" onClick={runSearch}>
                <FilterIcon /> Buscar registros
              </button>
            </div>
          </div>

          <div className="section-row">
            <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: 0 }}>
              Mostrando <strong style={{ color: 'var(--text-strong)' }}>{displayRows.length}</strong> registros anonimizados
              {applied && <span style={{ color: 'var(--text-faint)' }}> · filtros aplicados</span>}
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <div className="email-chip" title="El correo se enviará a tu cuenta">
                <MailIcon />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                  <span style={{ fontSize: 10, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '.03em' }}>Se enviará a</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-strong)' }}>{userEmail}</span>
                </div>
              </div>
              <button type="button" className="btn btn-outline" onClick={sendEmail} disabled={sending}>
                <MailIcon /> {sending ? 'Enviando…' : 'Enviar por correo'}
              </button>
              <button type="button" className="btn btn-primary" onClick={downloadExcel}>
                <DownloadIcon /> Descargar Excel
              </button>
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
                  {displayRows.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', padding: '32px 14px', color: 'var(--text-faint)' }}>
                        No hay registros que coincidan con los filtros seleccionados.
                      </td>
                    </tr>
                  ) : displayRows.map((r) => (
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
