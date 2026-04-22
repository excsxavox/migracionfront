# Tasks — migracion-react-a-angular

Checklist maestro alineado a [migration-catalog.md](./migration-catalog.md). Cada ítem referencia **#** = fila del catálogo.

## Ola 0 — OpenSpec / SDD (este repo)

- [x] 0.1 Particionar dominios: `lineamientos`, `core`, `frontend-shell`, `cotizaciones-ui` bajo `openspec/specs/`.
- [x] 0.2 Añadir deltas mergeables bajo `changes/migracion-react-a-angular/specs/<dominio>/spec.md` para dominios nuevos.
- [x] 0.3 Crear `.cursor/commands/opsx-sync.md` (pasos 1–11, guardrails, discrepancias, cinco `.mdc`).
- [x] 0.4 Crear `.cursor/rules/` canónicos (`estandar`, `reglas-arquitectura`, `testing`, `use-custom-ui-components`, `use-global-color-palette`).
- [x] 0.5 Inicializar `openspec/sync/discrepancies/` y registrar bloqueo de baseline si el legado no es clonable.
- [x] 0.6 Actualizar `proposal.md` (tabla equivalencias + plan vs hecho) y `openspec/specs/README.md`.
- [x] 0.7 Catálogo obligatorio: columnas **# orden**, paths legado/destino, APIs, depende de, paridad diseño, riesgos API/diseño, DoD funcional + visual, olas; enlazado desde `design.md` / `proposal.md` (filas **1–6**).
- [x] 0.8 Catálogo: columna **Tipo** (`shell` en **#1** únicamente; `feature` en **#2–#6**); sección **Lista plana para Foreach** (**#4** → **#1** → **#3** → **#2** → **#6** → **#5**) en [migration-catalog.md](./migration-catalog.md); cola alineada en [migration-files-queue.md](./migration-files-queue.md).

## Ola 1 — Baseline legado e inventario (bloquea paridad fina **#1–6**)

- [ ] 1.1 Clonar `Designcotizacionesmodule` y documentar stack (React, router, estado, HTTP). *Desbloquea columnas «legado» en **#1–6**.* **Bloqueo actual:** discrepancia `LEGACY_REPO_UNAVAILABLE`.
- [ ] 1.2 Completar en [migration-catalog.md](./migration-catalog.md) columnas **Ruta(s) legado**, **Paths componentes legado**, **APIs** y **Tipo** para **#1–6**; sustituir `LEGACY_PATH_PENDING` por rutas reales del clon; rellenar la **Lista plana para Foreach** y [migration-files-queue.md](./migration-files-queue.md) con paths reales del legado (una línea por path bajo cada **#** donde aplique); añadir filas si el SPA legado tiene más pantallas que una sola lista.
- [ ] 1.3 Actualizar tabla de equivalencias en `design.md` y `proposal.md` con rutas y archivos reales del legado (enlace explícito a cada **#**); inventario de tema/tokens y patrones de lista/formulario/dialog a reproducir.
- [ ] 1.4 Refinar deltas bajo `changes/migracion-react-a-angular/specs/` (ADDED/MODIFIED) con escenarios por pantalla; cada requisito nuevo SHOULD citar **#** del catálogo.
- [ ] 1.5 Ejecutar flujo `/opsx:sync` tras clon exitoso; archivar o actualizar `LEGACY_REPO_UNAVAILABLE` si ya no aplica.

## Ola 2 — Destino Angular (implementación vs catálogo **#1–4**, **#6** parcial)

- [x] 2.1 **[#1]** Proyecto Angular en raíz (`angular.json`, `package.json`).
- [x] 2.2 **[#4]** `environment.ts` / `environment.prod.ts`, `proxy.conf.json`, `angular.json`, `src/app/app.config.ts`, estilos globales mínimos (`src/styles.css`, `src/index.html`, `public/`).
- [x] 2.3 **[#1]** Routing y shell: `app.routes.ts`, `MainLayoutComponent`, redirección `/` → `/cotizaciones`.
- [x] 2.3a **[#1]** Revisión de paridad shell **solo destino** (rutas raíz, layout padre, `router-outlet`, navegación) frente a criterios `frontend-shell` y delta; trazabilidad en `design.md` § «Revisión shell destino» + fila **#1** de `migration-catalog.md`. Paridad frente al legado sigue bloqueada por `LEGACY_REPO_UNAVAILABLE` (Ola 1).
- [x] 2.4 **[#2][#3][#4]** Ruta lazy `/cotizaciones` (**#2**/**#4**), listado con loading / error / empty / retry, adaptador HTTP y puerto (**#3**).
- [x] 2.5 **[#2][#4][#6]** Mensajes HTTP saneados (sin HTML crudo en UI) vía `mapHttpErrorToMessage`; mock dev opcional `useCotizacionesMock` + `cotizacionesMockInterceptor` para `GET …/cotizaciones`; documentado en `design.md` y delta/spec canónico.
- [ ] 2.6 **[#1][#2][#4]** Paridad de diseño respecto al legado: revisión visual desktop + viewport estrecho (p. ej. ≤768px); anotar gaps o discrepancias intencionales en `design.md`.

## Ola 3 — Extensión y cierre (**#5**, cierre **#6**, merge specs)

- [ ] 3.1 **[#5]** Por cada ruta/feature adicional inventariada en el legado: fila en catálogo, rutas destino, tareas y delta.
- [ ] 3.2 **[#1–6]** Checklist de aceptación por ola completada (funcional + visual según catálogo); escenarios Given/When/Then en deltas `changes/migracion-react-a-angular/specs/<dominio>/spec.md` y checklist de verificación en `design.md`; pruebas en `AppComponent` y `CotizacionesListComponent` según `.cursor/rules/testing.mdc`.
- [x] 3.2a **[#1][#2][#4][#6]** QA: matriz requisito ↔ test y comandos en `design.md` (sección **QA**); trazabilidad en `src/bootstrap.spec.ts`, `scripts/verify-bootstrap.mjs`, y comentarios en `main-layout.component.spec.ts`, `app.routes.integration.spec.ts`, `cotizaciones-list.component.spec.ts`, `http-error.mapper.spec.ts`.

## QA — comandos y regresión rápida

- **Unit / integración ligera:** `npm run test` o `npx ng test --no-watch --browsers=ChromeHeadless` (incluye `src/bootstrap.spec.ts` trazado a **#4** en delta `frontend-shell`)
- **Bootstrap estático (#4):** `npm run verify:bootstrap` (`scripts/verify-bootstrap.mjs` — `index.html`, `styles.css`, `public/`)
- **Build:** `npm run build`
- **Manual antes de cerrar migración:** revisión visual **2.6** (legado vs destino) cuando exista baseline; hasta entonces solo checklist de shell/listado/error documentado en `design.md` § QA.
- [ ] 3.3 Actualizar specs canónicos `openspec/specs/` o archivar este cambio según flujo OpenSpec de merge de deltas.
