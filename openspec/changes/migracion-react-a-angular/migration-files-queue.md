# Cola plana — migración por archivo (Foreach)

**Cambio:** `migracion-react-a-angular`  
**Orden:** alineado a [migration-catalog.md](./migration-catalog.md): **#1** y **#2** (`shell`), luego **#3–#6** (`feature`).

**Dato:** el remoto legado responde *repository not found*; el prefijo `BLOQUEADO_LEGACY_REPO_UNAVAILABLE/` es **sustituible en Ola 1** por rutas relativas al repo legado (ver `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md`).

Líneas consumibles por el motor (formato Foreach, una por ítem):

1. BLOQUEADO_LEGACY_REPO_UNAVAILABLE/#1-shell-router-layout — shell — src/app/app.routes.ts; src/app/shell/layout/main-layout.component.ts
2. BLOQUEADO_LEGACY_REPO_UNAVAILABLE/#2-env-proxy-global-styles — shell — src/environments/environment.ts; src/environments/environment.prod.ts; proxy.conf.json; src/styles.css; src/index.html
3. BLOQUEADO_LEGACY_REPO_UNAVAILABLE/#3-http-client-cotizaciones — feature — src/app/infrastructure/adapters/cotizaciones.http-adapter.ts; src/app/app.config.ts
4. BLOQUEADO_LEGACY_REPO_UNAVAILABLE/#4-cotizaciones-list — feature — src/app/features/cotizaciones/pages/cotizaciones-list/; src/app/features/cotizaciones/cotizaciones.routes.ts
5. BLOQUEADO_LEGACY_REPO_UNAVAILABLE/#6-resilience-errors-mock — feature — src/app/infrastructure/http/http-error.mapper.ts; src/app/features/cotizaciones/pages/cotizaciones-list/; src/app/infrastructure/interceptors/cotizaciones-mock.interceptor.ts
6. BLOQUEADO_LEGACY_REPO_UNAVAILABLE/#5-additional-routes — feature — src/app/features/<por-definir>/

**Inferencia:** **#6** va antes que **#5** en esta cola porque el listado (**#4**) y el contrato HTTP (**#3**) deben contrastar resiliencia con el legado antes de ampliar rutas (**#5**). Si el inventario legado muestra que errores comparten módulos con otra pantalla, agrupar paths con `; ` en la misma línea en Ola 1.

Tras clon exitoso: reemplazar cada prefijo `BLOQUEADO_LEGACY_REPO_UNAVAILABLE/…` por la ruta o rutas relativas al repo legado, manteniendo **shell antes que feature** y el orden **#1 → #2 → #3 → #4 → #6 → #5** salvo decisión documentada en `design.md`.
