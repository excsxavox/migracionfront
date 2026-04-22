# Tasks — migracion-react-a-angular

Checklist maestro alineado a [migration-catalog.md](./migration-catalog.md). Cada ítem referencia **#** = fila del catálogo.

## Ola 0 — OpenSpec / SDD (este repo)

- [x] 0.1 Particionar dominios: `lineamientos`, `core`, `frontend-shell`, `cotizaciones-ui` bajo `openspec/specs/`.
- [x] 0.2 Añadir deltas mergeables bajo `changes/migracion-react-a-angular/specs/<dominio>/spec.md` para dominios nuevos.
- [x] 0.3 Crear `.cursor/commands/opsx-sync.md` (pasos 1–11, guardrails, discrepancias, cinco `.mdc`).
- [x] 0.4 Crear `.cursor/rules/` canónicos (`estandar`, `reglas-arquitectura`, `testing`, `use-custom-ui-components`, `use-global-color-palette`).
- [x] 0.5 Inicializar `openspec/sync/discrepancies/` y registrar bloqueo de baseline si el legado no es clonable.
- [x] 0.6 Actualizar `proposal.md` (tabla equivalencias + plan vs hecho) y `openspec/specs/README.md`.
- [x] 0.7 Catálogo obligatorio: columnas **# orden**, DoD funcional + visual, dependencias y olas; enlazado desde `design.md` / `proposal.md` (filas **1–6**).

## Ola 1 — Baseline legado e inventario (bloquea paridad fina **#1–6**)

- [ ] 1.1 Clonar `Designcotizacionesmodule` y documentar stack (React, router, estado, HTTP). *Desbloquea columnas «legado» en **#1–6**.*
- [ ] 1.2 Completar en [migration-catalog.md](./migration-catalog.md) columnas **Ruta(s) legado**, **Paths componentes legado**, **APIs** para **#1–6**; añadir filas si el SPA legado tiene más pantallas que una sola lista.
- [ ] 1.3 Actualizar tabla de equivalencias en `design.md` y `proposal.md` con rutas y archivos reales del legado (enlace explícito a cada **#**).
- [ ] 1.4 Refinar deltas bajo `changes/migracion-react-a-angular/specs/` (ADDED/MODIFIED) con escenarios por pantalla; cada requisito nuevo SHOULD citar **#** del catálogo.
- [ ] 1.5 Ejecutar flujo `/opsx:sync` tras clon exitoso; archivar o actualizar `LEGACY_REPO_UNAVAILABLE` si ya no aplica.

## Ola 2 — Destino Angular (implementación vs catálogo **#1–4**, **#6** parcial)

- [x] 2.1 **[#1]** Proyecto Angular en raíz (`angular.json`, `package.json`).
- [x] 2.2 **[#4]** `environment.ts` / `environment.prod.ts` y `proxy.conf.json` (placeholder; ajustar tras **1.2**).
- [x] 2.3 **[#1]** Routing y shell: `app.routes.ts`, `MainLayoutComponent`, redirección `/` → `/cotizaciones`.
- [x] 2.4 **[#2][#3]** Ruta lazy `/cotizaciones`, listado con loading / error / empty / retry, adaptador HTTP y puerto.
- [ ] 2.5 **[#6]** Decidir y documentar en `design.md` estrategia si API falta: interceptor mock, `HttpClient` test double o solo mensajes; implementar lo acordado (evitar respuesta 500 cruda en UI).
- [ ] 2.6 **[#1][#2]** Paridad de diseño respecto al legado: revisión visual desktop + viewport estrecho; anotar gaps o discrepancias intencionales en `design.md`.

## Ola 3 — Extensión y cierre (**#5**, cierre **#6**, merge specs)

- [ ] 3.1 **[#5]** Por cada ruta/feature adicional inventariada en el legado: fila en catálogo, rutas destino, tareas y delta.
- [ ] 3.2 **[#1–6]** Checklist de aceptación por ola completada (funcional + visual según catálogo).
- [ ] 3.3 Actualizar specs canónicos `openspec/specs/` o archivar este cambio según flujo OpenSpec de merge de deltas.
