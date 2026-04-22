# Design: Migración React → Angular

## Baseline observable (legado)

Hasta completar un inventario sobre un **clon local** de `Designcotizacionesmodule`, los requisitos de paridad se formulan a nivel de principio en `openspec/specs/core/spec.md` y en los deltas de este cambio. El nombre del repositorio legado sugiere un dominio de **cotizaciones**; la estructura exacta de carpetas, bundler y biblioteca UI **no debe asumirse** sin lectura del código.

## Equivalencias legado → destino (borrador)

Cada fila enlaza al catálogo por **#** (ver [migration-catalog.md](./migration-catalog.md)).

| # | Legado (origen) | Destino (Angular) | Notas |
|---|-----------------|-------------------|--------|
| **#1** | *TBD: layout raíz y rutas del SPA React (tras inventario)* | `src/app/shell/layout/main-layout.component.ts`, `src/app/app.routes.ts` | Raíz redirige a `/cotizaciones`. Paridad de copy/enlaces cuando exista clon del legado. |
| **#2** | *TBD: pantalla o ruta de listado de cotizaciones en React* | `src/app/features/cotizaciones/pages/cotizaciones-list/` (ruta lazy bajo `/cotizaciones`) | Estados loading / error / empty explícitos. |
| **#3** | *TBD: cliente HTTP / hooks que obtengan cotizaciones* | `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts` implementando `CotizacionesPort` | `GET` relativo a `environment.apiUrl` + `/cotizaciones`. Normaliza array plano o `{ data: [] }`. Ajustar path y mapeo al contrastar con el legado. |
| **#4** | *TBD: variables de entorno del legado* | `src/environments/environment.ts`, `environment.prod.ts`, `proxy.conf.json`, `cotizaciones-mock.interceptor.ts` | Sin secretos en cliente. Proxy: prefijo `/api` → `http://localhost:3000` (ajustar al backend real). Mock opcional en dev: `useCotizacionesMock` + interceptor para `GET …/cotizaciones`; desactivar con API real. |
| **#5** | *TBD: demás rutas del SPA legado* | *Por definir* bajo `src/app/features/…` | Añadir fila por pantalla al inventariar. |
| **#6** | *TBD: manejo de fallos API en legado* | `mapHttpErrorToMessage` + UI de error en listado; `cotizacionesMockInterceptor` (dev, bandera `useCotizacionesMock`) | Mensajes controlados: no HTML del servidor como contenido principal; mock dev documentado para API ausente (**#4**). |

**Catálogo maestro (DoD, dependencias, olas, riesgos):** [migration-catalog.md](./migration-catalog.md) — filas **#1–#6**; ampliar **#5** al completar inventario del legado.

**Riesgo API (resumen):** el adaptador asume `GET` bajo `{apiUrl}/cotizaciones` hasta contrastar con el legado (**hipótesis**); si el backend devuelve HTML en errores, la política de mensajes (**#6**, `http-error.mapper` y spec canónico) SHALL evitar mostrar ese HTML crudo en la UI.

**Riesgo diseño:** el destino no declara Material ni otro DS en dependencias; la paridad visual con el legado depende de inventario de tokens y componentes React (**inferencia:** sin ese inventario, **#1**, **#2** y **#5** tienen riesgo de deriva visual).

**Plan vs hecho:** la estructura SDD (dominios `lineamientos`, `frontend-shell`, `cotizaciones-ui`) y el comando `/opsx:sync` están **hechos** en el repo destino; las filas concretas de rutas/componentes siguen **plan — pendiente** por acceso al legado (véase discrepancia `LEGACY_REPO_UNAVAILABLE`).

### Discrepancias intencionales

Ninguna registrada aún. Cualquier cambio respecto al legado SHALL listarse aquí con justificación.

### Discrepancias no intencionales / bloqueos

- **LEGACY_REPO_UNAVAILABLE:** remoto del legado no accesible públicamente; ver `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md`.

## Strangler y orden de sustitución (módulo a módulo)

1. **Shell y routing** del legado → `frontend-shell` en Angular (layout, outlet, guards visibles).
2. **Módulo cotizaciones** (o el primero confirmado en el árbol React) → ruta lazy `cotizaciones-ui` con paridad de flujos.
3. **Módulos satélite** en el orden de dependencia detectada en el legado (menos acoplados primero), documentando cada paso en la tabla de equivalencias.

**Feature flags:** SHOULD usarse solo para coexistencia temporal o despliegue progresivo; cada flag MUST tener dueño, criterio de retirada y mención en `proposal.md` o aquí.

## Enfoque técnico (alto nivel)

- **Angular 19** (standalone, rutas lazy por feature) en la raíz del repositorio; `angular.json` presente.
- **Ingeniería inversa:** modelos de datos, llamadas HTTP y flujos de UI deducidos del legado; tests de contrato o e2e alineados a escenarios OpenSpec cuando exista harness.

## Mapeo diseño legado → destino

Hasta el inventario (**#1**, **#2**), el destino usa layout propio (cabecera clara, `max-width` 960px, tipografía del sistema, foco visible). Cuando exista baseline React:

- **Tokens / color:** contrastar con paleta del legado; si el destino adopta design system distinto, registrar **discrepancia intencional** en esta sección y en `proposal.md` (columna *Paridad diseño* del catálogo).
- **Grid y densidad:** alinear breakpoints y espaciado a componentes legados equivalentes (**#1–2**).
- **Componentes UI:** seguir `.cursor/rules/use-custom-ui-components.mdc` y `use-global-color-palette.mdc` al sustituir estilos inline del legado por patrones Angular reutilizables.

## HTTP en desarrollo y ausencia de API (**#4**, **#6**)

- **`environment.apiUrl`:** `/api` en desarrollo, enrutado por `proxy.conf.json` al backend local (`http://localhost:3000` por defecto).
- **`provideHttpClient(withInterceptors([cotizacionesMockInterceptor]))`** en `app.config.ts`: si `useCotizacionesMock` es verdadero y no es producción, el interceptor responde a `GET {apiUrl}/cotizaciones` con datos de demostración; en caso contrario la petición sigue al backend y los fallos se muestran vía `mapHttpErrorToMessage` (sin HTML crudo).
- **Producción:** `useCotizacionesMock` es falso; el interceptor no sustituye respuestas.

## Estrategia por ola (resumen)

| Ola | Enfoque |
|-----|-----------|
| **1** | Rellenar columnas legado del catálogo **#1–6**; refinar esta tabla y deltas. |
| **2** | Cerrar **#6** (mapper + mock dev opcional) y revisión visual **#1–2** frente al legado. |
| **3** | Cubrir **#5** y merge de comportamiento a `openspec/specs/` cuando proceda. |

## Checklist de verificación (destino actual)

- **Given** el usuario abre `/` **when** carga la app **then** se redirige a `/cotizaciones` y aparece el layout con navegación enfocable.
- **Given** el usuario está en `/cotizaciones` **when** la petición HTTP falla **then** ve mensaje de error (texto seguro, sin página HTML cruda) y puede pulsar «Reintentar».
- **Given** el API devuelve lista vacía **when** termina la carga **then** aparece el estado vacío sin error.
- **Given** el API devuelve elementos **when** termina la carga **then** se listan títulos (y estado si existe en el payload).

## Estado integración (PR / rama)

- **Rama de trabajo:** `cursor/wf-7a02393bd8b543` en `https://github.com/excsxavox/migracionfront`.
- **Pull request (QA / tests):** https://github.com/excsxavox/migracionfront/pull/9 (draft). Actualizar el mismo PR si se añaden más commits en esta rama.
- **Si el PR queda cerrado sin merge:** los commits permanecen en la rama remota; opciones: reabrir el PR, crear un PR nuevo desde la misma rama, o cherry-pick de los commits a otra rama según política del equipo.

## QA — automatización, cobertura y trazabilidad

Cada caso automatizado SHALL enlazar en comentario de spec con **Requirement / Scenario** de `openspec/specs/` (canónico) y con **#** del [migration-catalog.md](./migration-catalog.md) cuando aplique.

| Ámbito | Fichero(s) de prueba | Requisito OpenSpec (observable) | Catálogo # |
|--------|----------------------|----------------------------------|------------|
| Rutas raíz y comodín | `src/app/app.routes.spec.ts` | `frontend-shell` — Shell… Scenario: Raíz redirige a cotizaciones | **#1** |
| Layout shell (skip, cabecera, outlet) | `src/app/shell/layout/main-layout.component.spec.ts` | `frontend-shell` — Shell accesible… Scenario: Navegación por teclado (presencia de controles) | **#1** |
| Estados listado (carga, datos, vacío, error+retry) | `src/app/features/cotizaciones/pages/cotizaciones-list/cotizaciones-list.component.spec.ts` | `cotizaciones-ui` — Listado con estados explícitos (todos los scenarios) | **#2**, **#6** |
| Mapper errores HTTP | `src/app/infrastructure/http/http-error.mapper.spec.ts` | `cotizaciones-ui` — Errores de API sin presentación cruda… | **#6** |
| Adaptador HTTP (GET, normalización, error HTML) | `src/app/infrastructure/adapters/cotizaciones.http-adapter.spec.ts` | `cotizaciones-ui` — Contratos HTTP… + Listado / errores | **#3**, **#6** |
| Mock dev opcional | `src/app/infrastructure/interceptors/cotizaciones-mock.interceptor.spec.ts` | `cotizaciones-ui` — Errores… (mock documentado); `design.md` **#4** | **#4**, **#6** |

**Cobertura deseada (objetivo):** priorizar **80 %+** de sentencias en `infrastructure/http`, `infrastructure/adapters`, `infrastructure/interceptors`, y en la página smart del listado; el shell y rutas con al menos los escenarios anteriores. Activar informe Karma con `ng test --code-coverage` cuando el equipo quiera umbral en CI.

**Comandos:** `npm ci` (primera vez); `npx ng test --no-watch --browsers=ChromeHeadless`; `npx ng build`.

**Manual (no sustituido por unitarios):** paridad visual **#1–2** y responsive frente al legado o referencias acordadas; contraste real con API/backend (path, envelope, códigos) cuando exista entorno; accesibilidad en navegador real (orden de foco, lector de pantalla) si el producto lo exige.

**E2E / integración:** no hay harness e2e en el repo; cuando exista baseline legado, añadir Playwright o Cypress alineado a los mismos **Scenario:** (misma tabla de trazabilidad).

**Lagunas de especificación:** sin inventario del legado, los escenarios de **paridad** con React permanecen no comprobables automáticamente; mantener **TBD** en catálogo y discrepancia `LEGACY_REPO_UNAVAILABLE` hasta clon verificable.

## Riesgos

- Repositorio legado privado o renombrado impide baseline hasta obtener acceso.
- Dependencias del legado sin equivalente directo en Angular requerirán decisión documentada (sustituto o desviación).
