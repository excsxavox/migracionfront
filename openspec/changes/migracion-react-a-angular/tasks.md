# Tasks — migracion-react-a-angular

## 0. OpenSpec / SDD (este repo)

- [x] 0.1 Particionar dominios: `lineamientos`, `core`, `frontend-shell`, `cotizaciones-ui` bajo `openspec/specs/`.
- [x] 0.2 Añadir deltas mergeables bajo `changes/migracion-react-a-angular/specs/<dominio>/spec.md` para dominios nuevos.
- [x] 0.3 Crear `.cursor/commands/opsx-sync.md` (pasos 1–11, guardrails, discrepancias, cinco `.mdc`).
- [x] 0.4 Crear `.cursor/rules/` canónicos (`estandar`, `reglas-arquitectura`, `testing`, `use-custom-ui-components`, `use-global-color-palette`).
- [x] 0.5 Inicializar `openspec/sync/discrepancies/` y registrar bloqueo de baseline si el legado no es clonable.
- [x] 0.6 Actualizar `proposal.md` (tabla equivalencias + plan vs hecho) y `openspec/specs/README.md`.
- [x] 0.7 Añadir `migration-catalog.md` (catálogo por fila: legado, destino, ola, estado) enlazado desde `design.md`; ampliar filas al clonar el legado.

## 1. Baseline y OpenSpec

- [ ] 1.1 Clonar `Designcotizacionesmodule` y documentar stack (React, router, estado, HTTP).
- [ ] 1.2 Completar tabla de equivalencias en `design.md` con rutas y módulos reales del legado (filas destino ya ancladas; origen pendiente de inventario).
- [ ] 1.3 Refinar deltas bajo `changes/migracion-react-a-angular/specs/` (ADDED/MODIFIED) con requisitos por pantalla o subdominio cuando exista inventario.
- [ ] 1.4 Ejecutar flujo `/opsx:sync` tras el primer clon exitoso del legado y vaciar o archivar `LEGACY_REPO_UNAVAILABLE` si ya no aplica.

## 2. Destino (Angular)

- [x] 2.1 Crear o importar proyecto Angular en la raíz o `apps/` según decisión de monorepo.
- [x] 2.2 Configurar entorno, proxy o `environment.ts` alineado a URLs usadas por el legado (placeholder: `apiUrl`, `proxy.conf.json`; ajustar tras inventario).
- [x] 2.3 Implementar routing y shell equivalente al layout del legado (`frontend-shell`) — placeholder accesible hasta paridad documentada.
- [x] 2.4 Implementar módulo de cotizaciones o equivalente según inventario (`cotizaciones-ui`) — listado con estados loading/error/empty; paridad fina pendiente de baseline.

## 3. Verificación

- [x] 3.1 Lista de escenarios Given/When/Then cubiertos por pruebas o checklist manual (véase checklist en `design.md`; pruebas unitarias en `AppComponent` y `CotizacionesListComponent`).
- [ ] 3.2 Actualizar specs canónicos o archivar cambio cuando la migración base esté mergeada según flujo OpenSpec.
