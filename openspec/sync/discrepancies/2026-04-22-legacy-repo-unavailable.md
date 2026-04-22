# LEGACY_REPO_UNAVAILABLE

**Fecha:** 2026-04-22  
**Severidad:** mayor (bloquea inventario fino hasta acceso Git)

## Hallazgo

El remoto `https://github.com/Fer-Nexti/Designcotizacionesmodule` responde **repository not found** desde el entorno de comprobación (`git ls-remote`), por lo que no se puede completar aún la tabla de equivalencias a nivel de rutas y archivos React.

## Specs afectados

- `openspec/specs/frontend-shell/spec.md` — baseline de rutas pendiente  
- `openspec/specs/cotizaciones-ui/spec.md` — baseline de pantallas pendiente  
- `openspec/changes/migracion-react-a-angular/design.md` — filas concretas pendientes

## Reglas afectadas

- Ninguna contradicha; `testing.mdc` y specs dependen de baseline para casos finos.

## Acción propuesta

1. Obtener acceso Git al legado o un artefacto exportado (zip, mirror, tag).  
2. Ejecutar `/opsx:sync` pasos 1–4 del comando en `.cursor/commands/opsx-sync.md`.  
3. Resolver o archivar esta discrepancia cuando exista al menos un inventario verificable (rutas + componentes principales).
