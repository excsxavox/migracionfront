# Core — Alcance del repositorio y migración

## Purpose

El repositorio **destino** ([migracionfront](https://github.com/excsxavox/migracionfront)) existe para alojar la aplicación front resultante de la **migración desde React (legado) hacia Angular**, manteniendo alineación con el **contrato observable** del sistema anterior salvo desviaciones explícitamente documentadas en propuestas o `design.md` de cambios activos.

**Referencia legado (baseline de comportamiento):** repositorio indicado por el flujo de migración — `https://github.com/Fer-Nexti/Designcotizacionesmodule` (inventario de rutas, módulos y pantallas debe contrastarse con un clon local del legado; no sustituir por suposición).

## Requirements

### Requirement: Trazabilidad legado → destino

El proyecto SHALL documentar, en artefactos OpenSpec (`proposal.md`, `design.md` o deltas bajo `changes/<id>/specs/`), las **equivalencias** entre elementos del legado (rutas UI, nombres de módulos o carpetas, pantallas) y su contraparte en el destino, o SHALL marcar explícitamente cuando una capacidad **existía**, **deja de existir** o **cambia** respecto al origen.

#### Scenario: Nueva capacidad documentada

- GIVEN una funcionalidad nueva en el destino sin equivalente en el legado
- WHEN se describe en un cambio o spec
- THEN se indica que **no existía** en el sistema anterior

#### Scenario: Paridad o desviación

- GIVEN un flujo de usuario ya presente en el legado
- WHEN se implementa o se modifica en Angular
- THEN el comportamiento observable es el mismo **o** la desviación está registrada en `design.md` o en la sección de discrepancias del cambio
