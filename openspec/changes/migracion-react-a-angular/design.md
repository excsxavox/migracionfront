# Design: Migración React → Angular

## Baseline observable (legado)

Hasta completar un inventario sobre un **clon local** de `Designcotizacionesmodule`, los requisitos de paridad se formulan a nivel de principio en `openspec/specs/core/spec.md` y en los deltas de este cambio. El nombre del repositorio legado sugiere un dominio de **cotizaciones**; la estructura exacta de carpetas, bundler y biblioteca UI **no debe asumirse** sin lectura del código.

## Equivalencias legado → destino (borrador)

Cada fila enlaza al catálogo por **#** (ver [migration-catalog.md](./migration-catalog.md)).

| # | Legado (origen) | Destino (Angular) | Notas |
|---|-----------------|-------------------|--------|
| **#1** | *TBD: layout raíz y rutas del SPA React (tras inventario)* | `src/app/shell/layout/main-layout.component.ts`, `src/app/app.routes.ts` | Raíz redirige a `/cotizaciones`. Paridad de copy/enlaces cuando exista clon del legado. |
| **#2** | *TBD: pantalla y rutas de listado de cotizaciones en el legado* | `src/app/features/cotizaciones/cotizaciones.routes.ts`; `src/app/features/cotizaciones/pages/cotizaciones-list/` (`.ts`, `.html`, `.css`) | Ruta lazy bajo `/cotizaciones`; `title` en ruta hija del feature; estados carga / error con reintentar / vacío / datos; estilos con tokens globales `var(--app-*)`; depende de **#1**, **#3**, **#4**. Paridad visual y copy vs legado en Ola 1 (catálogo maestro [migration-catalog.md](./migration-catalog.md)). |
| **#3** | *TBD: cliente HTTP / hooks que obtengan cotizaciones* | `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts` implementando `CotizacionesPort`; tokens `API_BASE_URL`, `COTIZACIONES_LIST_RELATIVE_PATH`; `environment*.ts` (`cotizacionesListRelativePath`) | `GET` como `{apiUrl}{cotizacionesListRelativePath}` (por defecto `/cotizaciones`). Normaliza array plano o envolturas comunes. Errores hacia `mapHttpErrorToMessage` (**#6**). |
| **#4** | *TBD: variables de entorno, proxy y estilos globales del legado* | `src/environments/environment.ts`, `environment.prod.ts`, `proxy.conf.json`, `angular.json`, `src/styles.css`, `src/index.html`, `public/`, `src/app/app.config.ts` | Sin secretos en cliente. Proxy: prefijo `/api` → `http://localhost:3000` con `pathRewrite` de `/api` a raíz del backend (ajustar al backend real). Mock opcional en dev (**#6**): `useCotizacionesMock` + `cotizacionesMockInterceptor` registrados vía `provideHttpClient` en `app.config.ts`; desactivar con API real. |
| **#5** | *TBD: rutas/pantallas del SPA legado no cubiertas por el listado **#2*** | *Por definir* bajo `src/app/features/…` (convención: `src/app/features/<dominio>/` + rutas lazy + `pages/…` por pantalla) | **Último paso** de la [Lista plana para Foreach](./migration-catalog.md) (**#4**→**#1**→**#3**→**#2**→**#6**→**#5**). Cada pantalla adicional: fila en [migration-catalog.md](./migration-catalog.md), línea en [migration-files-queue.md](./migration-files-queue.md), subchecklist **3.1a–f** en [tasks.md](./tasks.md), delta `cotizaciones-ui` / `frontend-shell` si aplica. Sin clon legado no hay baseline verificable (`LEGACY_REPO_UNAVAILABLE`). |
| **#6** | *TBD: manejo de fallos API en legado* | `mapHttpErrorToMessage` + UI de error en listado; `cotizacionesMockInterceptor` (dev, bandera `useCotizacionesMock`) | Mensajes controlados: no HTML del servidor como contenido principal; mock dev documentado para API ausente (**#4** + **#6**). |

**Catálogo maestro (DoD, dependencias, olas, riesgos):** [migration-catalog.md](./migration-catalog.md) — filas **#1–#6**; ampliar **#5** al completar inventario del legado.

**Riesgo API (resumen):** el adaptador asume `GET` bajo `{apiUrl}{cotizacionesListRelativePath}` (por defecto `/cotizaciones`) hasta contrastar con el legado (**hipótesis**); si el backend devuelve HTML en errores, la política de mensajes (**#6**, `http-error.mapper` y spec canónico) SHALL evitar mostrar ese HTML crudo en la UI.

**Riesgo diseño:** el destino no declara Material ni otro DS en dependencias; la paridad visual con el legado depende de inventario de tokens y componentes React (**inferencia:** sin ese inventario, **#1**, **#2**, **#4** y **#5** tienen riesgo de deriva visual).

**Plan vs hecho:** la estructura SDD (dominios `lineamientos`, `frontend-shell`, `cotizaciones-ui`) y el comando `/opsx:sync` están **hechos** en el repo destino; las filas concretas de rutas/componentes siguen **plan — pendiente** por acceso al legado (véase discrepancia `LEGACY_REPO_UNAVAILABLE`). El catálogo incorpora columna **Tipo** y orden **shell** primero (**hecho** en OpenSpec).

### Discrepancias intencionales

Ninguna registrada aún. Cualquier cambio respecto al legado SHALL listarse aquí con justificación.

### Discrepancias no intencionales / bloqueos

- **LEGACY_REPO_UNAVAILABLE:** remoto del legado no accesible públicamente; ver `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md`.

### Revisión shell destino (**#1**, solo criterios destino)

Mientras el baseline React no sea contrastable, la revisión se limita a `openspec/specs/frontend-shell/spec.md` (shell accesible, raíz → cotizaciones) y a la implementación en `app.routes.ts` + `MainLayoutComponent`. **No se afirma equivalencia** con el legado.

| Criterio destino (observable) | Hallazgo |
|-------------------------------|----------|
| Raíz `/` redirige al flujo cotizaciones | Cumple: `redirectTo: 'cotizaciones'` bajo layout `''`; URL final `/cotizaciones`. |
| Layout padre + `router-outlet` para rutas hijas | Cumple: `MainLayoutComponent` envuelve hijos; `<router-outlet />` en `<main id="main-content">`. |
| Ruta comodín no deja pantalla huérfana | Cumple: `**` → `''` (reentra al layout y redirección a cotizaciones). |
| Cabecera, marca y enlace al dominio cotizaciones | Cumple: cabecera con marca y nav a `/cotizaciones`; marca e «Inicio» marcan activo en ruta cotizaciones (`routerLinkActive`). |
| Accesibilidad: skip link, foco visible, regiones semánticas | Cumple: skip link a `#main-content`; `role="banner"`; `aria-label` en nav; estilos `:focus-visible` / skip-link enfocable. |
| Título de documento coherente con el producto | Ajustado: `index.html` `lang="es-MX"`, `<title>Cotizaciones</title>`; rutas con `title` para pestaña del navegador. |
| Paridad rutas/copy/layout vs legado | **No contrastable** hasta inventario (catálogo **#1** columnas legado TBD; discrepancia `LEGACY_REPO_UNAVAILABLE`). |

## Strangler y orden de sustitución (módulo a módulo)

Alineado a la **Lista plana para Foreach** en [migration-catalog.md](./migration-catalog.md) (**#4** → **#1** → **#3** → **#2** → **#6** → **#5**):

1. **Bootstrap global** (entorno, proxy, estilos, `app.config`) — catálogo **#4**.
2. **Shell y routing** del legado → `frontend-shell` en Angular (layout, outlet, guards visibles) — catálogo **#1**.
3. **Cliente HTTP cotizaciones** — catálogo **#3**.
4. **Pantalla listado** y estilos de módulo — catálogo **#2**.
5. **Errores y mock dev** — catálogo **#6** (mapper + interceptor + estados en vista).
6. **Módulos satélite** — catálogo **#5**.

**#5 (rutas adicionales):** no forma parte de la lista plana hasta haber cerrado **#4**, **#1**, **#3**, **#2** y **#6** para el alcance ya conocido. Cada ejecución Foreach sobre **#5** SHALL tratar **una** pantalla o módulo SPA del legado inventariado en **Ola 1** (rutas React, paths de componentes, APIs) y SHALL dejar trazabilidad en catálogo, cola plana, `tasks.md` (Ola 3, **3.1**) y deltas antes de implementar bajo `src/app/features/…`.

**Feature flags:** SHOULD usarse solo para coexistencia temporal o despliegue progresivo; cada flag MUST tener dueño, criterio de retirada y mención en `proposal.md` o aquí.

## Enfoque técnico (alto nivel)

- **Angular 19** (standalone, rutas lazy por feature) en la raíz del repositorio; `angular.json` presente.
- **Ingeniería inversa:** modelos de datos, llamadas HTTP y flujos de UI deducidos del legado; tests de contrato o e2e alineados a escenarios OpenSpec cuando exista harness.

## Mapeo diseño legado → destino

Hasta el inventario (**#1**, **#2**, **#4**), el destino usa layout propio (cabecera clara, `max-width` 960px, tipografía del sistema, foco visible). **Actualización shell (#1, sin baseline clonable):** `MainLayoutComponent` usa `main-layout.component.html` + `main-layout.component.scss` (cabecera sticky, marca con línea de contexto no enlazada, navegación a cotizaciones, `main` con outlet, pie `contentinfo` mínimo); la ruta hija `cotizaciones` declara `title: 'Cotizaciones'` para el título del documento. Paridad de copy y estructura frente al legado queda sujeta a Ola 1.

Cuando exista baseline React:

- **Tokens / color:** contrastar con paleta del legado; si el destino adopta design system distinto, registrar **discrepancia intencional** en esta sección y en `proposal.md` (columna *Paridad diseño* del catálogo).
- **Grid y densidad:** alinear breakpoints y espaciado a componentes legados equivalentes (**#1**, **#4**).
- **Componentes UI:** seguir `.cursor/rules/use-custom-ui-components.mdc` y `use-global-color-palette.mdc` al sustituir estilos inline del legado por patrones Angular reutilizables.

## HTTP en desarrollo y ausencia de API (**#3**, **#4**, **#6**)

- **`environment.apiUrl`** y **`environment.cotizacionesListRelativePath`:** el adaptador (**#3**) construye `GET` como `apiUrl` + path relativo (por defecto `/cotizaciones`; valores en **#4**). En `ng serve`, `/api` pasa por `proxy.conf.json` al backend local (`http://localhost:3000` por defecto), con reescritura para que `/api/...` llegue al backend sin el prefijo `/api` salvo que el despliegue use otro contrato (documentar discrepancia).
- **`provideHttpClient(withInterceptors([cotizacionesMockInterceptor]))`** en `app.config.ts` (**#4**): si `useCotizacionesMock` es verdadero y no es producción, el interceptor responde al mismo URL que el adaptador con datos de demostración; en caso contrario la petición sigue al backend y los fallos se muestran vía `mapHttpErrorToMessage` (**#6**, sin HTML crudo).
- **Producción:** `useCotizacionesMock` es falso; el interceptor no sustituye respuestas.

## Estrategia por ola (resumen)

| Ola | Enfoque |
|-----|---------|
| **1** | Rellenar columnas legado del catálogo **#1–6**; refinar esta tabla y deltas. |
| **2** | **#3** adaptador + puerto; **#6** mapper + mock dev opcional **implementados en destino**; falta **revisión frente al legado** y cierre fino; revisión visual **#1**, **#2**, **#4** frente al legado (**tasks.md** 2.6). |
| **3** | Cubrir **#5** y merge de comportamiento a `openspec/specs/` cuando proceda. |

## Checklist de verificación (destino actual)

- **Given** el usuario abre `/` **when** carga la app **then** se redirige a `/cotizaciones` y aparece el layout con navegación enfocable.
- **Given** el usuario está en `/cotizaciones` **when** la petición HTTP falla **then** ve mensaje de error (texto seguro, sin página HTML cruda) y puede pulsar «Reintentar».
- **Given** el API devuelve lista vacía **when** termina la carga **then** aparece el estado vacío sin error.
- **Given** el API devuelve elementos **when** termina la carga **then** se listan títulos (y estado si existe en el payload).

## Revisión shell **#1** (solo destino; baseline legado bloqueado)

**Fecha:** 2026-04-22. **Fuentes:** `src/app/app.routes.ts`, `src/app/shell/layout/main-layout.component.ts`. **Legado:** no contrastable (`git ls-remote` → *repository not found*; discrepancia `LEGACY_REPO_UNAVAILABLE`). No se afirma paridad legado ↔ destino.

| Criterio (destino / `frontend-shell`) | Hallazgo breve |
|--------------------------------------|----------------|
| Rutas raíz con layout padre | `path: ''` monta `MainLayoutComponent` con `children` (lazy cotizaciones + redirect). |
| `router-outlet` | Presente en `<main id="main-content">` del layout. |
| Redirección inicial | `path: ''` (full) → `cotizaciones`; URL observable `/cotizaciones`. |
| Ruta comodín | `**` → `''` (vuelve al shell + redirect hijo). |
| Navegación | `routerLink` a `/cotizaciones` (marca + nav «Inicio»); `routerLinkActive` con `exact: true` en nav. |
| Accesibilidad mínima shell | Skip link al `#main-content`; `main` con `tabindex="-1"`; foco visible en estilos del componente. |

**Pendiente tras inventario legado:** copy exacto, estructura de nav adicional, assets/tema, y cualquier ruta hija del shell React no mapeada aún (catálogo **#1** / **#5**).

## Revisión listado cotizaciones **#2** (solo destino; baseline legado bloqueado)

**Fecha:** 2026-04-23. **Fuentes destino:** `src/app/features/cotizaciones/cotizaciones.routes.ts` (ruta vacía con `loadComponent` → `CotizacionesListComponent`, `title` en ruta hija); `src/app/features/cotizaciones/pages/cotizaciones-list/` (plantilla, estilos, lógica de carga / error / vacío / reintentar vía `COTIZACIONES_PORT`). **Legado:** no contrastable (`LEGACY_REPO_UNAVAILABLE`); no se afirma paridad legado ↔ destino.

| Criterio (destino / `cotizaciones-ui`) | Hallazgo breve |
|---------------------------------------|----------------|
| Ruta lazy del feature | `cotizacionesRoutes` expone `path: ''` con carga perezosa del listado; montaje bajo `/cotizaciones` desde rutas raíz (`loadChildren`, shell **#1**). |
| Título de documento | Ruta hija del feature con `title: 'Listado de cotizaciones'`. |
| Estados observables | Carga, error con mensaje y «Reintentar», vacío explícito, lista con título (y estado si el VM lo incluye); control flow `@if` / `@for` con `track c.id`. |
| Dependencias de catálogo | Consume **#3** (puerto); configuración base **#4**; mensajes de error alineados a **#6** (sin HTML crudo como contenido principal). |
| Accesibilidad mínima | `section` + `aria-labelledby`; loading `aria-live="polite"`; error `role="alert"`; botón con `aria-describedby` al mensaje. |
| Estilos y responsive | Tokens `var(--app-*)` en CSS del componente; ítems en columna en viewport ≤48rem; spinner respeta `prefers-reduced-motion`. |
| Rendimiento UI | `ChangeDetectionStrategy.OnPush` en el componente de lista. |

**Pendiente tras inventario legado:** rutas y ficheros React equivalentes en la tabla de equivalencias; densidad, tipografía, columnas y copy del listado frente al legado (**tasks.md** 2.6).

## Revisión errores HTTP y mock **#6** (solo destino; baseline legado bloqueado)

**Fecha:** 2026-04-23. **Fuentes destino:** `src/app/infrastructure/http/http-error.mapper.ts` + `http-error.mapper.spec.ts`; `src/app/infrastructure/interceptors/cotizaciones-mock.interceptor.ts` (misma composición de URL que adaptador **#3**); `src/app/features/cotizaciones/pages/cotizaciones-list/cotizaciones-list.component.ts` (handler `error` con `mapHttpErrorToMessage` para cualquier fallo del observable); pruebas en `cotizaciones-list.component.spec.ts` (errores no-`Error`, `Error` con cuerpo tipo documento HTML, `role="alert"` y segundo `listar` al reintentar). **Legado:** no contrastable (`LEGACY_REPO_UNAVAILABLE`).

| Criterio (destino / `cotizaciones-ui` + catálogo **#6**) | Hallazgo breve |
|--------------------------------------------------------|----------------|
| Sin HTML crudo en UI ante fallo | Adaptador envuelve `HttpErrorResponse` en `Error(mapHttpErrorToMessage(err))`; la vista aplica de nuevo `mapHttpErrorToMessage` en el `subscribe` (defensa si el puerto emite otro tipo de fallo o mensaje inseguro). |
| Mensajes acotados | `mapHttpErrorToMessage` recorta y detecta documentos HTML; casos adicionales en `http-error.mapper.spec.ts`. |
| Mock dev | `useCotizacionesMock` + interceptor solo fuera de producción; URL alineada a `environment.apiUrl` + `cotizacionesListRelativePath`; cuerpo demo documentado en catálogo **#6** / **#4**. |
| Paridad mensajes vs legado | **No contrastable** hasta inventario Ola 1 (política de reintentos y copy exactos del legado React). |

## Riesgos

- Repositorio legado privado o renombrado impide baseline hasta obtener acceso.
- Dependencias del legado sin equivalente directo en Angular requerirán decisión documentada (sustituto o desviación).

## QA — pruebas, cobertura y criterios comprobables

**Stack bajo prueba en destino:** Angular 19 (Karma + Jasmine); no hay suite e2e en el repo. El baseline de paridad sigue sujeto a inventario del legado React (`Designcotizacionesmodule`); mientras aplique `LEGACY_REPO_UNAVAILABLE`, la verificación automatizada cubre **comportamiento observable documentado** en `openspec/specs/` y deltas, no paridad literal legado vs Angular.

**Dónde viven los tests:** `src/**/*.spec.ts` (convención Angular). Comando: `npm run test` (equiv. `ng test`); en CI/sandbox sin display: `npx ng test --no-watch --browsers=ChromeHeadless`.

**Trazabilidad requisito ↔ test:**

| Requisito OpenSpec (resumen) | Catálogo | Fichero(s) de prueba |
|-----------------------------|----------|----------------------|
| `frontend-shell` (delta) — coherencia bootstrap: entornos, proxy, `angular.json`, `API_BASE_URL` | **#4** | `src/bootstrap.spec.ts` |
| `frontend-shell` (delta) — HTML `lang`, tokens `--app-*`, `:focus-visible`, carpeta `public/` | **#4** | `npm run verify:bootstrap` → `scripts/verify-bootstrap.mjs` |
| `frontend-shell` — shell accesible, regiones, navegación a cotizaciones | **#1** | `main-layout.component.spec.ts` |
| `frontend-shell` — raíz redirige a `/cotizaciones`, wildcard coherente | **#1** | `app.routes.integration.spec.ts` |
| `cotizaciones-ui` — listado: carga, error+reintentar, vacío, datos; error saneado (**#6**) | **#2**, **#6** | `cotizaciones-list.component.spec.ts` |
| `cotizaciones-ui` — ruta lazy `/cotizaciones` + stack HTTP real + mock dev (datos visibles) | **#2**, **#4**, **#6** | `cotizaciones.routes.integration.spec.ts` |
| `cotizaciones-ui` — adaptador: normalización de payload y URL | **#3** | `cotizaciones.http-adapter.spec.ts` |
| `cotizaciones-ui` — mensajes HTTP sin HTML crudo | **#6** | `http-error.mapper.spec.ts`, `cotizaciones-list.component.spec.ts` (mapeo defensivo en vista) |
| `cotizaciones-ui` — mock dev: solo GET listado, bandera y producción | **#6**, **#4** | `cotizaciones-mock.interceptor.spec.ts` |

**Cobertura deseada (orientación, no umbral duro hasta baseline):** mantener al menos un caso por escenario **MUST/SHALL** en specs anteriores para bootstrap (**#4**), shell (**#1**), listado (**#2**), adaptador HTTP (**#3**) y saneo de errores (**#6**). En CI, ejecutar `npm run verify:bootstrap` además de `ng test` para cubrir ficheros estáticos que Karma no lee del disco. Tras Ola 1, refinar pruebas de contrato HTTP al contrato legado y, si el equipo lo adopta, e2e (Playwright/Cypress) para la **Lista plana para Foreach** por pantalla crítica.

**Manual (no automatizable sin baseline o sin e2e):** tarea **2.6** — comparación visual desktop y ≤768px legado vs destino; orden y copy exactos del menú legado; capturas en `design.md` o discrepancias. Sin clon del legado, registrar como **laguna** y no afirmar paridad visual.

**Criterios de aceptación comprobables (#4):** (1) `npx ng test --no-watch --browsers=ChromeHeadless` incluye la suite `bootstrap (#4)` en verde; (2) `npm run verify:bootstrap` termina con código 0; (3) `npm run build` compila sin errores. **Regresión:** si se cambia `pathRewrite` del proxy o `apiUrl`, los tests **#4** y la documentación en `design.md` § HTTP SHALL actualizarse en el mismo cambio.

**Criterios de aceptación comprobables (#2):** (1) `npx ng test --no-watch --browsers=ChromeHeadless` ejecuta `cotizaciones-list.component.spec.ts` en verde (carga `aria-live="polite"`, error con `role="alert"` y botón «Reintentar», vacío, datos, segundo `listar` al reintentar); (2) la misma ejecución ejecuta `cotizaciones.routes.integration.spec.ts` en verde (navegación a `/cotizaciones` con `appConfig` + mock activo muestra textos de demostración del interceptor); (3) hasta Ola 1, no se exige paridad de copy/layout frente al legado (solo criterios destino + spec).

**Criterios de aceptación comprobables (#3):** (1) `npx ng test --no-watch --browsers=ChromeHeadless` ejecuta `cotizaciones.http-adapter.spec.ts` en verde (URL base + path relativo, normalización de envolturas, error ante forma inesperada); (2) el interceptor mock (**#6**) y la vista de listado (**#2**) usan la misma composición de URL que el adaptador (regresión: cambiar `cotizacionesListRelativePath` sin romper mock ni `GET` real).

**Criterios de aceptación comprobables (#6):** (1) `npx ng test --no-watch --browsers=ChromeHeadless` ejecuta `http-error.mapper.spec.ts` y los casos de error en `cotizaciones-list.component.spec.ts` en verde (mensaje acotado, sin HTML crudo, throws no estándar); (2) la misma ejecución ejecuta `cotizaciones-mock.interceptor.spec.ts` en verde (mock solo con `useCotizacionesMock` y no producción; delegación al backend si mock desactivado, en producción, en POST, o en URL no listado); (3) `cotizaciones.routes.integration.spec.ts` sigue mostrando textos de demostración con mock activo en la ruta lazy.

**Hallazgos bloqueantes vs mejoras:** bloqueante para “paridad migración completa”: inventario legado y cierre de **2.6**/**3.2**. No bloqueante: refinar tokens o añadir e2e cuando exista harness.

## Estado integración

- **Pull request (última entrega QA #6 en esta rama):** https://github.com/excsxavox/migracionfront/pull/26 — comprobar en GitHub si figura *Open*, *Merged* o *Closed*; PR anterior de la misma rama: https://github.com/excsxavox/migracionfront/pull/25. La rama de trabajo sigue siendo la fuente de commits hasta merge.
- **Rama de trabajo:** `cursor/wf-2d3be0b19b3e4c` → remoto `origin/cursor/wf-2d3be0b19b3e4c`.

Si el PR queda **cerrado sin merge**, el trabajo permanece en los commits de esa rama: **reabrir el mismo PR**, **abrir un PR nuevo** desde `cursor/wf-2d3be0b19b3e4c`, o **cherry-pick** los commits a la rama objetivo acordada con el equipo. Tras merge a `main`, ejecutar `/opsx:sync` o el flujo de merge de deltas OpenSpec definido en el repo.
