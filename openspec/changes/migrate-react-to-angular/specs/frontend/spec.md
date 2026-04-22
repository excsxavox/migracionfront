# Delta: frontend (change `migrate-react-to-angular`)

Cambios propuestos respecto a `openspec/specs/frontend/spec.md`. Al fusionar, integrar **ADDED** en el canónico.

## ADDED

### Requirement: Árbol de carpetas normativo

La disposición concreta de directorios bajo `src/` (incluyendo `app/`, `domain/`, `application/`, `infrastructure/`, `presentation/features/`, `shared/`, `environments/`) **SHALL** seguir el árbol y las reglas operativas definidas en `openspec/changes/migrate-react-to-angular/design.md` hasta que un cambio OpenSpec posterior **MODIFIED** o **REMOVED** esta norma.

#### Scenario: Conflicto entre spec canónico y design del cambio

- **WHEN** el spec canónico de `frontend` y el `design.md` del cambio divergen en estructura
- **THEN** **MUST** resolverse actualizando el spec canónico y el delta de forma coherente en el mismo lote de trabajo
- **AND** **MUST NOT** dejarse ambigüedad sin anotar **laguna de especificación**

### Requirement: Límites de importación entre capas

El código **SHALL** respetar la dirección de dependencias del documento de diseño del cambio (presentación → aplicación → dominio; infraestructura implementa puertos del dominio).

#### Scenario: Herramienta de verificación

- **WHEN** el repositorio incorpora lint de límites de capas (p. ej. ESLint boundaries)
- **THEN** la configuración **SHOULD** alinearse con las carpetas del `design.md`
- **AND** hasta existir dicha herramienta, la verificación **MAY** ser solo revisión humana (**laguna de especificación** en automatización)
