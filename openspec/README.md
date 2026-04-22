# OpenSpec en este repositorio

Este directorio sigue el modelo **OpenSpec** (cambios propuestos, deltas y specs canónicos). Guía de conceptos: [OpenSpec — concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md).

## Repositorios de la migración

| Rol | Repositorio |
|-----|-------------|
| **Origen (legado, baseline)** | `https://github.com/Fer-Nexti/Designcotizacionesmodule.git` |
| **Destino (este repo)** | `https://github.com/excsxavox/migracionfront.git` |

El comportamiento esperado del destino SHALL alinearse con el **contrato observable del legado**; las lagunas de baseline (p. ej. legado no clonable) van en `openspec/sync/discrepancies/`.

## Contenido

| Ruta | Uso |
|------|-----|
| [`specs/`](./specs/README.md) | Specs canónicos por dominio (`core`, `lineamientos`, `frontend-shell`, `cotizaciones-ui`). |
| [`changes/migracion-react-a-angular/`](./changes/migracion-react-a-angular/proposal.md) | Cambio activo: `proposal.md`, `design.md`, [`migration-catalog.md`](./changes/migracion-react-a-angular/migration-catalog.md), [`tasks.md`](./changes/migracion-react-a-angular/tasks.md), deltas en `specs/<dominio>/spec.md`. |
| [`sync/discrepancies/`](./sync/discrepancies/README.md) | Bloqueos y divergencias documentadas. |

Los agentes de implementación SHOULD leer primero el cambio activo y el catálogo (**#** por fila) antes de ampliar código bajo `src/`.
