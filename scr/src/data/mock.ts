import type { CaseRecord, NavItem, Identity, UserRole } from '../types';

export const navItems: NavItem[] = [
  { id: 'upload', label: 'Cargar registros', description: 'Fotos del formato y lectura asistida', group: 'supervisor' },
  { id: 'search', label: 'Buscar y descargar', description: 'Filtros y exportación a Excel', group: 'supervisor' },
  { id: 'api', label: 'Descarga de datos', description: 'Acceso para especialistas', group: 'specialist' },
  { id: 'dashboard', label: 'Panel epidemiológico', description: 'Resumen para gerencia', group: 'consulta' },
];

export const reviewRows: CaseRecord[] = [
  { id: 'NAR-2231', date: '24/06/26', colvol: 'D. Angulo', colvolCode: 'ColVol-01', locality: 'Llorente', motivo: 'Sospechoso', nombre: 'María Prado', ident: 'CC 1.087.334', nacionalidad: 'Colombiana', sexo: 'M', fnac: '12/03/1999', result: 'P. falciparum', searchType: 'Pasiva', medic: 'No' },
  { id: 'NAR-2232', date: '24/06/26', colvol: 'D. Angulo', colvolCode: 'ColVol-01', locality: 'Llorente', motivo: 'Conviviente', nombre: 'José Landázuri', ident: 'CC 1.088.771', nacionalidad: 'Colombiana', sexo: 'H', fnac: '07/11/1985', result: 'Negativa', searchType: 'Reactiva', medic: 'No' },
  { id: 'NAR-2233', date: '23/06/26', colvol: 'R. Caicedo', colvolCode: 'ColVol-02', locality: 'Espriella', motivo: 'Sospechoso', nombre: 'Ana Cortés', ident: 'TI 1.010.556', nacionalidad: 'Colombiana', sexo: 'M', fnac: '22/09/2018', result: 'P. vivax', searchType: 'Pasiva', medic: 'No' },
  { id: 'NAR-2234', date: '23/06/26', colvol: 'R. Caicedo', colvolCode: 'ColVol-02', locality: 'Tumaco', motivo: 'Seguimiento', nombre: 'Luis Quiñónez', ident: 'CC 1.234.889', nacionalidad: 'Colombiana', sexo: 'H', fnac: '03/02/1993', result: 'Negativa', searchType: 'Proactiva', medic: 'Sí · Cloroquina' },
  { id: 'NAR-2235', date: '22/06/26', colvol: 'L. Quiñones', colvolCode: 'ColVol-03', locality: 'Chajal', motivo: 'Conviviente', nombre: 'Rosa Angulo', ident: 'CE 5.667.201', nacionalidad: 'Venezolana', sexo: 'M', fnac: '15/06/2007', result: 'Inválida', searchType: 'Proactiva', medic: 'No', needsReview: true },
  { id: 'NAR-2236', date: '22/06/26', colvol: 'L. Quiñones', colvolCode: 'ColVol-03', locality: 'San Luis', motivo: 'Sospechoso', nombre: 'Jhon Caicedo', ident: 'CC 987.554', nacionalidad: 'Colombiana', sexo: 'H', fnac: '30/08/1974', result: 'P. vivax', searchType: 'Reactiva', medic: 'No' },
];

export const searchRows: CaseRecord[] = [
  { id: 'NAR-3312', date: '24/06/26', colvol: 'D. Angulo', colvolCode: 'ColVol-01', locality: 'Llorente', motivo: 'Sospechoso', nombre: 'Yudy Riascos', ident: 'CC 1.087.112', nacionalidad: 'Colombiana', sexo: 'M', fnac: '04/05/1990', result: 'P. falciparum', searchType: 'Pasiva', medic: 'No' },
  { id: 'NAR-3311', date: '24/06/26', colvol: 'R. Caicedo', colvolCode: 'ColVol-02', locality: 'Espriella', motivo: 'Sospechoso', nombre: 'Néstor Cortés', ident: 'CC 1.088.220', nacionalidad: 'Colombiana', sexo: 'H', fnac: '19/12/1982', result: 'P. vivax', searchType: 'Pasiva', medic: 'No' },
  { id: 'NAR-3309', date: '23/06/26', colvol: 'L. Quiñones', colvolCode: 'ColVol-03', locality: 'San Luis', motivo: 'Conviviente', nombre: 'Carla Preciado', ident: 'TI 1.010.990', nacionalidad: 'Colombiana', sexo: 'M', fnac: '08/07/2016', result: 'P. vivax', searchType: 'Proactiva', medic: 'No' },
  { id: 'NAR-3307', date: '23/06/26', colvol: 'R. Caicedo', colvolCode: 'ColVol-02', locality: 'Tumaco', motivo: 'Seguimiento', nombre: 'Óscar Mesa', ident: 'CC 1.234.100', nacionalidad: 'Colombiana', sexo: 'H', fnac: '27/03/1995', result: 'Negativa', searchType: 'Proactiva', medic: 'Sí · Primaquina' },
  { id: 'NAR-3305', date: '22/06/26', colvol: 'L. Quiñones', colvolCode: 'ColVol-03', locality: 'Chajal', motivo: 'Sospechoso', nombre: 'Beatriz Landázuri', ident: 'CC 1.445.882', nacionalidad: 'Colombiana', sexo: 'M', fnac: '11/02/1978', result: 'P. vivax', searchType: 'Reactiva', medic: 'No' },
  { id: 'NAR-3303', date: '22/06/26', colvol: 'D. Angulo', colvolCode: 'ColVol-01', locality: 'Candelillas', motivo: 'Seguimiento', nombre: 'Pedro Castro', ident: 'CC 900.221', nacionalidad: 'Colombiana', sexo: 'H', fnac: '05/09/1969', result: 'Negativa', searchType: 'Pasiva', medic: 'No' },
  { id: 'NAR-3301', date: '21/06/26', colvol: 'M. Prado', colvolCode: 'ColVol-04', locality: 'Imbilí', motivo: 'Sospechoso', nombre: 'Sara Obando', ident: 'CC 1.099.334', nacionalidad: 'Colombiana', sexo: 'M', fnac: '30/10/2001', result: 'P. vivax', searchType: 'Pasiva', medic: 'No' },
  { id: 'NAR-3298', date: '21/06/26', colvol: 'D. Angulo', colvolCode: 'ColVol-01', locality: 'Llorente', motivo: 'Sospechoso', nombre: 'Diego Riascos', ident: 'CC 1.055.667', nacionalidad: 'Colombiana', sexo: 'H', fnac: '14/08/1988', result: 'Inválida', searchType: 'Pasiva', medic: 'No' },
];

export const identities: Record<UserRole, Identity> = {
  supervisor: { user: 'James Torres', role: 'Supervisor · Tumaco, Nariño', initials: 'JT', avatarBg: '#217ab3' },
  specialist: { user: 'Marco Fernández', role: 'Especialista de datos · MinSalud', initials: 'MF', avatarBg: '#7aa63c' },
  manager: { user: 'Manuela Hernández', role: 'Gerente de salud · Nariño', initials: 'MH', avatarBg: '#7a5bd6' },
  guest: { user: 'Invitado', role: 'Consulta pública', initials: 'IN', avatarBg: '#6c7883' },
};

export const regionData: Record<string, { cases: number; pos: string; localities: string; trend: string }> = {
  NARINO: { cases: 1284, pos: '12.4%', localities: '18 de 24', trend: '+8.2%' },
  CHOCO: { cases: 964, pos: '15.1%', localities: '21 de 30', trend: '+11.0%' },
  CAUCA: { cases: 512, pos: '9.7%', localities: '12 de 20', trend: '+3.4%' },
  'VALLE DEL CAUCA': { cases: 287, pos: '6.2%', localities: '8 de 16', trend: '-1.2%' },
  ANTIOQUIA: { cases: 631, pos: '10.8%', localities: '19 de 40', trend: '+5.6%' },
  CORDOBA: { cases: 418, pos: '8.9%', localities: '10 de 18', trend: '+2.1%' },
  AMAZONAS: { cases: 356, pos: '13.7%', localities: '7 de 11', trend: '+6.9%' },
  PUTUMAYO: { cases: 402, pos: '11.5%', localities: '9 de 13', trend: '+4.8%' },
  GUAVIARE: { cases: 173, pos: '7.4%', localities: '3 de 4', trend: '+1.0%' },
  VICHADA: { cases: 142, pos: '9.1%', localities: '3 de 4', trend: '-0.6%' },
};

export const incidenceData = [
  { l: 'W15', v: 2.1 }, { l: 'W16', v: 2.4 }, { l: 'W17', v: 2.2 }, { l: 'W18', v: 2.8 },
  { l: 'W19', v: 3.1 }, { l: 'W20', v: 2.9 }, { l: 'W21', v: 3.4 }, { l: 'W22', v: 3.2 },
  { l: 'W23', v: 3.0 }, { l: 'W24', v: 3.5 }, { l: 'W25', v: 3.8 }, { l: 'W26', v: 3.6, hi: true },
];

export const positivityData = [
  { l: 'W15', v: 9.8 }, { l: 'W16', v: 10.5 }, { l: 'W17', v: 11.2 }, { l: 'W18', v: 10.8 },
  { l: 'W19', v: 12.1 }, { l: 'W20', v: 13.4 }, { l: 'W21', v: 12.8 }, { l: 'W22', v: 13.9 },
  { l: 'W23', v: 13.1 }, { l: 'W24', v: 12.6 }, { l: 'W25', v: 13.5 }, { l: 'W26', v: 12.4, hi: true },
];
