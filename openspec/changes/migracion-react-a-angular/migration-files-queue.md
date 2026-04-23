# Cola plana — archivos legado para Foreach

**Cambio:** `migracion-react-a-angular`  
**Origen:** `https://github.com/Fer-Nexti/Designcotizacionesmodule`  
**Formato Foreach:** misma semántica que la sección «Lista plana para Foreach» en [migration-catalog.md](./migration-catalog.md) (orden **#4 → #1 → #3 → #2 → #6 → #5**).

Mientras `LEGACY_REPO_UNAVAILABLE` aplique, la primera columna SHALL ser **`LEGACY_PATH_PENDING`** hasta que **Ola 1** sustituya por rutas relativas al repo legado (p. ej. `src/App.tsx`).

1. `LEGACY_PATH_PENDING` — feature — destino previsto **#4** `src/environments/`; `proxy.conf.json`; `src/styles.css`; `src/index.html`; `angular.json`; `public/`; registro interceptors en `src/app/app.config.ts`
2. `LEGACY_PATH_PENDING` — shell — destino previsto **#1** `src/app/app.routes.ts`; `src/app/shell/layout/main-layout.component.ts`
3. `LEGACY_PATH_PENDING` — feature — destino previsto **#3** `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts`; `src/app/core/ports/cotizaciones.port.ts`; `src/app/app.config.ts`
4. `LEGACY_PATH_PENDING` — feature — destino previsto **#2** `src/app/features/cotizaciones/cotizaciones.routes.ts`; `src/app/features/cotizaciones/pages/cotizaciones-list/`
5. `LEGACY_PATH_PENDING` — feature — destino previsto **#6** `src/app/infrastructure/http/http-error.mapper.ts`; estados error en `src/app/features/cotizaciones/pages/cotizaciones-list/`; `src/app/infrastructure/interceptors/cotizaciones-mock.interceptor.ts`
6. `LEGACY_PATH_PENDING` — feature — destino previsto **#5** *por inventario* bajo `src/app/features/…` (una línea o grupo por pantalla tras catálogo)
