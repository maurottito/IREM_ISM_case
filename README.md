# IREM ISM Case

Plataforma piloto para registrar, revisar y analizar diagnósticos de malaria a partir de formularios en papel fotografiados por el supervisor.

## Usuarios
El producto está pensado para tres perfiles:

- Supervisor: sube las fotos, revisa la extracción y corrige los datos antes de guardar.
- Especialista servidor público: consulta la información consolidada y trabaja con los registros.
- Gerente o alcalde: revisa indicadores y tendencias para la toma de decisiones.

## Estructura
- `Plan/`: ideación, wireframes y decisiones del proyecto.
- `scr/`: aplicación web en React, Vite y TypeScript.

## Desarrollo local
```bash
cd scr
npm install
npm run dev
```

## Despliegue manual
```bash
cd scr
make deploy
```

## Estado actual
El repositorio contiene un starter funcional alineado con los wireframes y preparado para seguir con la integración real de autenticación, base de datos y OCR.