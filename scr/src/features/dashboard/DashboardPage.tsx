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

// ── District bubble map over the real department shape ────────────
// Fake per-region data: each region lists districts with a case count and a
// fractional position (fx, fy in 0..1) inside the department's bounding box.
type District = { n: string; c: number; fx: number; fy: number };

const regionDistricts: Record<string, District[]> = {
  NARINO: [
    { n: 'Tumaco', c: 71, fx: 0.16, fy: 0.82 },
    { n: 'Barbacoas', c: 62, fx: 0.5, fy: 0.68 },
    { n: 'Roberto Payán', c: 55, fx: 0.34, fy: 0.6 },
    { n: 'Magüí Payán', c: 48, fx: 0.46, fy: 0.5 },
    { n: 'Fco. Pizarro', c: 40, fx: 0.6, fy: 0.85 },
    { n: 'Olaya Herrera', c: 33, fx: 0.4, fy: 0.3 },
    { n: 'El Charco', c: 24, fx: 0.28, fy: 0.16 },
  ],
  'CHOCO': [
    { n: 'Quibdó', c: 84, fx: 0.55, fy: 0.52 },
    { n: 'Riosucio', c: 66, fx: 0.45, fy: 0.12 },
    { n: 'Istmina', c: 52, fx: 0.52, fy: 0.66 },
    { n: 'Alto Baudó', c: 45, fx: 0.35, fy: 0.6 },
    { n: 'Bojayá', c: 38, fx: 0.48, fy: 0.34 },
    { n: 'Condoto', c: 29, fx: 0.6, fy: 0.72 },
    { n: 'Tadó', c: 21, fx: 0.68, fy: 0.62 },
  ],
  CAUCA: [
    { n: 'Guapi', c: 58, fx: 0.16, fy: 0.55 },
    { n: 'Timbiquí', c: 49, fx: 0.22, fy: 0.42 },
    { n: 'López de Micay', c: 41, fx: 0.3, fy: 0.3 },
    { n: 'Argelia', c: 34, fx: 0.5, fy: 0.72 },
    { n: 'El Tambo', c: 27, fx: 0.55, fy: 0.55 },
    { n: 'Popayán', c: 19, fx: 0.64, fy: 0.5 },
    { n: 'S. de Quilichao', c: 14, fx: 0.72, fy: 0.35 },
  ],
  'VALLE DEL CAUCA': [
    { n: 'Buenaventura', c: 77, fx: 0.3, fy: 0.5 },
    { n: 'Dagua', c: 34, fx: 0.5, fy: 0.45 },
    { n: 'Cali', c: 26, fx: 0.6, fy: 0.55 },
    { n: 'Jamundí', c: 18, fx: 0.58, fy: 0.68 },
    { n: 'El Cairo', c: 15, fx: 0.4, fy: 0.2 },
    { n: 'Bolívar', c: 12, fx: 0.52, fy: 0.3 },
  ],
  ANTIOQUIA: [
    { n: 'El Bagre', c: 63, fx: 0.62, fy: 0.28 },
    { n: 'Zaragoza', c: 55, fx: 0.6, fy: 0.34 },
    { n: 'Cáceres', c: 47, fx: 0.55, fy: 0.3 },
    { n: 'Tarazá', c: 40, fx: 0.5, fy: 0.35 },
    { n: 'Turbo', c: 36, fx: 0.2, fy: 0.25 },
    { n: 'Nechí', c: 28, fx: 0.66, fy: 0.24 },
    { n: 'Segovia', c: 22, fx: 0.6, fy: 0.42 },
  ],
  CORDOBA: [
    { n: 'Tierralta', c: 51, fx: 0.45, fy: 0.75 },
    { n: 'Pto. Libertador', c: 44, fx: 0.55, fy: 0.8 },
    { n: 'Montelíbano', c: 37, fx: 0.6, fy: 0.72 },
    { n: 'Ayapel', c: 30, fx: 0.72, fy: 0.68 },
    { n: 'Valencia', c: 23, fx: 0.35, fy: 0.68 },
    { n: 'Montería', c: 16, fx: 0.45, fy: 0.5 },
    { n: 'Pto. Escondido', c: 12, fx: 0.28, fy: 0.35 },
  ],
  AMAZONAS: [
    { n: 'Leticia', c: 39, fx: 0.72, fy: 0.85 },
    { n: 'Puerto Nariño', c: 31, fx: 0.6, fy: 0.8 },
    { n: 'Tarapacá', c: 24, fx: 0.78, fy: 0.6 },
    { n: 'La Chorrera', c: 18, fx: 0.5, fy: 0.5 },
    { n: 'La Pedrera', c: 13, fx: 0.6, fy: 0.4 },
    { n: 'Pto. Santander', c: 9, fx: 0.45, fy: 0.35 },
  ],
  PUTUMAYO: [
    { n: 'Puerto Asís', c: 57, fx: 0.5, fy: 0.55 },
    { n: 'Valle del Guamuez', c: 48, fx: 0.32, fy: 0.62 },
    { n: 'Orito', c: 40, fx: 0.35, fy: 0.52 },
    { n: 'San Miguel', c: 33, fx: 0.4, fy: 0.72 },
    { n: 'Pto. Leguízamo', c: 27, fx: 0.75, fy: 0.7 },
    { n: 'Mocoa', c: 20, fx: 0.25, fy: 0.3 },
    { n: 'Puerto Caicedo', c: 15, fx: 0.42, fy: 0.45 },
  ],
  GUAVIARE: [
    { n: 'San José', c: 45, fx: 0.3, fy: 0.35 },
    { n: 'El Retorno', c: 33, fx: 0.35, fy: 0.45 },
    { n: 'Calamar', c: 25, fx: 0.45, fy: 0.55 },
    { n: 'Miraflores', c: 18, fx: 0.6, fy: 0.7 },
  ],
  VICHADA: [
    { n: 'Cumaribo', c: 42, fx: 0.45, fy: 0.7 },
    { n: 'Puerto Carreño', c: 30, fx: 0.82, fy: 0.2 },
    { n: 'La Primavera', c: 23, fx: 0.6, fy: 0.35 },
    { n: 'Santa Rosalía', c: 15, fx: 0.4, fy: 0.5 },
  ],
};

const colorScale = ['#EAF3DC', '#C9E29B', '#92BF4E', '#E69A29', '#D64545'];
const bucket = (c: number) => c >= 60 ? 4 : c >= 45 ? 3 : c >= 30 ? 2 : c >= 15 ? 1 : 0;

// ── SVG-path geometry helpers (paths are only M/L absolute "x,y" + Z) ──
type Pt = { x: number; y: number };

function pathBBox(d: string) {
  const nums = (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = nums[i], y = nums[i + 1];
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  return { minX, minY, w: maxX - minX, h: maxY - minY };
}

// Split a path into its subpath rings (a multipolygon department has several).
function parseRings(d: string): Pt[][] {
  const rings: Pt[][] = [];
  for (const sub of d.split(/(?=M)/)) {
    const nums = (sub.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
    const ring: Pt[] = [];
    for (let i = 0; i + 1 < nums.length; i += 2) ring.push({ x: nums[i], y: nums[i + 1] });
    if (ring.length >= 3) rings.push(ring);
  }
  return rings;
}

function ringArea(r: Pt[]) {
  let a = 0;
  for (let i = 0; i < r.length; i++) { const p = r[i], q = r[(i + 1) % r.length]; a += p.x * q.y - q.x * p.y; }
  return Math.abs(a) / 2;
}

function largestRing(rings: Pt[][]): Pt[] {
  return rings.reduce((best, r) => (ringArea(r) > ringArea(best) ? r : best), rings[0] ?? []);
}

// Sutherland–Hodgman: clip a (possibly concave) subject polygon by one
// half-plane {p : f(p) <= 0}. Applying the perpendicular-bisector half-planes
// between a seed and every other seed yields that seed's Voronoi cell.
function clipHalf(poly: Pt[], f: (p: Pt) => number): Pt[] {
  if (poly.length === 0) return poly;
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const fa = f(a), fb = f(b);
    if (fa <= 0) out.push(a);
    if ((fa <= 0) !== (fb <= 0)) {
      const t = fa / (fa - fb);
      out.push({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) });
    }
  }
  return out;
}

// Voronoi cell of seed i, clipped to the department polygon.
function voronoiCell(subject: Pt[], seeds: Pt[], i: number): Pt[] {
  let cell = subject;
  const Pi = seeds[i];
  for (let j = 0; j < seeds.length && cell.length; j++) {
    if (j === i) continue;
    const Pj = seeds[j];
    const dx = Pj.x - Pi.x, dy = Pj.y - Pi.y;
    const c = (Pj.x * Pj.x + Pj.y * Pj.y - Pi.x * Pi.x - Pi.y * Pi.y) / 2;
    cell = clipHalf(cell, (p) => p.x * dx + p.y * dy - c); // keep side nearer to Pi
  }
  return cell;
}

function polygonCentroid(poly: Pt[]): Pt {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length];
    const cross = p.x * q.y - q.x * p.y;
    a += cross; cx += (p.x + q.x) * cross; cy += (p.y + q.y) * cross;
  }
  if (Math.abs(a) < 1e-6) {
    const n = poly.length || 1;
    return { x: poly.reduce((s, p) => s + p.x, 0) / n, y: poly.reduce((s, p) => s + p.y, 0) / n };
  }
  a *= 0.5;
  return { x: cx / (6 * a), y: cy / (6 * a) };
}

const ringToPath = (r: Pt[]) => (r.length ? 'M' + r.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('L') + 'Z' : '');

function RegionDistrictMap({ region }: { region: string }) {
  const key = normRegion(region);
  const dep = COLOMBIA_DEPTS.deps.find((d) => normRegion(d.name) === key);
  const districts = regionDistricts[key] ?? [];
  if (!dep || districts.length === 0) {
    return <div style={{ padding: 24, color: 'var(--text-muted)' }}>Aún no hay datos de distritos para {region}.</div>;
  }
  const bb = pathBBox(dep.d);
  const S = Math.max(bb.w, bb.h);      // scale reference so strokes/fonts fit any department size
  const pad = S * 0.06;
  const vb = `${bb.minX - pad} ${bb.minY - pad} ${bb.w + pad * 2} ${bb.h + pad * 2}`;
  const maxC = Math.max(...districts.map((d) => d.c));
  const ranked = [...districts].sort((a, b) => b.c - a.c);
  const px = (d: District) => bb.minX + d.fx * bb.w;
  const py = (d: District) => bb.minY + d.fy * bb.h;
  // Partition the real department shape into one polygon per district.
  const clipPoly = largestRing(parseRings(dep.d));
  const seeds = districts.map((d) => ({ x: px(d), y: py(d) }));
  // A seed that falls outside the silhouette can be fully dominated by a
  // neighbour (empty cell). Pull any such seed toward the department centroid
  // until it owns area, so every district gets a visible polygon.
  const centroid = polygonCentroid(clipPoly);
  for (let i = 0; i < seeds.length; i++) {
    for (let tries = 0; tries < 8 && voronoiCell(clipPoly, seeds, i).length < 3; tries++) {
      seeds[i] = { x: seeds[i].x + (centroid.x - seeds[i].x) * 0.35, y: seeds[i].y + (centroid.y - seeds[i].y) * 0.35 };
    }
  }
  const cells = districts.map((_, i) => voronoiCell(clipPoly, seeds, i));
  return (
    <div className="map-row" style={{ alignItems: 'stretch' }}>
      <div className="map-svg-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
        <svg viewBox={vb} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', maxHeight: 380, display: 'block' }}>
          {/* base fill (covers islands / secondary rings too) */}
          <path d={dep.d} fill="var(--neutral-100)" stroke="none" />
          {/* one filled polygon per district, bordered in white */}
          {districts.map((d, i) => {
            const cell = cells[i];
            if (cell.length < 3) return null;
            return <path key={d.n} d={ringToPath(cell)} fill={colorScale[bucket(d.c)]} fillOpacity={0.95} stroke="#fff" strokeWidth={S * 0.005} strokeLinejoin="round" />;
          })}
          {/* department outline on top */}
          <path d={dep.d} fill="none" stroke="var(--border-default)" strokeWidth={S * 0.01} strokeLinejoin="round" />
          {/* case count centred in each district polygon */}
          {districts.map((d, i) => {
            const cell = cells[i];
            if (cell.length < 3) return null;
            const ctr = polygonCentroid(cell);
            const dark = bucket(d.c) >= 3;
            return <text key={d.n} x={ctr.x} y={ctr.y + S * 0.011} textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: S * 0.028, fontWeight: 700, fill: dark ? '#fff' : 'var(--neutral-800)' }}>{d.c}</text>;
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
// Dos juegos de cifras coherentes: la ventana de 12 semanas y el acumulado
// del año. La base poblacional (~2,36 M) se mantiene entre ambos, por eso
// «casos» y «casos por 1.000 hab» escalan juntos al pasar de semanas a año.
type StatCard = { label: string; value: string; delta: string; trend: 'up' | 'down' | 'flat'; note: string };

const statCardsWeeks: StatCard[] = [
  { label: 'Casos confirmados', value: '6.842', delta: '+7.4%', trend: 'up', note: 'vs. semana anterior' },
  { label: 'Tasa de positividad', value: '11.8%', delta: '-0.9%', trend: 'down', note: 'vs. semana anterior' },
  { label: 'Casos por 1.000 hab', value: '2.9', delta: '+0.3', trend: 'up', note: 'vs. semana anterior' },
  { label: 'Localidades activas', value: '110', delta: '+4', trend: 'up', note: 'de 180 · vs. semana anterior' },
];

const statCardsYear: StatCard[] = [
  { label: 'Casos confirmados', value: '29.640', delta: '+5.2%', trend: 'up', note: 'vs. mes anterior' },
  { label: 'Tasa de positividad', value: '12.3%', delta: '+0.4%', trend: 'up', note: 'vs. mes anterior' },
  { label: 'Casos por 1.000 hab', value: '12.6', delta: '+0.6', trend: 'up', note: 'vs. mes anterior' },
  { label: 'Localidades activas', value: '142', delta: '+6', trend: 'up', note: 'de 180 · vs. mes anterior' },
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
  const statCards = isYear ? statCardsYear : statCardsWeeks;

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
              <span style={{ color: 'var(--text-faint)' }}>{s.note}</span>
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
        <p className="chart-title">Casos por distrito · {region}</p>
        <p className="chart-sub">Intensidad de casos confirmados sobre el mapa del departamento · acumulado 2026</p>
        <RegionDistrictMap region={region} />
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
