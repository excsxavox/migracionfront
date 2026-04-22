## Purpose

Definir el alcance y las expectativas observables de la **migración del cliente** desde React hacia Angular, manteniendo al backend y los contratos de red como supuesto estable salvo que un cambio explícito diga lo contrario.

### Requirement: Sustitución del cliente

La migración **SHALL** interpretarse como **reimplementación del front** en Angular en este repositorio, preservando la integración con el backend existente mientras dicho contrato se mantenga.

#### Scenario: Backend sin cambios de contrato

- **WHEN** el backend y la API expuesta permanecen iguales
- **THEN** el nuevo cliente **MUST** consumir los mismos contratos de red acordados (forma y semántica a definir o documentar en especificación de integración cuando exista)

#### Scenario: Cambio de contrato de API

- **WHEN** el backend o la versión de API deja de ser compatible con el legado
- **THEN** **MUST** existir especificación explícita de versionado o plan por fases
- **AND** hasta entonces se trata como **laguna de especificación** respecto a la paridad exacta

### Requirement: Referencia al código legado

El sistema React de referencia **SHALL** identificarse como el remoto legado indicado por el proyecto (`https://github.com/Fer-Nexti/Designcotizacionesmodule`), usado para inventario de módulos, rutas y flujos. Los commits de evolución del producto nuevo **SHALL NOT** aplicarse a ese remoto salvo proceso explícito.

#### Scenario: Inventario de contextos acotados

- **WHEN** se planifica la estructura de dominio de aplicación y presentación
- **THEN** el equipo **SHALL** derivar los bounded contexts del análisis del legado
- **AND** **MUST NOT** mezclar entidades entre contextos sin relación explícita en especificación o dominio

### Requirement: Paridad funcional en alcance migrado

Para cada área de producto incluida en el alcance de la migración, el comportamiento observable del usuario **SHALL** ser equivalente al del legado salvo desviaciones documentadas y aceptadas.

#### Scenario: Validaciones y errores

- **WHEN** el legado aplica validación solo en cliente
- **THEN** la paridad **SHOULD** documentarse en escenarios (entrada / resultado observable)
- **AND** cualquier comportamiento no documentado en el legado **MAY** tratarse como **laguna de especificación** hasta extraerse del código de referencia o de pruebas

### Requirement: Riesgos transversales documentados

Los riesgos de regresión funcional, SEO dependiente de renderizado solo en cliente, y convivencia futura de dos clientes **SHALL** considerarse en diseño y pruebas cuando apliquen al alcance.

#### Scenario: Corte único de cliente

- **WHEN** no existe convivencia React/Angular
- **THEN** el riesgo principal de aceptación **SHALL** incluir regresión funcional end-to-end frente a criterios de aceptación por feature

#### Scenario: Convivencia de dos clientes

- **WHEN** se prevé despliegue simultáneo de React y Angular
- **THEN** **MUST** documentarse de forma observable el acuerdo sobre SSO, cookies (`SameSite`, dominio) y CORS
- **AND** hasta ese acuerdo existe **laguna de especificación** en despliegue combinado
