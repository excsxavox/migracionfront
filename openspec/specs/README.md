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
