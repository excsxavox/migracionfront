# Especificaciones canónicas (`openspec/specs/`)

Este directorio es la **fuente de verdad** del comportamiento acordado del producto en el repositorio destino, según el modelo OpenSpec ([conceptos](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)).

## Dominios

| Dominio | Archivo | Alcance |
|--------|---------|---------|
| `lineamientos/` | [lineamientos/spec.md](./lineamientos/spec.md) | Convenciones OpenSpec en este repo, sync `/opsx:sync`, alineación con reglas `.mdc` y discrepancias. |
| `core/` | [core/spec.md](./core/spec.md) | Alcance del proyecto destino, vínculo con el sistema legado y expectativas de paridad en la migración React → Angular. |
| `frontend-shell/` | [frontend-shell/spec.md](./frontend-shell/spec.md) | Layout, routing y estados globales observables del contenedor Angular vs shell React del legado. |
| `cotizaciones-ui/` | [cotizaciones-ui/spec.md](./cotizaciones-ui/spec.md) | Módulo de cotizaciones en UI: flujos y contratos HTTP **observables** desde el cliente (backend asumido existente). |

Los dominios pueden ampliarse con nuevas carpetas bajo `openspec/specs/<dominio>/` cuando aparezcan módulos reales en código; evitar duplicar el mismo alcance en dos `spec.md`.

### Antes de codificar

- **Routing, menú, layout:** `frontend-shell/spec.md`  
- **Flujos de cotización:** `cotizaciones-ui/spec.md`  
- **Convenciones y sync:** `lineamientos/spec.md`  
- **Trazabilidad global legado → destino:** `core/spec.md`

## Sync y discrepancias

- [sync/discrepancies/](../sync/discrepancies/README.md) — bloqueos de baseline, divergencias código ↔ reglas ↔ specs y decisiones frente al legado.

## Cambio activo (migración React → Angular)

- Carpeta del cambio: [`openspec/changes/migracion-react-a-angular/`](../changes/migracion-react-a-angular/) (`proposal.md`, `design.md`, `tasks.md`, deltas en `specs/<dominio>/spec.md`).
- Catálogo por filas y olas: [migration-catalog.md](../changes/migracion-react-a-angular/migration-catalog.md) (IDs **CAT-001…**; columnas legado **pendientes de inventario** mientras aplique la discrepancia de baseline).
