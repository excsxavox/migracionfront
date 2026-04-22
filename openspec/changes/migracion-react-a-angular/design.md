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
| **#4** | *TBD: variables de entorno del legado* | `src/environments/environment.ts`, `environment.prod.ts`, `proxy.conf.json` | Sin secretos en cliente. Proxy: prefijo `/api` → `http://localhost:3000` (ajustar al backend real). |
| **#5** | *TBD: demás rutas del SPA legado* | *Por definir* bajo `src/app/features/…` | Añadir fila por pantalla al inventariar. |
| **#6** | *TBD: manejo de fallos API en legado* | `mapHttpErrorToMessage` + UI de error en listado; mocks/interceptor **pendiente de decisión** | Objetivo: mensajes controlados en la app; si la API falta en desarrollo, documentar mock o fixture sin exponer stack ni HTML de error del servidor al usuario. |

**Catálogo maestro (DoD, dependencias, olas):** [migration-catalog.md](./migration-catalog.md) — filas **#1–#6**; ampliar **#5** al completar inventario del legado.

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
- **`provideHttpClient()`** en `app.config.ts` sin interceptor de mock aún; si el backend no está disponible, la lista muestra mensaje vía `mapHttpErrorToMessage` (**#6** parcial).
- **Decisión pendiente (tarea 2.5):** `HttpInterceptor` con respuestas mock, `InMemoryWebApi`, o documentar solo mensaje amigable + discrepancia si el alcance no incluye mocks.

## Estrategia por ola (resumen)

| Ola | Enfoque |
|-----|-----------|
| **1** | Rellenar columnas legado del catálogo **#1–6**; refinar esta tabla y deltas. |
| **2** | Cerrar **#6** y revisión visual **#1–2** frente al legado. |
| **3** | Cubrir **#5** y merge de comportamiento a `openspec/specs/` cuando proceda. |

## Checklist de verificación (destino actual)

- **Given** el usuario abre `/` **when** carga la app **then** se redirige a `/cotizaciones` y aparece el layout con navegación enfocable.
- **Given** el usuario está en `/cotizaciones` **when** la petición HTTP falla **then** ve mensaje de error y puede pulsar «Reintentar».
- **Given** el API devuelve lista vacía **when** termina la carga **then** aparece el estado vacío sin error.
- **Given** el API devuelve elementos **when** termina la carga **then** se listan títulos (y estado si existe en el payload).

## Riesgos

- Repositorio legado privado o renombrado impide baseline hasta obtener acceso.
- Dependencias del legado sin equivalente directo en Angular requerirán decisión documentada (sustituto o desviación).
