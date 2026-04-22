# Delta: migration (change `migrate-react-to-angular`)

Cambios propuestos respecto a `openspec/specs/migration/spec.md`. Al fusionar, integrar **ADDED** en el canónico.

## ADDED

### Requirement: Matriz de paridad feature ↔ comportamiento observable

Para cada feature incluida en el alcance de la migración, el equipo **SHALL** mantener una matriz (en `design.md`, `tasks.md`, o documento enlazado desde ellos) que enlace al menos: identificador de feature en el legado, caso de uso o flujo en el destino, y escenarios de aceptación observables.

#### Scenario: Feature sin fila en la matriz

- **WHEN** se implementa una pantalla o flujo que existe en el legado
- **THEN** **MUST** existir una fila correspondiente en la matriz o **MUST** marcarse como fuera de alcance con justificación escrita
- **AND** si no hay criterio verificable, **MUST** marcarse como **laguna de especificación**

### Requirement: Supuesto de backend estable

Salvo documento de producto que lo revoque, la migración **SHALL** asumir que el backend y los contratos de red se mantienen; el alcance es **reemplazo de cliente**.

#### Scenario: Descubrimiento de ruptura de API

- **WHEN** la implementación detecta incompatibilidad con el backend real
- **THEN** **MUST** abrirse decisión explícita (versión de API, coordinación backend, o fase de migración)
- **AND** hasta actualizar specs, el comportamiento esperado frente a esa API permanece como **laguna de especificación**
