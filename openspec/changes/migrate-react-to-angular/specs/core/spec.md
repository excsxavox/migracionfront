# Delta: core (change `migrate-react-to-angular`)

Cambios propuestos respecto a `openspec/specs/core/spec.md`. Al fusionar, integrar las secciones **ADDED** en el spec canónico y eliminar duplicados si ya existían.

## ADDED

### Requirement: Convención única OpenSpec en el repositorio

El equipo **SHALL** mantener un solo modelo de carpetas OpenSpec bajo `openspec/specs/<dominio>/` y `openspec/changes/<id>/` sin ramas paralelas de convención salvo que el repositorio ya contuviera otra (no es el caso al crear esta base).

#### Scenario: Nuevo colaborador localiza la especificación

- **WHEN** alguien busca el contrato de comportamiento del producto
- **THEN** **MUST** encontrar los specs canónicos bajo `openspec/specs/`
- **AND** las propuestas activas bajo `openspec/changes/<id>/`

### Requirement: Identificador del cambio de migración

El conjunto de artefactos bajo `openspec/changes/migrate-react-to-angular/` **SHALL** considerarse el cambio activo que documenta la migración React → Angular hasta su archivado o sustitución por otro cambio explícito.

#### Scenario: Trazabilidad de escenarios de migración

- **WHEN** se interpretan requisitos de migración o arquitectura de cliente introducidos junto con este cambio
- **THEN** la lectura **SHALL** incluir `proposal.md`, `design.md` y los deltas bajo `openspec/changes/migrate-react-to-angular/specs/`
