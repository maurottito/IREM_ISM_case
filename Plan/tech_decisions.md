## Decisiones técnicas del piloto

### 1. Contexto que guía las decisiones
- El ColVol llena formularios en papel.
- El supervisor recibe las fotos o los documentos y transcribe desde su computadora.
- El flujo debe acelerar la digitación, reducir errores y permitir validación manual.
- El volumen inicial es bajo: alrededor de 5,000 hojas al año.
- La solución debe servir a supervisores, especialistas y gerencia sobre una misma base de datos.

### 2. Decisiones tecnológicas
#### Frontend
- **React + Vite + TypeScript**.

#### Formularios y validación
- **React Hook Form + Zod**.

#### Backend y base de datos
- **Supabase** como backend gestionado.
- **PostgreSQL** como base relacional principal.

#### Autenticación y archivos
- **Supabase Auth** para usuarios y roles.
- **Supabase Storage** para guardar fotos y documentos.

#### OCR
- **Azure AI Document Intelligence** como motor principal de OCR asistido.

#### Hosting
- **Vercel** para desplegar el frontend.

#### Exportación
- **Excel y CSV** desde la interfaz como salida principal para seguimiento y consolidación.

### 3. Por qué se eligieron estas tecnologías
#### React + Vite + TypeScript
- Permite construir rápido una interfaz de escritorio con tablas, filtros y pantallas de revisión.
- Vite reduce el tiempo de arranque y facilita iterar sobre los wireframes.
- TypeScript ayuda a evitar errores de estructura en datos sensibles.

#### React Hook Form + Zod
- Encajan bien con formularios largos y validaciones frecuentes.
- Reducen el trabajo manual de manejo de estado y validación.
- Ayudan a controlar los campos que se llenan desde OCR y los que corrige el supervisor.

#### Supabase + PostgreSQL
- Evitan construir desde cero autenticación, permisos, API y persistencia.
- PostgreSQL es más natural para datos tabulares, consultas por fecha, localidad, resultado y consolidación.
- Supabase simplifica el mantenimiento del piloto y reduce la carga DevOps.

#### Supabase Auth + Storage
- Auth centraliza el control de acceso por rol.
- Storage resuelve el guardado de fotos sin montar infraestructura adicional.

#### Azure AI Document Intelligence
- El insumo real son fotos de formularios y el OCR debe devolver campos estructurados.
- Es más adecuado que un OCR genérico para formularios fotografiados.
- Permite usar el OCR como asistente de captura, no como fuente final de verdad.

#### Vercel
- Es suficiente para el frontend del piloto.
- Simplifica despliegues, previews y publicación sin complejidad operativa.

### 4. Otras opciones evaluadas
#### Firebase
- Se evaluó, pero se descartó como opción principal porque el modelo relacional y la consolidación tabular encajan mejor en PostgreSQL.

#### Next.js
- Es una opción sólida, pero no es necesaria para este piloto.
- Agrega complejidad que no aporta valor real si no se requiere SSR, SEO ni rutas avanzadas.

#### Flutter o React Native
- Se descartaron porque el usuario principal trabaja en computador, no en una app móvil.
- También implican una capa adicional que no resuelve una necesidad real del piloto.

#### Tesseract
- Se evaluó como OCR, pero se descartó como motor principal porque suele rendir peor con formularios fotografiados y escritura mixta.

#### Backend propio con Node/Express
- Se descartó para el piloto porque aumenta tiempo de desarrollo, mantenimiento y superficie de errores.

#### AWS / Azure / GCP full custom
- Se descartaron como arquitectura inicial porque añaden costo operativo y complejidad innecesaria para un piloto pequeño.

### 5. Criterio de OCR y validación
- El OCR no reemplaza al supervisor.
- El sistema debe leer las fotos y proponer campos prellenados.
- El supervisor revisa, corrige y valida antes de consolidar.
- Si un campo tiene baja confianza, debe resaltarse para revisión manual.
- La edición manual siempre debe estar disponible para no bloquear el flujo.

### 6. Alcance técnico del piloto
- Carga de fotos.
- Prellenado asistido por OCR.
- Revisión y corrección tabular.
- Búsqueda y filtros.
- Exportación a Excel y CSV.
- Panel epidemiológico básico.
- Acceso por roles: supervisor, especialista y gerente.

### 7. Lo que se excluye por ahora
- App móvil nativa.
- Flujos offline complejos.
- Analítica avanzada.
- Arquitectura empresarial pesada.

### 8. Resultado esperado
La combinación recomendada para el piloto es una web app de escritorio construida en React + Vite + TypeScript, respaldada por Supabase y PostgreSQL, con OCR asistido en Azure AI Document Intelligence. Esta selección prioriza rapidez de desarrollo, bajo mantenimiento y ajuste directo al flujo real de supervisión con fotos de formularios en papel.
