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

// ── District bubble map over the real Nariño department shape ─────
const NARINO_PATH = 'M89,8L92,11L94,14L96,17L98,19L101,22L104,26L106,29L107,33L109,35L113,37L116,39L119,40L123,40L128,40L131,39L134,38L138,39L139,42L139,46L141,49L143,47L146,48L146,52L147,56L150,58L150,62L148,64L146,66L144,68L143,71L143,75L142,78L140,81L143,82L147,82L150,83L153,82L157,82L161,82L165,81L167,79L171,81L173,83L176,85L179,86L181,88L184,89L185,92L184,96L182,99L181,103L183,106L184,110L182,112L179,114L176,116L173,118L169,118L166,120L162,121L160,123L161,127L161,131L162,135L162,141L163,146L165,148L164,151L165,156L166,160L167,164L165,166L162,167L158,167L159,171L158,174L158,178L160,180L161,183L161,187L160,190L155,190L152,191L149,192L144,190L141,189L137,190L134,191L132,188L131,185L129,182L127,179L126,175L127,172L125,169L123,167L118,166L115,164L113,161L113,157L114,154L113,151L109,151L105,152L102,153L98,154L95,155L91,155L86,153L83,151L81,149L78,147L74,145L71,143L69,141L66,139L64,136L61,135L56,134L53,132L52,129L49,127L47,124L43,122L39,122L36,121L33,119L31,116L28,114L26,111L23,108L19,106L17,103L14,100L13,97L10,98L9,95L7,93L4,91L1,89L0,85L2,82L4,80L6,78L9,75L11,71L14,70L19,70L23,71L29,72L33,72L36,73L39,71L38,68L39,64L37,62L36,59L35,56L34,53L30,53L29,48L30,44L34,44L37,43L38,40L37,37L35,35L34,32L33,29L34,25L36,21L37,18L39,16L41,14L45,12L47,10L50,7L52,11L54,14L57,18L56,15L57,11L58,8L60,10L62,8L64,6L66,3L68,1L71,0L74,1L75,4L76,7L80,6L82,4L84,0L86,3L88,5L89,8Z';

const narinoDistricts = [
  { n: 'Tumaco', c: 71, x: 30, y: 90 },
  { n: 'Barbacoas', c: 62, x: 120, y: 90 },
  { n: 'Roberto Payán', c: 55, x: 80, y: 120 },
  { n: 'Magüí Payán', c: 48, x: 110, y: 150 },
  { n: 'Fco. Pizarro', c: 40, x: 135, y: 174 },
  { n: 'Olaya Herrera', c: 33, x: 90, y: 54 },
  { n: 'El Charco', c: 24, x: 55, y: 30 },
];
const colorScale = ['#EAF3DC', '#C9E29B', '#92BF4E', '#E69A29', '#D64545'];
const bucket = (c: number) => c >= 60 ? 4 : c >= 45 ? 3 : c >= 30 ? 2 : c >= 15 ? 1 : 0;

function NarinoDistrictMap() {
  const maxC = Math.max(...narinoDistricts.map((d) => d.c));
  const ranked = [...narinoDistricts].sort((a, b) => b.c - a.c);
  return (
    <div className="map-row" style={{ alignItems: 'stretch' }}>
      <div className="map-svg-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
        <svg viewBox="-14 -14 213 220" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', maxHeight: 380, display: 'block' }}>
          <path d={NARINO_PATH} fill="var(--neutral-100)" stroke="var(--border-default)" strokeWidth={1.4} strokeLinejoin="round" />
          {narinoDistricts.map((d) => {
            const r = 6 + (d.c / maxC) * 11;
            const dark = bucket(d.c) >= 3;
            return (
              <g key={d.n}>
                <circle cx={d.x} cy={d.y} r={r} fill={colorScale[bucket(d.c)]} fillOpacity={0.92} stroke="#fff" strokeWidth={1.6} />
                <text x={d.x} y={d.y + 3.5} textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, fill: dark ? '#fff' : 'var(--neutral-800)' }}>{d.c}</text>
              </g>
            );
          })}
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, justifyContent: 'center' }}>
          <span style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>Menos casos</span>
          <div style={{ display: 'flex', gap: 3 }}>
            {colorScale.map((c, i) => <span key={i} style={{ width: 26, height: 10, background: c, borderRadius: 2, display: 'inline-block' }} />)}
          </div>
          <span style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>Más casos</span>
        </div>
      </div>
      <div className="map-sidebar" style={{ justifyContent: 'flex-start', gap: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--text-strong)' }}>Casos confirmados por distrito</div>
        {ranked.map((d) => (
          <div key={d.n} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 104, fontSize: 12.5, color: 'var(--text-strong)', fontWeight: 600, whiteSpace: 'nowrap' }}>{d.n}</div>
            <div style={{ flex: 1, height: 10, background: 'var(--neutral-100)', borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ width: `${(d.c / maxC) * 100}%`, height: '100%', background: colorScale[bucket(d.c)], borderRadius: 5 }} />
            </div>
            <div style={{ width: 26, textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 600, color: 'var(--text-muted)' }}>{d.c}</div>
          </div>
        ))}
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

export const regionOptions = ['Nariño', 'Chocó', 'Cauca', 'Valle del Cauca', 'Antioquia', 'Córdoba', 'Amazonas', 'Putumayo', 'Guaviare', 'Vichada'];
export type DashPeriod = 'weeks' | 'year';

function normRegion(s: string) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim(); }

export function DashboardPage({ region, period }: { region: string; period: DashPeriod }) {
  const info = regionData[normRegion(region)] ?? { cases: 0, pos: '—', localities: '—', trend: '—' };

  const isYear = period === 'year';
  const incData = isYear ? incidenceYear : incidenceData;
  const posData = isYear ? positivityYear : positivityData;
  const incMax = isYear ? 5 : 4;
  const trendSub = isYear ? 'por mes · año 2026' : 'últimas 12 semanas';
  const compareLabel = isYear ? 'vs. mes anterior' : 'vs. semana anterior';

  // Series regionales: escalan la curva nacional según la región seleccionada
  const scaleSeries = (s: { l: string; v: number; hi?: boolean }[], f: number) =>
    s.map((d) => ({ ...d, v: Math.round(d.v * f * 10) / 10 }));
  const incFactor = Math.min(1.6, Math.max(0.5, info.cases / 1000));
  const posFactor = (parseFloat(info.pos) || 12.4) / 12.4;
  const regInc = scaleSeries(incData, incFactor);
  const regPos = scaleSeries(posData, posFactor);
  const regIncMax = Math.max(incMax, Math.ceil(Math.max(...regInc.map((d) => d.v))));
  const regPosMax = Math.max(8, Math.ceil(Math.max(...regPos.map((d) => d.v)) * 1.1));

  return (
    <div className="page-content wide">
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

      {/* Line charts · nacional (encima del mapa) */}
      <div className="dash-filter-label" style={{ marginBottom: -6 }}>Tendencia · total nacional (Colombia)</div>
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

      {/* Line charts · regional */}
      <div className="dash-filter-label" style={{ marginBottom: -6 }}>Tendencia · región {region}</div>
      <div className="charts-2col">
        <div className="chart-card">
          <p className="chart-title">Casos por 1.000 habitantes · {region}</p>
          <p className="chart-sub">Incidencia · {trendSub}</p>
          <LineChart data={regInc} max={regIncMax} color="var(--blue-500)" id="inc-reg" />
        </div>
        <div className="chart-card">
          <p className="chart-title">Tasa de positividad · {region}</p>
          <p className="chart-sub">% de pruebas positivas · {trendSub}</p>
          <LineChart data={regPos} max={regPosMax} color="var(--status-positive-500)" id="pos-reg" />
        </div>
      </div>

      {/* Mapa de distritos de Nariño (forma real) + desglose */}
      <div className="chart-card">
        <p className="chart-title">Casos por distrito · Nariño</p>
        <p className="chart-sub">Intensidad de casos confirmados sobre el mapa del departamento · acumulado 2026</p>
        <NarinoDistrictMap />
      </div>

      {/* Grupo de edad/sexo + PDR por tipo de búsqueda */}
      <div className="charts-2col">
        <div className="chart-card">
          <p className="chart-title">Casos por grupo de edad y sexo</p>
          <p className="chart-sub">Distribución de casos confirmados · acumulado 2026</p>
          <AgeSexChart />
        </div>
        <div className="chart-card">
          <p className="chart-title">Resultado PDR por tipo de búsqueda</p>
          <p className="chart-sub">Pruebas realizadas según la estrategia de búsqueda · acumulado 2026</p>
          <PdrBusquedaChart />
        </div>
      </div>
    </div>
  );
}
