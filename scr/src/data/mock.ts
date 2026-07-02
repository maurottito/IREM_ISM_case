import type { CaseRecord, NavItem } from '../types';

export const navItems: NavItem[] = [
  { id: 'upload', label: 'Cargar registros', description: 'Fotos de formularios y prellenado asistido' },
  { id: 'review', label: 'Revisar y validar', description: 'Corrección manual antes de consolidar' },
  { id: 'search', label: 'Buscar y descargar', description: 'Filtros y exportación a Excel' },
  { id: 'api', label: 'Datos y API', description: 'Acceso para especialistas' },
  { id: 'dashboard', label: 'Panel epidemiológico', description: 'Resumen para gerencia' },
];

export const reviewRows: CaseRecord[] = [
  { id: 'NAR-2231', date: '24/06/26', colvol: 'D. Angulo · ColVol-01', locality: 'Llorente', result: 'P. falciparum', searchType: 'Passive' },
  { id: 'NAR-2232', date: '24/06/26', colvol: 'D. Angulo · ColVol-01', locality: 'Llorente', result: 'Negative', searchType: 'Reactive' },
  { id: 'NAR-2233', date: '23/06/26', colvol: 'R. Caicedo · ColVol-02', locality: 'Espriella', result: 'P. vivax', searchType: 'Passive' },
  { id: 'NAR-2234', date: '23/06/26', colvol: 'R. Caicedo · ColVol-02', locality: 'Tumaco', result: 'Negative', searchType: 'Proactive' },
  { id: 'NAR-2235', date: '22/06/26', colvol: 'L. Quiñones · ColVol-03', locality: 'Chajal', result: 'Invalid', searchType: 'Proactive', needsReview: true },
  { id: 'NAR-2236', date: '22/06/26', colvol: 'L. Quiñones · ColVol-03', locality: 'San Luis', result: 'P. vivax', searchType: 'Reactive' },
];