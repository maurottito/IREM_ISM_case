import { useMemo, useState } from 'react';
import { searchRows } from '../../data/mock';
import { StatusBadge } from '../../components/StatusBadge';
import type { CaseRecord } from '../../types';

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
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>
  </svg>
);

type PdrKey = 'pv' | 'pf' | 'neg' | 'inv';

const pdrChips: { key: PdrKey; label: string; color: string; result: CaseRecord['result'] }[] = [
  { key: 'pv', label: 'P. vivax', color: 'var(--species-vivax)', result: 'P. vivax' },
  { key: 'pf', label: 'P. falciparum', color: 'var(--species-falciparum)', result: 'P. falciparum' },
  { key: 'neg', label: 'Negativa', color: 'var(--status-negative-500)', result: 'Negativa' },
  { key: 'inv', label: 'Inválida', color: 'var(--neutral-500)', result: 'Inválida' },
];

const resultToKey: Record<string, PdrKey> = {
  'P. vivax': 'pv', 'P. falciparum': 'pf', 'Negativa': 'neg', 'Inválida': 'inv',
};

// Parse a "DD/MM/AA" record date into a comparable Date (assumes 20YY).
function parseRecDate(s: string): Date | null {
  const m = s.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (!m) return null;
  const d = +m[1], mo = +m[2] - 1;
  let y = +m[3];
  if (y < 100) y += 2000;
  return new Date(y, mo, d);
}

interface AppliedFilters {
  dateStart: string;
  dateEnd: string;
  localidad: string;
  colvolCode: string;
  nombre: string;
  pdr: Record<PdrKey, boolean>;
}

interface SearchPageProps {
  onToast: (msg: string) => void;
  validatedRows?: CaseRecord[];
}

export function SearchPage({ onToast, validatedRows = [] }: SearchPageProps) {
  const allRows = useMemo(() => [...validatedRows, ...searchRows], [validatedRows]);

  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [localidad, setLocalidad] = useState('Todas');
  const [colvolCode, setColvolCode] = useState('Todos');
  const [nombre, setNombre] = useState('');
  const [pdr, setPdr] = useState<Record<PdrKey, boolean>>({ pv: true, pf: true, neg: true, inv: true });

  // null = no search applied yet → show everything
  const [applied, setApplied] = useState<AppliedFilters | null>(null);
  const [email, setEmail] = useState('maurottito@gmail.com');
  const [sending, setSending] = useState(false);

  const toggle = (k: PdrKey) => setPdr((f) => ({ ...f, [k]: !f[k] }));

  const matchRow = (row: CaseRecord, f: AppliedFilters): boolean => {
    const key = resultToKey[row.result];
    if (key && !f.pdr[key]) return false;
    if (f.localidad !== 'Todas' && row.locality !== f.localidad) return false;
    if (f.colvolCode !== 'Todos' && row.colvolCode !== f.colvolCode) return false;
    if (f.nombre.trim() && !row.nombre.toLowerCase().includes(f.nombre.trim().toLowerCase())) return false;
    const rd = parseRecDate(row.date);
    if (f.dateStart && rd && rd < new Date(f.dateStart)) return false;
    if (f.dateEnd && rd && rd > new Date(f.dateEnd)) return false;
    return true;
  };

  const displayRows = useMemo(
    () => (applied ? allRows.filter((r) => matchRow(r, applied)) : allRows),
    [applied, allRows],
  );

  const totalRegistros = 128 + validatedRows.length;

  const runSearch = () => {
    setApplied({ dateStart, dateEnd, localidad, colvolCode, nombre, pdr });
    const count = allRows.filter((r) => matchRow(r, { dateStart, dateEnd, localidad, colvolCode, nombre, pdr })).length;
    onToast(`Se encontraron ${count} ${count === 1 ? 'registro' : 'registros'} que coinciden con los filtros`);
  };

  const clearFilters = () => {
    setDateStart(''); setDateEnd(''); setLocalidad('Todas'); setColvolCode('Todos'); setNombre('');
    setPdr({ pv: true, pf: true, neg: true, inv: true });
    setApplied(null);
  };

  // Build an Excel-compatible CSV (UTF-8 BOM so Excel keeps the tildes).
  const buildCsv = (): string => {
    const headers = ['Fecha toma', 'Cód. muestra', 'Localidad', 'ColVol', 'Código ColVol', 'Motivo', 'Nombre completo', 'Identificación', 'Nacionalidad', 'Sexo', 'Fecha nac.', 'PDR', 'Tipo de búsqueda', 'Medicamento'];
    const esc = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`;
    const lines = [headers.map(esc).join(',')];
    for (const r of displayRows) {
      lines.push([r.date, r.id, r.locality, r.colvol, r.colvolCode, r.motivo, r.nombre, r.ident, r.nacionalidad, r.sexo, r.fnac, r.result, r.searchType, r.medic].map((v) => esc(String(v))).join(','));
    }
    return '﻿' + lines.join('\r\n');
  };

  const fileName = `registros_malaria_${new Date().toISOString().slice(0, 10)}.csv`;

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
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      onToast('Ingresa un correo electrónico válido');
      return;
    }
    setSending(true);
    try {
      const csv = buildCsv();
      const resp = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email.trim(), filename: fileName, csvBase64: btoa(unescape(encodeURIComponent(csv))), count: displayRows.length }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        onToast(err.error || `No se pudo enviar el correo (${resp.status})`);
      } else {
        onToast(`Correo enviado a ${email.trim()} con ${displayRows.length} ${displayRows.length === 1 ? 'registro' : 'registros'} adjuntos`);
      }
    } catch (e) {
      onToast('Error de red al enviar el correo');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page-content full">
      <div>
        <div className="page-title">Búsqueda de registros</div>
        <div className="page-subtitle">Filtra el consolidado local y expórtalo a Excel o envíalo por correo</div>
      </div>

      <div className="panel filters-panel">
        <div className="alert alert-info" style={{ marginBottom: 16 }}>
          <strong>Todos los campos son opcionales</strong>
          <span>Deja los filtros vacíos para ver todos los registros, o combina los que necesites y pulsa «Buscar registros».</span>
        </div>
        <div className="filters-grid">
          <label className="filter-label">
            Fecha inicio
            <input type="date" className="filter-input" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
          </label>
          <label className="filter-label">
            Fecha fin
            <input type="date" className="filter-input" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
          </label>
          <label className="filter-label">
            Localidad
            <select className="filter-select" value={localidad} onChange={(e) => setLocalidad(e.target.value)}>
              <option>Todas</option>
              <option>Llorente</option>
              <option>Espriella</option>
              <option>Tumaco</option>
              <option>Chajal</option>
              <option>San Luis</option>
              <option>Candelillas</option>
              <option>Imbilí</option>
            </select>
          </label>
          <label className="filter-label">
            Colaborador (ColVol)
            <select className="filter-select" value={colvolCode} onChange={(e) => setColvolCode(e.target.value)}>
              <option value="Todos">Todos</option>
              <option value="ColVol-01">D. Angulo · ColVol-01</option>
              <option value="ColVol-02">R. Caicedo · ColVol-02</option>
              <option value="ColVol-03">L. Quiñones · ColVol-03</option>
              <option value="ColVol-04">M. Prado · ColVol-04</option>
            </select>
          </label>
          <label className="filter-label">
            Nombre
            <input className="filter-input" placeholder="Buscar por nombre…" value={nombre} onChange={(e) => setNombre(e.target.value)} />
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
          Mostrando <strong style={{ color: 'var(--text-strong)' }}>{displayRows.length}</strong> de <strong style={{ color: 'var(--text-strong)' }}>{totalRegistros}</strong> registros
          {applied && <span style={{ color: 'var(--text-faint)' }}> · filtros aplicados</span>}
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: 10, color: 'var(--text-faint)', display: 'flex' }}><MailIcon /></span>
            <input
              className="search-input"
              style={{ paddingLeft: 32, minWidth: 210 }}
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
              {displayRows.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ textAlign: 'center', padding: '32px 14px', color: 'var(--text-faint)' }}>
                    No hay registros que coincidan con los filtros seleccionados.
                  </td>
                </tr>
              ) : displayRows.map((row, i) => (
                <tr key={`${row.id}-${i}`} style={validatedRows.includes(row) ? { background: 'color-mix(in srgb, var(--green-500, #2f9e44) 8%, #fff)' } : undefined}>
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
