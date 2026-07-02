import { useRef, useState } from 'react';
import { AppShell } from './app/layout/AppShell';
import { ApiPage } from './features/api/ApiPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { SearchPage } from './features/search/SearchPage';
import { UploadPage } from './features/upload/UploadPage';
import { identities } from './data/mock';
import { Toast } from './components/Toast';
import type { AppRoute, AppView, UserRole } from './types';

const roleRoutes: Record<UserRole, AppRoute[]> = {
  supervisor: ['upload', 'search', 'dashboard'],
  specialist: ['api', 'dashboard'],
  manager: ['dashboard'],
  guest: ['dashboard'],
};

const routeMeta: Record<AppRoute, { title: string; description: string }> = {
  upload: { title: 'Cargar registros de diagnóstico', description: 'Sube fotos del formato en papel y deja la lectura asistida lista para revisión.' },
  search: { title: 'Buscar y descargar', description: 'Filtra y exporta registros para seguimiento operativo.' },
  api: { title: 'Descarga de datos de vigilancia', description: 'Acceso para especialistas con datos anonimizados y endpoints de consulta.' },
  dashboard: { title: 'Panel epidemiológico', description: 'Vista pública o gerencial con indicadores y tendencia territorial.' },
};

const UserIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const LockIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const LoginIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/>
  </svg>
);

export default function App() {
  const [view, setView] = useState<AppView>('app');
  const [role, setRole] = useState<UserRole>('guest');
  const [route, setRoute] = useState<AppRoute>('dashboard');
  const [toast, setToast] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [extraSearchRows, setExtraSearchRows] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const allowedRoutes = roleRoutes[role];
  const activeRoute = allowedRoutes.includes(route) ? route : allowedRoutes[0];
  const identity = identities[role];
  const { title, description } = routeMeta[activeRoute];

  const showToast = (msg: string) => {
    setToast(msg);
  };

  const handleLogin = () => {
    const u = userRef.current?.value.trim() ?? '';
    const p = passRef.current?.value.trim() ?? '';
    if (u === 'supervisor' && p === '123456') {
      setRole('supervisor'); setRoute('upload'); setView('app'); setLoginError(null);
    } else if (u === 'especialista' && p === '654321') {
      setRole('specialist'); setRoute('api'); setView('app'); setLoginError(null);
    } else {
      setLoginError('Usuario o contraseña incorrectos. Verifica tus credenciales.');
    }
  };

  const handleLogout = () => {
    setRole('guest'); setRoute('dashboard');
  };

  const handleValidate = () => {
    showToast('42 registros validados y sincronizados con el consolidado regional');
    setExtraSearchRows(true);
    setTimeout(() => { setRoute('search'); }, 2000);
  };

  if (view === 'login') {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="login-header">
            <img src="/logo-ism-malaria-white.png" alt="RMEI · ISM Malaria" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <h1>Vigilancia de malaria · RMEI</h1>
            <p>Inicia sesión para acceder a tus herramientas</p>
          </div>
          <div className="login-body">
            {loginError && <div className="login-error">{loginError}</div>}
            <div>
              <div className="login-field-label">Usuario</div>
              <div className="login-input-wrap">
                <span className="login-input-icon"><UserIcon /></span>
                <input ref={userRef} className="login-input" placeholder="supervisor" autoComplete="username" onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
              </div>
            </div>
            <div>
              <div className="login-field-label">Contraseña</div>
              <div className="login-input-wrap">
                <span className="login-input-icon"><LockIcon /></span>
                <input ref={passRef} type="password" className="login-input" placeholder="••••••" autoComplete="current-password" onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
              </div>
            </div>
            <button type="button" className="login-btn" onClick={handleLogin}>
              <LoginIcon /> Iniciar sesión
            </button>
            <button type="button" className="login-guest-btn" onClick={() => { setRole('guest'); setRoute('dashboard'); setView('app'); setLoginError(null); }}>
              Continuar sin iniciar sesión · ver panel epidemiológico
            </button>
            <div className="login-creds">
              <div className="login-creds-title">Credenciales de prueba</div>
              <div className="login-cred-row"><span>Supervisor</span><span className="login-cred-val">supervisor / 123456</span></div>
              <div className="login-cred-row"><span>Especialista</span><span className="login-cred-val">especialista / 654321</span></div>
            </div>
          </div>
        </div>
        {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
      </div>
    );
  }

  return (
    <>
      <AppShell
        activeRoute={activeRoute}
        activeTitle={title}
        activeDescription={description}
        role={role}
        identity={identity}
        showSearch={activeRoute !== 'dashboard'}
        onRouteChange={(r) => setRoute(allowedRoutes.includes(r) ? r : allowedRoutes[0])}
        onLogout={handleLogout}
        onLogin={() => setView('login')}
      >
        {activeRoute === 'upload' && <UploadPage onValidate={handleValidate} />}
        {activeRoute === 'search' && <SearchPage onToast={showToast} extraRows={extraSearchRows} />}
        {activeRoute === 'api' && <ApiPage onToast={showToast} />}
        {activeRoute === 'dashboard' && <DashboardPage />}
      </AppShell>
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </>
  );
}
