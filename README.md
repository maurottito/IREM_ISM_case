# IREM ISM Case

Plataforma piloto para registrar, revisar y analizar diagnósticos de malaria (ISM / RMEI, Colombia) a partir de formularios en papel («Registro de pruebas diagnósticas», Anexo 1) fotografiados por el supervisor. Las fotos se leen con OCR y llenan una tabla editable; los datos validados alimentan la búsqueda, la descarga y el panel epidemiológico.

## Usuarios
El producto está pensado para tres perfiles, con vistas y accesos distintos:

- **Supervisor**: sube las fotos, revisa la extracción por OCR y corrige los datos antes de validar. También busca y descarga registros.
- **Especialista (servidor público)**: consulta la información consolidada, usa la API de datos anonimizados y descarga con filtros manuales.
- **Gerente / alcalde (o público sin iniciar sesión)**: revisa indicadores y tendencias en el panel epidemiológico.

### Credenciales de prueba
| Perfil | Usuario / contraseña |
|---|---|
| Supervisor | `supervisor` / `123456` |
| Especialista | `especialista` / `654321` |
| Gerente / público | «Continuar sin iniciar sesión» |

## Funcionalidades
- **Carga por foto + OCR**: sube imágenes o toma fotos; la lectura se hace con Gemini y llena la tabla. Si el OCR no está disponible, cae en «modo de ejemplo» para no bloquear la demo.
- **Tomar foto con el celular (QR)**: el escritorio muestra un código QR; el teléfono lo escanea, abre una página para tomar las fotos y las envía a la web. Las fotos se guardan en un Blob **privado**, el escritorio las trae al OCR y luego se borran.
- **Revisión y validación**: tabla editable con resaltado de filas que requieren atención; alerta al validar casos positivos.
- **Búsqueda y descarga**: filtros (fecha, localidad, ColVol, nombre, resultado PDR), exportación a Excel/CSV y envío por correo.
- **API / descarga de datos** (especialista): documentación de endpoints, clave de API y filtro manual con descarga y correo.
- **Panel epidemiológico**: tarjetas nacionales que responden al período (últimas 12 semanas / año 2026), mapa de Colombia en SVG, coropletas locales y gráficos de tendencia.

## Estructura
- `Plan/`: ideación, wireframes y decisiones del proyecto.
- `scr/`: aplicación web en React + Vite + TypeScript.
  - `scr/src/`: SPA (features: `upload`, `search`, `api`, `dashboard`).
  - `scr/api/`: funciones serverless de Vercel (ver más abajo).

## Funciones serverless (`scr/api/`)
Se despliegan automáticamente como `/api/*` en Vercel:

| Endpoint | Función |
|---|---|
| `/api/ocr` | Lee las fotos con Gemini y devuelve las filas. |
| `/api/send-email` | Envía el CSV por correo (Gmail SMTP). |
| `/api/mobile-upload` | Recibe una foto tomada en el celular y la guarda en Blob privado. |
| `/api/mobile-photos` | Lista (para contar) y borra las fotos de una sesión. |
| `/api/mobile-fetch` | Descarga las fotos privadas con el token del store y las entrega al OCR. |

## Variables de entorno (Vercel)
Configúralas en el proyecto de Vercel. Solo aplican a **deploys nuevos** (redeploy tras crearlas):

- `GEMINI_API_KEY` — OCR con Gemini.
- `GMAIL_USER` + `GMAIL_APP_PASSWORD` — envío de correo (usa una *app password* de Gmail, no la contraseña normal).
- **Vercel Blob** — conecta un Blob store (privado) al proyecto. Con la conexión **OIDC** (recomendada) Vercel inyecta `BLOB_STORE_ID` y un token temporal; no hace falta un `BLOB_READ_WRITE_TOKEN` estático.

> Privacidad: las fotos del formato contienen datos de pacientes (PII). En el piloto usa formatos de ejemplo o anonimizados; las fotos del flujo QR se borran del Blob tras importarlas.

## Desarrollo local
```bash
cd scr
npm install
npm run dev
```
> Las funciones de `scr/api/` y las variables de entorno solo corren en Vercel; en local, el OCR cae en «modo de ejemplo» y el flujo QR necesita el sitio desplegado (el teléfono debe abrir la URL pública por HTTPS).

## Despliegue
El push a `main` dispara **GitHub Actions** (`.github/workflows/deploy.yml`), que compila y despliega a Vercel.

Despliegue manual (requiere Vercel CLI):
```bash
cd scr
make deploy
```

## Estado actual
Piloto funcional con OCR, carga por foto (incluyendo QR desde el celular), revisión editable, búsqueda/descarga, API de datos y panel epidemiológico. Pendiente: integración real de autenticación y base de datos persistente.
