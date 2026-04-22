# Design: Migración React → Angular

## Baseline observable (legado)

Hasta completar un inventario sobre un **clon local** de `Designcotizacionesmodule`, los requisitos de paridad se formulan a nivel de principio en `openspec/specs/core/spec.md` y en los deltas de este cambio. El nombre del repositorio legado sugiere un dominio de **cotizaciones**; la estructura exacta de carpetas, bundler y biblioteca UI **no debe asumirse** sin lectura del código.

## Equivalencias legado → destino (borrador)

Cada fila enlaza al catálogo por **#** (ver [migration-catalog.md](./migration-catalog.md)).

| # | Legado (origen) | Destino (Angular) | Notas |
|---|-----------------|-------------------|--------|
| **#1** | *TBD: layout raíz y rutas del SPA React (tras inventario)* | `src/app/shell/layout/main-layout.component.ts`, `src/app/app.routes.ts` | Raíz redirige a `/cotizaciones`. Paridad de copy/enlaces cuando exista clon del legado. |
| **#2** | *TBD: variables de entorno, proxy y estilos globales del legado* | `src/environments/environment.ts`, `environment.prod.ts`, `proxy.conf.json`, `cotizaciones-mock.interceptor.ts` | Sin secretos en cliente. Proxy: prefijo `/api` → `http://localhost:3000` (ajustar al backend real). Mock opcional en dev: `useCotizacionesMock` + interceptor para `GET …/cotizaciones`; desactivar con API real. |
| **#3** | *TBD: cliente HTTP / hooks que obtengan cotizaciones* | `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts` implementando `CotizacionesPort` | `GET` relativo a `environment.apiUrl` + `/cotizaciones`. Normaliza array plano o `{ data: [] }`. Ajustar path y mapeo al contrastar con el legado. |
| **#4** | *TBD: pantalla o ruta de listado de cotizaciones en React* | `src/app/features/cotizaciones/pages/cotizaciones-list/` (ruta lazy bajo `/cotizaciones`) | Estados loading / error / empty explícitos. |
| **#5** | *TBD: demás rutas del SPA legado* | *Por definir* bajo `src/app/features/…` | Añadir fila por pantalla al inventariar. |
| **#6** | *TBD: manejo de fallos API en legado* | `mapHttpErrorToMessage` + UI de error en listado; `cotizacionesMockInterceptor` (dev, bandera `useCotizacionesMock`) | Mensajes controlados: no HTML del servidor como contenido principal; mock dev documentado para API ausente (**#2**). |

**Catálogo maestro (DoD, dependencias, olas, riesgos):** [migration-catalog.md](./migration-catalog.md) — filas **#1–#6**; ampliar **#5** al completar inventario del legado.

**Riesgo API (resumen):** el adaptador asume `GET` bajo `{apiUrl}/cotizaciones` hasta contrastar con el legado (**hipótesis**); si el backend devuelve HTML en errores, la política de mensajes (**#6**, `http-error.mapper` y spec canónico) SHALL evitar mostrar ese HTML crudo en la UI.

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
| Título de documento coherente con el producto | Ajustado: `index.html` `lang="es"`, `<title>Cotizaciones</title>`; rutas con `title` para pestaña del navegador. |
| Paridad rutas/copy/layout vs legado | **No contrastable** hasta inventario (catálogo **#1** columnas legado TBD; discrepancia `LEGACY_REPO_UNAVAILABLE`). |

## Strangler y orden de sustitución (módulo a módulo)

1. **Shell y routing** del legado → `frontend-shell` en Angular (layout, outlet, guards visibles) — catálogo **#1**.
2. **Entorno, proxy y tema global** — catálogo **#2** (base para paridad visual y llamadas HTTP).
3. **Módulo cotizaciones** (o el primero confirmado en el árbol React) → ruta lazy `cotizaciones-ui` con paridad de flujos — **#3**, **#4**, **#6**.
4. **Módulos satélite** en el orden de dependencia detectada en el legado (menos acoplados primero), documentando cada paso en la tabla de equivalencias — **#5**.

**Feature flags:** SHOULD usarse solo para coexistencia temporal o despliegue progresivo; cada flag MUST tener dueño, criterio de retirada y mención en `proposal.md` o aquí.

## Enfoque técnico (alto nivel)

- **Angular 19** (standalone, rutas lazy por feature) en la raíz del repositorio; `angular.json` presente.
- **Ingeniería inversa:** modelos de datos, llamadas HTTP y flujos de UI deducidos del legado; tests de contrato o e2e alineados a escenarios OpenSpec cuando exista harness.

## Mapeo diseño legado → destino

Hasta el inventario (**#1**, **#2**, **#4**), el destino usa layout propio (cabecera clara, `max-width` 960px, tipografía del sistema, foco visible). Cuando exista baseline React:

- **Tokens / color:** contrastar con paleta del legado; si el destino adopta design system distinto, registrar **discrepancia intencional** en esta sección y en `proposal.md` (columna *Paridad diseño* del catálogo).
- **Grid y densidad:** alinear breakpoints y espaciado a componentes legados equivalentes (**#1**, **#4**).
- **Componentes UI:** seguir `.cursor/rules/use-custom-ui-components.mdc` y `use-global-color-palette.mdc` al sustituir estilos inline del legado por patrones Angular reutilizables.

## HTTP en desarrollo y ausencia de API (**#2**, **#6**)

- **`environment.apiUrl`:** `/api` en desarrollo, enrutado por `proxy.conf.json` al backend local (`http://localhost:3000` por defecto).
- **`provideHttpClient(withInterceptors([cotizacionesMockInterceptor]))`** en `app.config.ts`: si `useCotizacionesMock` es verdadero y no es producción, el interceptor responde a `GET {apiUrl}/cotizaciones` con datos de demostración; en caso contrario la petición sigue al backend y los fallos se muestran vía `mapHttpErrorToMessage` (sin HTML crudo).
- **Producción:** `useCotizacionesMock` es falso; el interceptor no sustituye respuestas.

## Estrategia por ola (resumen)

| Ola | Enfoque |
|-----|---------|
| **1** | Rellenar columnas legado del catálogo **#1–6**; refinar esta tabla y deltas. |
| **2** | Cerrar **#6** (mapper + mock dev opcional) y revisión visual **#1**, **#2**, **#4** frente al legado. |
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

## Riesgos

- Repositorio legado privado o renombrado impide baseline hasta obtener acceso.
- Dependencias del legado sin equivalente directo en Angular requerirán decisión documentada (sustituto o desviación).
