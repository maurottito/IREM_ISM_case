import { useState } from 'react';
import { searchRows } from '../../data/mock';
import { StatusBadge } from '../../components/StatusBadge';

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>
  </svg>
);

type PdrKey = 'pv' | 'pf' | 'neg' | 'inv';

const pdrChips: { key: PdrKey; label: string; color: string }[] = [
  { key: 'pv', label: 'P. vivax', color: 'var(--species-vivax)' },
  { key: 'pf', label: 'P. falciparum', color: 'var(--species-falciparum)' },
  { key: 'neg', label: 'Negativa', color: 'var(--status-negative-500)' },
  { key: 'inv', label: 'Inválida', color: 'var(--neutral-500)' },
];

interface SearchPageProps {
  onToast: (msg: string) => void;
  extraRows?: boolean;
}

export function SearchPage({ onToast, extraRows = false }: SearchPageProps) {
  const [filters, setFilters] = useState<Record<PdrKey, boolean>>({ pv: true, pf: true, neg: false, inv: false });
  const allRows = extraRows ? [...searchRows, ...searchRows.slice(0, 2)] : searchRows;

  const toggle = (k: PdrKey) => setFilters((f) => ({ ...f, [k]: !f[k] }));

  return (
    <div className="page-content">
      <div>
        <div className="page-title">Búsqueda de registros</div>
        <div className="page-subtitle">Filtra el consolidado local y expórtalo a Excel para tu seguimiento</div>
      </div>

      <div className="panel filters-panel">
        <div className="filters-grid">
          <label className="filter-label">
            Fecha inicio
            <input type="date" className="filter-input" defaultValue="2026-06-01" />
          </label>
          <label className="filter-label">
            Fecha fin
            <input type="date" className="filter-input" defaultValue="2026-06-30" />
          </label>
          <label className="filter-label">
            Localidad
            <select className="filter-select">
              <option>Todas</option>
              <option>Llorente</option>
              <option>Espriella</option>
              <option>Tumaco</option>
              <option>Chajal</option>
              <option>San Luis</option>
            </select>
          </label>
          <label className="filter-label">
            Colaborador (ColVol)
            <select className="filter-select">
              <option>Todos</option>
              <option>D. Angulo · ColVol-01</option>
              <option>R. Caicedo · ColVol-02</option>
              <option>L. Quiñones · ColVol-03</option>
              <option>M. Prado · ColVol-04</option>
            </select>
          </label>
          <label className="filter-label">
            Nombre
            <input className="filter-input" placeholder="Buscar por nombre…" />
          </label>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="filter-section-label">Resultado del diagnóstico</div>
          <div className="chip-row">
            {pdrChips.map((chip) => {
              const on = filters[chip.key];
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
          <button type="button" className="btn btn-ghost">Limpiar</button>
          <button type="button" className="btn btn-primary" onClick={() => onToast(`Se encontraron ${allRows.length} registros que coinciden con los filtros`)}>
            <FilterIcon /> Buscar registros
          </button>
        </div>
      </div>

      <div className="section-row">
        <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: 0 }}>
          Mostrando <strong style={{ color: 'var(--text-strong)' }}>{allRows.length}</strong> de <strong style={{ color: 'var(--text-strong)' }}>{extraRows ? 134 : 128}</strong> registros
        </p>
        <button type="button" className="btn btn-outline" onClick={() => onToast(`Descargando registros_tumaco_jun2026.xlsx (${allRows.length} registros)`)}>
          <DownloadIcon /> Descargar Excel
        </button>
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Fecha toma</th>
                <th>Cód. muestra</th>
                <th>Localidad</th>
                <th>Colaborador (ColVol)</th>
                <th>Motivo</th>
                <th>Nombre completo</th>
                <th>Identificación</th>
                <th>Sexo</th>
                <th>PDR</th>
                <th>Tipo de búsqueda</th>
                <th>¿Medicamento?</th>
              </tr>
            </thead>
            <tbody>
              {allRows.map((row, i) => (
                <tr key={`${row.id}-${i}`}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-muted)' }}>{row.date}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--text-strong)' }}>{row.id}</td>
                  <td>{row.locality}</td>
                  <td>
                    <div style={{ fontSize: 13.5 }}>{row.colvol}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-faint)' }}>{row.colvolCode}</div>
                  </td>
                  <td>{row.motivo}</td>
                  <td>{row.nombre}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{row.ident}</td>
                  <td style={{ textAlign: 'center' }}>{row.sexo}</td>
                  <td><StatusBadge result={row.result} /></td>
                  <td>{row.searchType}</td>
                  <td>{row.medic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
