import { useState } from 'react';
import { COLOMBIA_DEPTS } from '../../data/colombia-departments';
import { regionData, incidenceData, positivityData, incidenceYear, positivityYear } from '../../data/mock';

// ── SVG line chart ──────────────────────────────────────────────
function LineChart({ data, max, color, id }: { data: { l: string; v: number; hi?: boolean }[]; max: number; color: string; id: string }) {
  const W = 380, H = 150, pl = 30, pr = 8, pt = 10, pb = 22;
  const xs = (i: number) => pl + (i / (data.length - 1)) * (W - pl - pr);
  const ys = (v: number) => pt + (1 - v / max) * (H - pt - pb);
  const pts = data.map((d, i) => [xs(i), ys(d.v)]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${line} L${xs(data.length - 1).toFixed(1)},${H - pb} L${pl},${H - pb} Z`;
  const gid = `grad-${id}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.22} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((f, i) => {
        const y = pt + f * (H - pt - pb);
        return (
          <g key={i}>
            <line x1={pl} y1={y} x2={W - pr} y2={y} stroke="var(--border-subtle)" strokeWidth={1} />
            <text x={pl - 6} y={y + 3} textAnchor="end" style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, fill: 'var(--text-faint)' }}>
              {Math.round(max * (1 - f) * 10) / 10}
            </text>
          </g>
        );
      })}
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => d.hi ? <circle key={i} cx={pts[i][0]} cy={pts[i][1]} r={3.5} fill="#fff" stroke={color} strokeWidth={2} /> : null)}
      {data.map((d, i) => i % 2 === 0 ? (
        <text key={`t${i}`} x={xs(i)} y={H - 6} textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: 'var(--text-faint)' }}>{d.l}</text>
      ) : null)}
    </svg>
  );
}

// ── Age/sex bar chart ────────────────────────────────────────────
function AgeSexChart() {
  const data = [
    { l: '0-4', m: 6, h: 8 }, { l: '5-14', m: 22, h: 19 }, { l: '15-24', m: 41, h: 33 },
    { l: '25-34', m: 58, h: 44 }, { l: '35-44', m: 47, h: 39 }, { l: '45-59', m: 28, h: 24 }, { l: '60+', m: 12, h: 9 },
  ];
  const W = 400, H = 190, pl = 30, pr = 8, pt = 10, pb = 26, max = 60;
  const plotW = W - pl - pr, plotH = H - pt - pb;
  const groupW = plotW / data.length, barW = groupW * 0.32, gap = groupW * 0.06;
  const ys = (v: number) => pt + (1 - v / max) * plotH;
  const cMuj = 'var(--green-500)', cHom = 'var(--blue-500)';
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {[0, 0.5, 1].map((fr, i) => {
          const y = pt + fr * plotH;
          return (
            <g key={i}>
              <line x1={pl} y1={y} x2={W - pr} y2={y} stroke="var(--border-subtle)" strokeWidth={1} />
              <text x={pl - 6} y={y + 3} textAnchor="end" style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, fill: 'var(--text-faint)' }}>{Math.round(max * (1 - fr))}</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const gx = pl + i * groupW + groupW / 2;
          return (
            <g key={i}>
              <rect x={gx - barW - gap} y={ys(d.m)} width={barW} height={(H - pb) - ys(d.m)} rx={3} fill={cMuj} />
              <rect x={gx + gap} y={ys(d.h)} width={barW} height={(H - pb) - ys(d.h)} rx={3} fill={cHom} />
              <text x={gx} y={H - 8} textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, fill: 'var(--text-faint)' }}>{d.l}</text>
            </g>
          );
        })}
      </svg>
      <div className="chart-legend">
        <span className="chart-legend-item"><span className="chart-legend-dot" style={{ background: cMuj }} /> Mujeres (M)</span>
        <span className="chart-legend-item"><span className="chart-legend-dot" style={{ background: cHom }} /> Hombres (H)</span>
      </div>
    </div>
  );
}

// ── PDR/búsqueda stacked bar chart ───────────────────────────────
function PdrBusquedaChart() {
  const cats = [
    { k: 'vivax' as const, label: 'P. vivax', color: 'var(--species-vivax)' },
    { k: 'falc' as const, label: 'P. falciparum', color: 'var(--species-falciparum)' },
    { k: 'neg' as const, label: 'Negativa', color: 'var(--status-negative-500)' },
    { k: 'inv' as const, label: 'Inválida', color: 'var(--neutral-400)' },
  ];
  const data: { l: string; vivax: number; falc: number; neg: number; inv: number }[] = [
    { l: 'Pasiva', vivax: 120, falc: 40, neg: 260, inv: 12 },
    { l: 'Proactiva', vivax: 80, falc: 25, neg: 150, inv: 8 },
    { l: 'Reactiva', vivax: 60, falc: 30, neg: 90, inv: 5 },
  ];
  const W = 400, H = 190, pl = 34, pr = 8, pt = 10, pb = 26, max = 440;
  const plotW = W - pl - pr, plotH = H - pt - pb;
  const groupW = plotW / data.length, barW = groupW * 0.44;
  const ys = (v: number) => pt + (1 - v / max) * plotH;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {[0, 0.5, 1].map((fr, i) => {
          const y = pt + fr * plotH;
          return (
            <g key={i}>
              <line x1={pl} y1={y} x2={W - pr} y2={y} stroke="var(--border-subtle)" strokeWidth={1} />
              <text x={pl - 6} y={y + 3} textAnchor="end" style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, fill: 'var(--text-faint)' }}>{Math.round(max * (1 - fr))}</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const gx = pl + i * groupW + groupW / 2 - barW / 2;
          let acc = 0;
          return (
            <g key={i}>
              {cats.map((c, j) => {
                const v = d[c.k]; const y0 = ys(acc); const y1 = ys(acc + v); acc += v;
                return <rect key={j} x={gx} y={y1} width={barW} height={y0 - y1} fill={c.color} />;
              })}
              <text x={gx + barW / 2} y={H - 8} textAnchor="middle" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, fill: 'var(--text-muted)' }}>{d.l}</text>
            </g>
          );
        })}
      </svg>
      <div className="chart-legend">
        {cats.map((c, i) => (
          <span key={i} className="chart-legend-item"><span className="chart-legend-dot" style={{ background: c.color }} /> {c.label}</span>
        ))}
      </div>
    </div>
  );
}

// ── Colombia SVG map ─────────────────────────────────────────────
function ColombiaMap({ selected }: { selected: string }) {
  const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim();
  const selNorm = norm(selected);
  return (
    <svg
      viewBox={`0 0 ${COLOMBIA_DEPTS.w} ${COLOMBIA_DEPTS.h}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ height: '100%', width: '100%', display: 'block', overflow: 'visible' }}
    >
      {COLOMBIA_DEPTS.deps.map((dep) => {
        const active = norm(dep.name) === selNorm;
        return (
          <path
            key={dep.name}
            d={dep.d}
            fill={active ? 'var(--green-500)' : 'var(--neutral-100)'}
            stroke={active ? 'var(--green-700)' : 'var(--border-default)'}
            strokeWidth={active ? 2 : 1}
            strokeLinejoin="round"
            style={active ? { filter: 'drop-shadow(0 3px 8px rgba(146,191,78,0.4))' } : undefined}
          />
        );
      })}
    </svg>
  );
}

// ── Choropleth of local zones ────────────────────────────────────
const choroplethZones = [
  { n: 'Llorente', c: 62, path: 'M250,40 L340,55 L360,120 L300,160 L235,130 L230,75 Z' },
  { n: 'Espriella', c: 48, path: 'M150,70 L230,75 L235,130 L180,165 L120,135 L120,90 Z' },
  { n: 'Tumaco', c: 71, path: 'M60,140 L120,135 L180,165 L165,235 L95,255 L45,205 Z' },
  { n: 'San Luis', c: 33, path: 'M180,165 L235,130 L300,160 L290,225 L230,250 L165,235 Z' },
  { n: 'Chajal', c: 55, path: 'M300,160 L360,120 L395,175 L360,240 L290,225 Z' },
  { n: 'Candelillas', c: 24, path: 'M95,255 L165,235 L230,250 L215,315 L140,330 L85,295 Z' },
  { n: 'Imbilí', c: 40, path: 'M230,250 L290,225 L360,240 L350,305 L280,325 L215,315 Z' },
];
const colorScale = ['#EAF3DC', '#C9E29B', '#92BF4E', '#E69A29', '#D64545'];
const bucket = (c: number) => c >= 60 ? 4 : c >= 45 ? 3 : c >= 30 ? 2 : c >= 15 ? 1 : 0;

function Choropleth() {
  return (
    <div>
      <svg viewBox="0 0 420 360" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {choroplethZones.map((z, i) => {
          const fill = colorScale[bucket(z.c)];
          const nums = z.path.match(/[\d.]+/g)!.map(Number);
          let sx = 0, sy = 0, n = 0;
          for (let k = 0; k < nums.length; k += 2) { sx += nums[k]; sy += nums[k + 1]; n++; }
          const cx = sx / n, cy = sy / n;
          const dark = bucket(z.c) >= 3;
          return (
            <g key={i}>
              <path d={z.path} fill={fill} stroke="#fff" strokeWidth={2} />
              <text x={cx} y={cy - 2} textAnchor="middle" style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, fill: dark ? '#fff' : 'var(--neutral-800)' }}>{z.n}</text>
              <text x={cx} y={cy + 14} textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, fill: dark ? 'rgba(255,255,255,.9)' : 'var(--neutral-600)' }}>{z.c}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, justifyContent: 'center' }}>
        <span style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>Menos casos</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {colorScale.map((c, i) => <span key={i} style={{ width: 26, height: 10, background: c, borderRadius: 2, display: 'inline-block' }} />)}
        </div>
        <span style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>Más casos</span>
      </div>
    </div>
  );
}

// ── StatCard · totales nacionales (Colombia) ─────────────────────
const statCards = [
  { label: 'Casos confirmados', value: '6.842', delta: '+7.4%', trend: 'up' },
  { label: 'Tasa de positividad', value: '11.8%', delta: '-0.9%', trend: 'down' },
  { label: 'Casos por 1.000 hab', value: '2.9', delta: '+0.3', trend: 'up' },
  { label: 'Localidades activas', value: '110', delta: 'de 180', trend: 'flat' },
];

const regionOptions = ['Nariño', 'Chocó', 'Cauca', 'Valle del Cauca', 'Antioquia', 'Córdoba', 'Amazonas', 'Putumayo', 'Guaviare', 'Vichada'];

function normRegion(s: string) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim(); }

export function DashboardPage() {
  const [region, setRegion] = useState('Nariño');
  const [period, setPeriod] = useState<'weeks' | 'year'>('weeks');
  const info = regionData[normRegion(region)] ?? { cases: 0, pos: '—', localities: '—', trend: '—' };

  const isYear = period === 'year';
  const incData = isYear ? incidenceYear : incidenceData;
  const posData = isYear ? positivityYear : positivityData;
  const incMax = isYear ? 5 : 4;
  const trendSub = isYear ? 'por mes · año 2026' : 'últimas 12 semanas';
  const compareLabel = isYear ? 'vs. mes anterior' : 'vs. semana anterior';

  return (
    <div className="page-content wide">
      <div className="dash-top">
        <div>
          <div className="page-title">Panel epidemiológico</div>
          <div className="page-subtitle">Vigilancia de casos de malaria por territorio y tendencia · Semana epidemiológica 2026-W26</div>
        </div>
        <div className="dash-filters">
          <div className="dash-filter-group">
            <div className="dash-filter-label">Región</div>
            <select className="filter-select" value={region} onChange={(e) => setRegion(e.target.value)} style={{ height: 38, minWidth: 150 }}>
              {regionOptions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="dash-filter-group">
            <div className="dash-filter-label">Periodo</div>
            <select
              className="filter-select"
              value={period}
              onChange={(e) => setPeriod(e.target.value as 'weeks' | 'year')}
              style={{ height: 38 }}
            >
              <option value="weeks">Últimas 12 semanas</option>
              <option value="year">Todo el año 2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stat cards · totales nacionales */}
      <div className="dash-filter-label" style={{ marginBottom: -6 }}>Total nacional · Colombia</div>
      <div className="stat-cards">
        {statCards.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-footer">
              <span className={s.trend === 'up' ? 'delta-up' : s.trend === 'down' ? 'delta-down' : 'delta-flat'}>{s.delta}</span>
              <span style={{ color: 'var(--text-faint)' }}>{compareLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Colombia map + sidebar */}
      <div className="chart-card">
        <p className="chart-title">Casos por región</p>
        <p className="chart-sub">Colombia · resaltado {region}</p>
        <div className="map-row">
          <div className="map-svg-wrap">
            <ColombiaMap selected={region} />
          </div>
          <div className="map-sidebar">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--green-500)', flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>{region}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>Departamento resaltado</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <div className="map-stat-card">
                <div className="map-stat-label">Casos confirmados</div>
                <div className="map-stat-val">{info.cases.toLocaleString('es-CO')}</div>
              </div>
              <div className="map-mini-row">
                <div className="map-stat-card" style={{ flex: 1 }}>
                  <div className="map-stat-label">Positividad</div>
                  <div className="map-stat-val-sm">{info.pos}</div>
                </div>
                <div className="map-stat-card" style={{ flex: 1 }}>
                  <div className="map-stat-label">Var. sem.</div>
                  <div className="map-stat-val-sm">{info.trend}</div>
                </div>
              </div>
              <div className="map-stat-card">
                <div className="map-stat-label">Localidades activas</div>
                <div className="map-stat-val-sm">{info.localities}</div>
              </div>
            </div>
            <div className="map-legend">
              <span className="map-legend-dot" style={{ background: 'var(--neutral-100)', border: '1px solid var(--border-default)' }} />
              Resto del país sin datos filtrados
            </div>
          </div>
        </div>
      </div>

      {/* Line charts */}
      <div className="charts-2col">
        <div className="chart-card">
          <p className="chart-title">Casos por 1.000 habitantes</p>
          <p className="chart-sub">Incidencia · {trendSub}</p>
          <LineChart data={incData} max={incMax} color="var(--blue-500)" id="inc" />
        </div>
        <div className="chart-card">
          <p className="chart-title">Tasa de positividad</p>
          <p className="chart-sub">% de pruebas positivas · {trendSub}</p>
          <LineChart data={posData} max={16} color="var(--status-positive-500)" id="pos" />
        </div>
      </div>

      {/* Choropleth + bar charts */}
      <div className="charts-2col">
        <div className="chart-card">
          <p className="chart-title">Casos por localidad · Tumaco</p>
          <p className="chart-sub">Intensidad de casos confirmados · acumulado 2026</p>
          <Choropleth />
        </div>
        <div className="chart-card">
          <p className="chart-title">Casos por grupo de edad y sexo</p>
          <p className="chart-sub">Distribución de casos confirmados · acumulado 2026</p>
          <AgeSexChart />
        </div>
      </div>

      <div className="chart-card">
        <p className="chart-title">Resultado PDR por tipo de búsqueda</p>
        <p className="chart-sub">Pruebas realizadas según la estrategia de búsqueda · acumulado 2026</p>
        <PdrBusquedaChart />
      </div>
    </div>
  );
}
