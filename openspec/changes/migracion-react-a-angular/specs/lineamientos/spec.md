# Delta para Lineamientos

## ADDED Requirements

### Requirement: Procedimiento `/opsx:sync` en el repositorio

El repositorio SHALL incluir `.cursor/commands/opsx-sync.md` describiendo el sync as-built entre código Angular, reglas `.cursor/rules/*.mdc` y `openspec/specs/`, incluyendo pasos 1–11 y la carpeta `openspec/sync/discrepancies/`.

#### Scenario: Divergencia registrada

- GIVEN una divergencia que no se resuelve en el commit actual
- WHEN se documenta según el comando
- THEN existe un fichero bajo `openspec/sync/discrepancies/` con severidad y acción propuesta
