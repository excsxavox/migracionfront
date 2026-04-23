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

## Ejecución por lote (Foreach)

Cada fila numerada (**#1**, **#2**, …) en [`changes/migracion-react-a-angular/migration-catalog.md`](./changes/migracion-react-a-angular/migration-catalog.md) es una unidad de trazabilidad para **Foreach**: un agente o iteración puede tomar **un #** a la vez (todo el lote repartiendo ítems). La columna **Tipo** marca **#1** como único `shell` (layout/router de aplicación); el resto son `feature`. La **lista plana** obligatoria ordena la iteración **#4** → **#1** → **#3** → **#2** → **#6** → **#5** (bootstrap global del SPA antes que el shell; ver también [`migration-files-queue.md`](./changes/migracion-react-a-angular/migration-files-queue.md)). [`tasks.md`](./changes/migracion-react-a-angular/tasks.md) alinea olas a esas filas. Los requisitos de paridad frente al legado están en `proposal.md`, `design.md` y deltas bajo `changes/…/specs/`.
