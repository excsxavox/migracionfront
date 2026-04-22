# Design: Migración React → Angular

## Baseline observable (legado)

Hasta completar un inventario sobre un **clon local** de `Designcotizacionesmodule`, los requisitos de paridad se formulan a nivel de principio en `openspec/specs/core/spec.md` y en los deltas de este cambio. El nombre del repositorio legado sugiere un dominio de **cotizaciones**; la estructura exacta de carpetas, bundler y biblioteca UI **no debe asumirse** sin lectura del código.

## Equivalencias legado → destino (borrador)

Cada fila enlaza al catálogo por **#** (ver [migration-catalog.md](./migration-catalog.md)).

| # | Legado (origen) | Destino (Angular) | Notas |
|---|-----------------|-------------------|--------|
| **#1** | *TBD: layout raíz y rutas del SPA React (tras inventario)* | `src/app/shell/layout/main-layout.component.ts`, `src/app/app.routes.ts` | Raíz redirige a `/cotizaciones`. Paridad de copy/enlaces cuando exista clon del legado. |
| **#2** | *TBD: pantalla de listado de cotizaciones en el legado* | `src/app/features/cotizaciones/pages/cotizaciones-list/`, lazy `src/app/features/cotizaciones/cotizaciones.routes.ts` | Estados carga / error / vacío; datos mínimos en vista. Paridad densa vs legado pendiente inventario. |
| **#3** | *TBD: cliente HTTP / hooks que obtengan cotizaciones* | `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts` implementando `CotizacionesPort`; `src/app/core/tokens/api-base-url.token.ts`; registro del puerto / `API_BASE_URL` en `src/app/app.config.ts` (coordinado con bootstrap **#4**) | `GET` relativo a `environment.apiUrl` + `/cotizaciones` (**hipótesis**). Normaliza array plano o `{ data: [] }`. Errores HTTP como `Error` con mensaje vía **#6** (`mapHttpErrorToMessage`). Ajustar path y DTO al contrastar con el legado. |
| **#4** | *TBD: variables de entorno, proxy y estilos globales del legado* | `src/environments/environment.ts`, `environment.prod.ts`, `proxy.conf.json`, `angular.json`, `src/styles.css`, `src/index.html`, `public/`, `src/app/app.config.ts` | Sin secretos en cliente. Proxy: prefijo `/api` → backend local (ajustar al despliegue real). Mock opcional en dev: bandera en **#4**, implementación interceptor en **#6**; desactivar con API real. |
| **#5** | *TBD: demás rutas del SPA legado* | *Por definir* bajo `src/app/features/…` | Añadir fila por pantalla al inventariar. |
| **#6** | *TBD: manejo de fallos API en legado* | `mapHttpErrorToMessage` + UI de error en listado (**#2**); `cotizacionesMockInterceptor` (dev, bandera `useCotizacionesMock`) | Mensajes controlados: no HTML del servidor como contenido principal; mock dev documentado para API ausente (**#4** / **#6**). |

**Catálogo maestro (DoD, dependencias, olas, riesgos):** [migration-catalog.md](./migration-catalog.md) — filas **#1–#6**; ampliar **#5** al completar inventario del legado.

**Riesgo API (resumen):** el adaptador asume `GET` bajo `{apiUrl}/cotizaciones` hasta contrastar con el legado (**hipótesis**); si el backend devuelve HTML en errores, la política de mensajes (**#6**, `http-error.mapper` y spec canónico) SHALL evitar mostrar ese HTML crudo en la UI.

**Riesgo diseño:** el destino no declara Material ni otro DS en dependencias; la paridad visual con el legado depende de inventario de tokens y componentes React (**inferencia:** sin ese inventario, **#1**, **#2**, **#4** y **#5** tienen riesgo de deriva visual). **#3** no tiene UI; el riesgo ahí es de contrato HTTP y envolturas de respuesta.

**Plan vs hecho:** la estructura SDD (dominios `lineamientos`, `frontend-shell`, `cotizaciones-ui`) y el comando `/opsx:sync` están **hechos** en el repo destino; las filas concretas de rutas/componentes siguen **plan — pendiente** por acceso al legado (véase discrepancia `LEGACY_REPO_UNAVAILABLE`). El catálogo incorpora columna **Tipo** y orden **shell** primero (**hecho** en OpenSpec).

### Discrepancias intencionales

Ninguna registrada aún. Cualquier cambio respecto al legado SHALL listarse aquí con justificación.

### Discrepancias no intencionales / bloqueos

- **LEGACY_REPO_UNAVAILABLE:** remoto del legado no accesible públicamente; ver `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md`.

## Strangler y orden de sustitución (módulo a módulo)

1. **Shell y routing** del legado → `frontend-shell` en Angular (layout, outlet, guards visibles) — catálogo **#1**.
2. **Entorno, proxy y tema global** — catálogo **#4** (base para paridad visual y llamadas HTTP).
3. **Cliente HTTP del dominio** — catálogo **#3** (adaptador + puerto, alineable al contrato legado).
4. **Módulo cotizaciones** (o el primero confirmado en el árbol React) → ruta lazy y pantalla lista — **#2**; resiliencia y mock dev — **#6** (coordinado con **#4**).
5. **Módulos satélite** en el orden de dependencia detectada en el legado (menos acoplados primero), documentando cada paso en la tabla de equivalencias — **#5**.

**Feature flags:** SHOULD usarse solo para coexistencia temporal o despliegue progresivo; cada flag MUST tener dueño, criterio de retirada y mención en `proposal.md` o aquí.

## Enfoque técnico (alto nivel)

- **Angular 19** (standalone, rutas lazy por feature) en la raíz del repositorio; `angular.json` presente.
- **Ingeniería inversa:** modelos de datos, llamadas HTTP y flujos de UI deducidos del legado; tests de contrato o e2e alineados a escenarios OpenSpec cuando exista harness.

## Mapeo diseño legado → destino

Hasta el inventario (**#1**, **#4**), el destino usa layout propio (cabecera clara, `max-width` 960px, tipografía del sistema, foco visible). **Actualización shell (#1, sin baseline clonable):** `MainLayoutComponent` usa `main-layout.component.html` + `main-layout.component.scss` (cabecera sticky, marca con línea de contexto no enlazada, navegación a cotizaciones, `main` con outlet, pie `contentinfo` mínimo); la ruta hija `cotizaciones` declara `title: 'Cotizaciones'` para el título del documento. Paridad de copy y estructura frente al legado queda sujeta a Ola 1.

Cuando exista baseline React:

- **Tokens / color:** contrastar con paleta del legado; si el destino adopta design system distinto, registrar **discrepancia intencional** en esta sección y en `proposal.md` (columna *Paridad diseño* del catálogo).
- **Grid y densidad:** alinear breakpoints y espaciado a componentes legados equivalentes (**#1**, **#4**).
- **Componentes UI:** seguir `.cursor/rules/use-custom-ui-components.mdc` y `use-global-color-palette.mdc` al sustituir estilos inline del legado por patrones Angular reutilizables.

## HTTP en desarrollo y ausencia de API (**#3**, **#4**, **#6**)

- **`environment.apiUrl`:** `/api` en desarrollo, enrutado por `proxy.conf.json` al backend local (`http://localhost:3000` por defecto), con reescritura de ruta para que las peticiones a `/api/cotizaciones` lleguen al backend como `/cotizaciones` salvo que el despliegue real use otro prefijo (documentar discrepancia).
- **`provideHttpClient(withInterceptors([cotizacionesMockInterceptor]))`** en `app.config.ts`: si `useCotizacionesMock` es verdadero y no es producción, el interceptor responde a `GET {apiUrl}/cotizaciones` con datos de demostración; en caso contrario la petición sigue al backend y los fallos se muestran vía `mapHttpErrorToMessage` (sin HTML crudo).
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

## Riesgos

- Repositorio legado privado o renombrado impide baseline hasta obtener acceso.
- Dependencias del legado sin equivalente directo en Angular requerirán decisión documentada (sustituto o desviación).

## QA — pruebas, cobertura y criterios comprobables

**Stack bajo prueba en destino:** Angular 19 (Karma + Jasmine); no hay suite e2e en el repo. El baseline de paridad sigue sijeto a inventario del legado React (`Designcotizacionesmodule`); mientras aplique `LEGACY_REPO_UNAVAILABLE`, la verificación automatizada cubre **comportamiento observable documentado** en `openspec/specs/` y deltas, no paridad literal legado vs Angular.

**Dónde viven los tests:** `src/**/*.spec.ts` (convención Angular). Comando: `npm run test` (equiv. `ng test`); en CI/sandbox sin display: `npx ng test --no-watch --browsers=ChromeHeadless`.

**Trazabilidad requisito ↔ test:**

| Requisito OpenSpec (resumen) | Catálogo | Fichero(s) de prueba |
|-----------------------------|----------|----------------------|
| `frontend-shell` (delta) — coherencia bootstrap: entornos, proxy, `angular.json`, `API_BASE_URL` | **#4** | `src/bootstrap.spec.ts` |
| `frontend-shell` (delta) — HTML `lang`, tokens `--app-*`, `:focus-visible`, carpeta `public/` | **#4** | `npm run verify:bootstrap` → `scripts/verify-bootstrap.mjs` |
| `frontend-shell` — shell accesible, regiones, navegación a cotizaciones | **#1** | `main-layout.component.spec.ts` |
| `frontend-shell` — raíz redirige a `/cotizaciones`, wildcard coherente | **#1** | `app.routes.integration.spec.ts` |
| `cotizaciones-ui` — listado: carga, error+reintentar, vacío, datos | **#2** | `cotizaciones-list.component.spec.ts` |
| Destino — contrato HTTP `listar` / normalización payload (**#3**) | **#3** | Indirecto vía listado + mapper; tras Ola 1, specs de contrato dedicados al adaptador |
| `cotizaciones-ui` — mensajes HTTP sin HTML crudo | **#6** | `http-error.mapper.spec.ts` |

**Cobertura deseada (orientación, no umbral duro hasta baseline):** mantener al menos un caso por escenario **MUST/SHALL** en specs anteriores para bootstrap (**#4**), shell (**#1**), cliente HTTP (**#3**, vía listado o spec dedicado), listado (**#2**) y saneo de errores (**#6**). En CI, ejecutar `npm run verify:bootstrap` además de `ng test` para cubrir ficheros estáticos que Karma no lee del disco. Tras Ola 1, añadir pruebas de contrato HTTP alineadas al contrato legado y, si el equipo lo adopta, e2e (Playwright/Cypress) para la **Lista plana para Foreach** por pantalla crítica.

**Manual (no automatizable sin baseline o sin e2e):** tarea **2.6** — comparación visual desktop y ≤768px legado vs destino; orden y copy exactos del menú legado; capturas en `design.md` o discrepancias. Sin clon del legado, registrar como **laguna** y no afirmar paridad visual.

**Criterios de aceptación comprobables (#4):** (1) `npx ng test --no-watch --browsers=ChromeHeadless` incluye la suite `bootstrap (#4)` en verde; (2) `npm run verify:bootstrap` termina con código 0; (3) `npm run build` compila sin errores. **Regresión:** si se cambia `pathRewrite` del proxy o `apiUrl`, los tests **#4** y la documentación en `design.md` § HTTP SHALL actualizarse en el mismo cambio.

**Hallazgos bloqueantes vs mejoras:** bloqueante para “paridad migración completa”: inventario legado y cierre de **2.6**/**3.2**. No bloqueante: refinar tokens o añadir e2e cuando exista harness.

## Estado integración

- **Pull request:** https://github.com/excsxavox/migracionfront/pull/20  
- **Rama de trabajo:** `cursor/wf-2d3be0b19b3e4c` → remoto `origin/cursor/wf-2d3be0b19b3e4c`.

Si el PR queda **cerrado sin merge**, el trabajo permanece en los commits de esa rama: **reabrir el mismo PR**, **abrir un PR nuevo** desde `cursor/wf-2d3be0b19b3e4c`, o **cherry-pick** los commits a la rama objetivo acordada con el equipo. Tras merge a `main`, ejecutar `/opsx:sync` o el flujo de merge de deltas OpenSpec definido en el repo.
