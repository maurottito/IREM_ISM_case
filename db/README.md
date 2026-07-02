# Base de datos — Vigilancia de malaria (ISM/RMEI)

Proyecto **Python** que define el **esquema PostgreSQL** (SQLAlchemy 2.0),
las **migraciones** (Alembic) y el **seed** con los mismos datos de muestra que
hoy usa el frontend. **No modifica la web**: la app sigue en TypeScript
(funciones serverless en `scr/api/*.ts`); este proyecto solo construye y puebla
la base de datos.

> Diseño de referencia: [`../Plan/DATA_MODEL.md`](../Plan/DATA_MODEL.md).

## Estructura

```
db/
├── malaria_db/
│   ├── enums.py         # tipos ENUM del dominio
│   ├── models.py        # tablas SQLAlchemy 2.0 (esquema DATA_MODEL.md + snapshots *_demo)
│   ├── database.py      # engine/sesión desde DATABASE_URL (Neon/Vercel/Supabase/local)
│   ├── seed_data.py     # datos de muestra copiados 1:1 del frontend (mock.ts, regionDistricts)
│   └── seed.py          # lógica de seed idempotente
├── migrations/          # Alembic (env.py + versions/)
├── manage.py            # CLI: check-ddl / init-db / seed / reset / drop-all
├── alembic.ini
├── pyproject.toml · requirements.txt · .env.example
```

## Qué se puebla (datos de muestra del frontend)

| Tabla                     | Origen en el frontend                          |
|---------------------------|------------------------------------------------|
| `department` (10)         | nombres del SVG + código DANE; `svg_path` leído de `colombia-departments.ts` |
| `municipality` (62)       | `regionDistricts` (DANE sintético, demo)       |
| `locality` (7)            | localidades de los registros (corregimientos de Tumaco) |
| `app_user` (3)            | `identities` (supervisor/especialista/gerente); contraseñas demo con hash argon2 |
| `colvol` (4)              | ColVol-01..04                                  |
| `treatment_scheme` (3)    | Cloroquina / Primaquina / combinado            |
| `patient` + `diagnostic_record` (14) | `reviewRows` (draft/flagged) + `searchRows` (validated) |
| `department_population`   | poblaciones aproximadas 2026 (para tasas)      |
| `region_stat_demo` (10)   | `regionData` (casos, positividad, localidades, tendencia) |
| `district_stat_demo` (62) | `regionDistricts` (casos por distrito)         |
| `epi_series_demo` (24)    | series semanales y mensuales del panel         |

Las tablas `*_demo` guardan **tal cual** las cifras agregadas que la web tiene
hardcodeadas. En producción se calcularían desde `diagnostic_record`; aquí se
almacenan para que la base refleje exactamente lo que muestra la UI.

## Puesta en marcha

### 1. Instalar dependencias

```bash
cd db
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Verificar el esquema SIN base de datos (offline)

Compila el DDL al dialecto PostgreSQL. No necesita conexión:

```bash
python manage.py check-ddl
```

### 3. Aprovisionar Postgres y configurar la conexión

- **Neon (recomendado con Vercel):** en el dashboard de Vercel → *Storage* →
  *Create Database* → **Neon**. Copia la *connection string*.
- Alternativas: Supabase o un Postgres local.

```bash
cp .env.example .env
# edita .env y pega tu cadena en DATABASE_URL
```

El código acepta los esquemas `postgres://`, `postgresql://` y
`postgresql+psycopg://` y fuerza el driver psycopg 3.

### 4. Crear el esquema y poblar

Opción rápida (crea todo el esquema de una vez con `create_all`):

```bash
python manage.py init-db
python manage.py seed
```

Opción con migraciones versionadas (recomendada a mediano plazo):

```bash
alembic revision --autogenerate -m "esquema inicial"
alembic upgrade head
python manage.py seed
```

Para reconstruir desde cero (**borra todo**):

```bash
python manage.py reset
```

El seed es **idempotente**: correrlo dos veces no duplica filas.

## Credenciales demo (coinciden con el login de la web)

| Usuario        | Contraseña | Rol         |
|----------------|------------|-------------|
| `supervisor`   | `123456`   | supervisor  |
| `especialista` | `654321`   | specialist  |

Las contraseñas se guardan **hasheadas** (argon2), nunca en texto plano.

## Notas

- **Runtime intacto:** la web no consume este proyecto Python. Cuando se conecte
  la app a la base, será desde las funciones serverless TS leyendo la misma
  `DATABASE_URL`.
- **Sin PostGIS (v1):** la geometría se guarda como `svg_path` (texto). Migrar a
  `geometry` + PostGIS queda como trabajo futuro.
- **DANE sintético:** los códigos de municipio son de relleno salvo el
  departamento. La importación de DIVIPOLA real queda pendiente.
- **PII:** `patient` aísla los datos personales; la API pública debe exponerse
  vía una vista anonimizada (`v_public_record` en DATA_MODEL.md).
