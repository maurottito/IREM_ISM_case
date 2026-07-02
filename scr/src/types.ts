export type AppRoute = 'upload' | 'review' | 'search' | 'api' | 'dashboard';

export type UserRole = 'supervisor' | 'specialist' | 'manager';

export interface NavItem {
  id: AppRoute;
  label: string;
  description: string;
}

export interface CaseRecord {
  id: string;
  date: string;
  colvol: string;
  locality: string;
  result: 'P. vivax' | 'P. falciparum' | 'Negative' | 'Invalid';
  searchType: 'Passive' | 'Proactive' | 'Reactive';
  needsReview?: boolean;
}