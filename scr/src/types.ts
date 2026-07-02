export type AppRoute = 'upload' | 'search' | 'api' | 'dashboard';

export type AppView = 'login' | 'app';

export type UserRole = 'supervisor' | 'specialist' | 'manager' | 'guest';

export type UploadStep = 'idle' | 'processing' | 'review';

export interface NavItem {
  id: AppRoute;
  label: string;
  description: string;
  group: 'supervisor' | 'specialist' | 'consulta';
}

export interface CaseRecord {
  id: string;
  date: string;
  colvol: string;
  colvolCode: string;
  locality: string;
  motivo: string;
  nombre: string;
  ident: string;
  nacionalidad: string;
  sexo: string;
  fnac: string;
  result: 'P. vivax' | 'P. falciparum' | 'Negativa' | 'Inválida';
  searchType: 'Pasiva' | 'Proactiva' | 'Reactiva';
  medic: string;
  needsReview?: boolean;
}

export interface Identity {
  user: string;
  role: string;
  initials: string;
  avatarBg: string;
}
