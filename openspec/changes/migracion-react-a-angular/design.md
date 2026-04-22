# Design: Migración React → Angular

## Baseline observable (legado)

Hasta completar un inventario sobre un **clon local** de `Designcotizacionesmodule`, los requisitos de paridad se formulan a nivel de principio en `openspec/specs/core/spec.md` y en los deltas de este cambio. El nombre del repositorio legado sugiere un dominio de **cotizaciones**; la estructura exacta de carpetas, bundler y biblioteca UI **no debe asumirse** sin lectura del código.

## Equivalencias legado → destino (borrador)

| Legado (origen) | Destino (Angular) | Notas |
|-----------------|---------------------|--------|
| *Pendiente: layout raíz y rutas del SPA React (tras inventario)* | `src/app/shell/layout/main-layout.component.ts`, `src/app/app.routes.ts` | Raíz redirige a `/cotizaciones`. Paridad de copy/enlaces cuando exista clon del legado. |
| *Pendiente: pantalla o ruta de listado de cotizaciones en React* | `src/app/features/cotizaciones/pages/cotizaciones-list/` (ruta lazy bajo `/cotizaciones`) | Estados loading / error / empty explícitos. |
| *Pendiente: cliente HTTP / hooks que obtengan cotizaciones* | `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts` implementando `CotizacionesPort` | `GET` relativo a `environment.apiUrl` + `/cotizaciones`. Normaliza array plano o `{ data: [] }`. Ajustar path y mapeo al contrastar con el legado. |
| *Pendiente: variables de entorno del legado* | `src/environments/environment.ts`, `proxy.conf.json` | Sin secretos en cliente. Proxy de desarrollo apunta a `http://localhost:3000` por defecto (ajustar al backend real). |

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

## Checklist de verificación (destino actual)

- **Given** el usuario abre `/` **when** carga la app **then** se redirige a `/cotizaciones` y aparece el layout con navegación enfocable.
- **Given** el usuario está en `/cotizaciones` **when** la petición HTTP falla **then** ve mensaje de error y puede pulsar «Reintentar».
- **Given** el API devuelve lista vacía **when** termina la carga **then** aparece el estado vacío sin error.
- **Given** el API devuelve elementos **when** termina la carga **then** se listan títulos (y estado si existe en el payload).

## QA — pruebas automatizadas y trazabilidad OpenSpec

Cada caso automatizado SHALL enlazar en comentario de cabecera al `### Requirement:` o escenario concreto en `openspec/specs/<dominio>/spec.md` (o delta equivalente bajo `openspec/changes/migracion-react-a-angular/specs/`).

| Artefacto de prueba | Requisito / escenario OpenSpec (canónico) | Qué comprueba |
|---------------------|--------------------------------------------|----------------|
| `src/app/app.routes.spec.ts` | `frontend-shell` — *Shell accesible…* / escenario *Raíz redirige a cotizaciones* | `'' → /cotizaciones`; ruta desconocida termina en `/cotizaciones` |
| `src/app/shell/layout/main-layout.component.spec.ts` | `frontend-shell` — *Shell accesible…* / *Navegación por teclado* (presencia de controles) | Skip link, `banner`, `main`, `nav` |
| `src/app/features/cotizaciones/pages/cotizaciones-list/cotizaciones-list.component.spec.ts` | `cotizaciones-ui` — *Listado con estados explícitos* | Carga (`aria-live`), error + reintentar, vacío, éxito, reintento tras error |
| `src/app/infrastructure/adapters/cotizaciones.http-adapter.spec.ts` | `cotizaciones-ui` — *Contratos HTTP asumidos existentes* | Normalización array / `{ data }`; error ante cuerpo inesperado; mensaje en fallo HTTP |
| `src/app/app.component.spec.ts` | `frontend-shell` (bootstrap / outlet) | Raíz renderiza `router-outlet` |

**Cobertura deseada (orientación, no umbral CI aún):** priorizar **>80 %** de sentencias en `shell/layout`, rutas, listado de cotizaciones y adaptador HTTP cuando el contrato real del legado esté inventariado; hasta entonces la cobertura valida solo el **comportamiento placeholder** documentado en este diseño.

**Laguna de especificación (paridad legado):** sin filas cerradas en la tabla de equivalencias, no existe baseline observable para afirmar paridad frente a React; las pruebas anteriores cubren **solo** el destino según `cotizaciones-ui` y `frontend-shell`. Tras inventario, añadir pruebas de contrato alineadas a payloads reales (fixtures anónimos) y, si aplica, e2e.

**E2E (recomendado tras baseline):** añadir Playwright o Cypress cuando exista URL de legado y destino comparables; flujos mínimos: apertura `/`, redirección, listado con mock de API o entorno de prueba, error de red simulado. Comando típico (cuando exista harness): documentar en `package.json` como `npm run e2e`.

**Validación manual reproducible (post-inventario / pre-release):** para cada fila **paridad** en la tabla de equivalencias, abrir la misma acción en legado y destino (datos ficticios: p. ej. «Cotización anónima A») y comprobar: URL final, texto principal visible, mensajes de error, estados vacíos. Registrar discrepancias solo vía `design.md` o `openspec/sync/discrepancies/`.

## Riesgos

- Repositorio legado privado o renombrado impide baseline hasta obtener acceso.
- Dependencias del legado sin equivalente directo en Angular requerirán decisión documentada (sustituto o desviación).
