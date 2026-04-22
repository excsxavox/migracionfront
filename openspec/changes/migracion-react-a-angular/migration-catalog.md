# Catálogo de migración — legado → destino

**Cambio:** `migracion-react-a-angular`  
**Origen (baseline):** `https://github.com/Fer-Nexti/Designcotizacionesmodule`  
**Destino:** `https://github.com/excsxavox/migracionfront`  

Cada fila es una unidad de trazabilidad (ruta UI, feature o componente principal). Las columnas **Legado** SHALL completarse tras clon e inventario; hasta entonces el estado refleja **laguna de baseline** documentada en `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md`.

| ID | Legado (ruta / feature / componente) | Destino (Angular) | Ola | Estado | Notas |
|----|----------------------------------------|---------------------|-----|--------|--------|
| CAT-001 | *Pendiente: shell / layout raíz React* | `src/app/shell/layout/main-layout.component.ts`, `src/app/app.routes.ts` | 2 | **Implementado (destino)** | Redirección `/` → `/cotizaciones`. Paridad fina de copy y navegación pendiente de legado. |
| CAT-002 | *Pendiente: listado cotizaciones en React* | `src/app/features/cotizaciones/pages/cotizaciones-list/` (lazy `/cotizaciones`) | 2 | **Implementado (destino)** | Estados loading / error / empty. Contrato HTTP a contrastar con hooks/servicios del legado. |
| CAT-003 | *Pendiente: cliente HTTP cotizaciones (legado)* | `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts`, `CotizacionesPort` | 2 | **Implementado (destino)** | `GET` `{apiUrl}/cotizaciones`; normalización array / `{ data }`. Ajustar path y DTO al baseline. |
| CAT-004 | *Pendiente: env / proxy desarrollo legado* | `src/environments/environment.ts`, `proxy.conf.json` | 2 | **Placeholder** | Sin secretos en repo; proxy apunta a `http://localhost:3000` por defecto. |
| CAT-005 | *Pendiente: rutas y módulos adicionales del SPA legado* | *Por definir bajo `src/app/features/…`* | 3+ | **No iniciado** | Añadir filas por cada ruta React real cuando exista inventario. |

### Uso en olas

Las **olas** alinean este catálogo con `tasks.md`: **ola 0** (OpenSpec/SDD), **ola 1** (baseline legado + deltas), **ola 2** (implementación destino por feature), **ola 3** (verificación y cierre de cambio). Las filas CAT-001…004 cubren el alcance actual del destino; el inventario del legado SHALL desdoblar o fusionar filas sin perder trazabilidad.
