## Purpose

Este repositorio es el **producto destino** donde se versiona y evoluciona el nuevo cliente web. El código y la especificación deben permitir sustituir el cliente React legado sin ambigüedad sobre qué repositorio es fuente de verdad para commits y qué remoto es solo referencia.

### Requirement: Repositorio destino como fuente de verdad

El sistema de trabajo del equipo **SHALL** usar el repositorio destino en GitHub (`https://github.com/excsxavox/migracionfront.git`) para commits, ramas y especificación OpenSpec que rijan el cliente nuevo.

#### Scenario: Implementador añade código del cliente Angular

- **WHEN** se incorpora código de aplicación al producto
- **THEN** los cambios **MUST** registrarse en este repositorio destino
- **AND** la especificación observable relevante **SHOULD** actualizarse en el mismo cambio cuando el comportamiento acordado cambie

### Requirement: Remoto legado como referencia de lectura

El remoto de origen del front React (`https://github.com/Fer-Nexti/Designcotizacionesmodule`) **SHALL** tratarse como referencia de pantallas, flujos y contratos implícitos salvo proceso explícito que indique lo contrario.

#### Scenario: Contraste de implementación con el legado

- **WHEN** se necesita alinear comportamiento o UI con el sistema anterior
- **THEN** el equipo **MAY** consultar el remoto legado como lectura
- **AND** las correcciones funcionales **MUST** aplicarse en el destino para evitar deriva no versionada en el legado

### Requirement: Trazabilidad especificación–comportamiento

Los requisitos en `openspec/specs/` **SHALL** describir comportamiento verificable o restricciones comprobables (incluidas reglas de estructura de código cuando formen parte del contrato del producto).

#### Scenario: Requisito no testeable

- **WHEN** un enunciado no se puede verificar por revisión, prueba o inspección del artefacto
- **THEN** **MUST** marcarse explícitamente como **laguna de especificación** hasta precisarse
