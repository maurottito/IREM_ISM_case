import { useMemo, useState } from 'react';
import { AppShell } from './app/layout/AppShell';
import { ApiPage } from './features/api/ApiPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { ReviewPage } from './features/review/ReviewPage';
import { SearchPage } from './features/search/SearchPage';
import { UploadPage } from './features/upload/UploadPage';
import { navItems } from './data/mock';
import type { AppRoute, AppView, UserRole } from './types';

const roleRoutes: Record<UserRole, AppRoute[]> = {
  supervisor: ['upload', 'review', 'search', 'dashboard'],
  specialist: ['api', 'dashboard'],
  manager: ['dashboard'],
};

const personaTitles: Record<AppRoute, { title: string; description: string; actionLabel: string }> = {
  upload: {
    title: 'Cargar registros de diagnóstico',
    description: 'Sube fotos del formato en papel y deja la lectura asistida lista para revisión.',
    actionLabel: 'Explorar imágenes',
  },
  review: {
    title: 'Revisar y validar',
    description: 'Corrige la tabla extraída desde las fotos antes de consolidar.',
    actionLabel: 'Validar registros',
  },
  search: {
    title: 'Buscar y descargar',
    description: 'Filtra y exporta registros para seguimiento operativo.',
    actionLabel: 'Descargar Excel',
  },
  api: {
    title: 'Descarga de datos',
    description: 'Acceso para especialistas con datos anonimizados y endpoints de consulta.',
    actionLabel: 'Copiar API key',
  },
  dashboard: {
    title: 'Panel epidemiológico',
    description: 'Vista pública o gerencial con indicadores y tendencia territorial.',
    actionLabel: 'Actualizar vista',
  },
};

export default function App() {
  const [view, setView] = useState<AppView>('login');
  const [role, setRole] = useState<UserRole>('supervisor');
  const [route, setRoute] = useState<AppRoute>('upload');
  const current = useMemo(() => navItems.find((item) => item.id === route) ?? navItems[0], [route]);
  const allowedRoutes = roleRoutes[role];

  const activeRoute = allowedRoutes.includes(route) ? route : allowedRoutes[0];
  const title = personaTitles[activeRoute].title;
  const description = personaTitles[activeRoute].description;

  if (view === 'login') {
    return (
      <div className="login-screen">
        <section className="login-card">
          <div className="login-header">
            <div className="brand-mark">ISM</div>
            <div>
              <h1>Vigilancia de malaria · RMEI</h1>
              <p>Inicia sesión para acceder a tus herramientas</p>
            </div>
          </div>

          <div className="login-fields">
            <label>
              <span>Usuario</span>
              <input defaultValue="supervisor" />
            </label>
            <label>
              <span>Contraseña</span>
              <input type="password" defaultValue="123456" />
            </label>
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                setRole('supervisor');
                setRoute('upload');
                setView('app');
              }}
            >
              Iniciar sesión
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                setRole('manager');
                setRoute('dashboard');
                setView('app');
              }}
            >
              Continuar sin iniciar sesión
            </button>
          </div>

          <div className="login-credentials">
            <strong>Credenciales de prueba</strong>
            <div>Supervisor: supervisor / 123456</div>
            <div>Especialista: especialista / 654321</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <AppShell
      activeRoute={activeRoute}
      activeTitle={title}
      activeDescription={description}
      showSearch={activeRoute !== 'dashboard'}
      actionLabel={personaTitles[activeRoute].actionLabel}
      onRouteChange={(nextRoute) => setRoute(allowedRoutes.includes(nextRoute) ? nextRoute : allowedRoutes[0])}
    >
      {activeRoute === 'upload' && <UploadPage />}
      {activeRoute === 'review' && <ReviewPage />}
      {activeRoute === 'search' && <SearchPage />}
      {activeRoute === 'api' && <ApiPage />}
      {activeRoute === 'dashboard' && <DashboardPage />}
    </AppShell>
  );
}