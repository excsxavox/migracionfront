# Design: Migración React → Angular

## Baseline observable (legado)

Hasta completar un inventario sobre un **clon local** de `Designcotizacionesmodule`, los requisitos de paridad se formulan a nivel de principio en `openspec/specs/core/spec.md` y en los deltas de este cambio. El nombre del repositorio legado sugiere un dominio de **cotizaciones**; la estructura exacta de carpetas, bundler y biblioteca UI **no debe asumirse** sin lectura del código.

## Equivalencias legado → destino (borrador)

| Legado (origen) | Destino (Angular) | Notas |
|-----------------|---------------------|--------|
| *Pendiente: raíz del app React y `package.json`* | *Pendiente: p. ej. `apps/…` o `src/app/`* | Completar tras clonar legado. |
| *Pendiente: rutas SPA / nombres de pantallas* | *Pendiente: rutas `RouterModule` / componentes* | Misma semántica de navegación salvo desviación acordada. |
| *Pendiente: módulos de feature (cotizaciones, etc.)* | *Pendiente: `NgModule` o rutas standalone* | 1:1 lógico donde haya paridad. |

### Discrepancias intencionales

Ninguna registrada aún. Cualquier cambio respecto al legado SHALL listarse aquí con justificación.

## Enfoque técnico (alto nivel)

- **Angular** como framework destino; versionado y layout de monorepo a fijar cuando exista `angular.json` o Nx/Turborepo en el destino.
- **Ingeniería inversa:** modelos de datos, llamadas HTTP y flujos de UI deducidos del legado; tests de contrato o e2e alineados a escenarios OpenSpec cuando exista harness.

## Riesgos

- Repositorio legado privado o renombrado impide baseline hasta obtener acceso.
- Dependencias del legado sin equivalente directo en Angular requerirán decisión documentada (sustituto o desviación).
