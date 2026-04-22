## Purpose

Establecer el contrato observable de **cómo debe organizarse y depender el código del cliente** Angular en este producto, alineado a arquitectura hexagonal (puertos y adaptadores), sin prescribir nombres de clases concretas de implementación en el spec canónico.

### Requirement: Separación de capas

El código fuente del cliente **SHALL** separar dominio puro, aplicación (casos de uso), infraestructura (adaptadores de salida) y presentación (adaptadores de entrada Angular), de forma que las dependencias apunten hacia el dominio.

#### Scenario: Dominio sin dependencias de framework

- **WHEN** existe código bajo la capa de dominio acordada en el diseño del repositorio
- **THEN** ese código **MUST NOT** importar módulos de `@angular/*` ni APIs de navegador acopladas a infraestructura no inyectada como puerto

#### Scenario: Infraestructura y red

- **WHEN** se realiza acceso HTTP, URLs, cabeceras, serialización o reintentos de red
- **THEN** esa lógica **SHALL** residir en la capa de infraestructura (adaptadores de salida), no en dominio ni en casos de uso como detalle de transporte

#### Scenario: Presentación delgada

- **WHEN** un componente o ruta de presentación necesita orquestar un flujo de usuario
- **THEN** la orquestación de negocio **SHOULD** delegarse en casos de uso o fachadas de aplicación inyectables
- **AND** la acumulación de reglas de negocio en un único componente **SHOULD** disparar refactor hacia `application` o `domain`

### Requirement: Casos de uso como unidad de aplicación

Los flujos de aplicación **SHALL** expresarse como casos de uso invocables desde la capa de presentación, coordinando puertos definidos en el dominio.

#### Scenario: Persistencia y gateways

- **WHEN** un caso de uso necesita datos externos
- **THEN** **MUST** depender de interfaces (puertos) definidas en el dominio
- **AND** las implementaciones concretas **SHALL** vivir en infraestructura

### Requirement: Estructura de carpetas bajo `src/`

El árbol de carpetas **SHALL** incluir, como mínimo conceptual, los contenedores: `app/` (bootstrap y rutas raíz), `domain/<bounded-context>/`, `application/<bounded-context>/`, `infrastructure/` (incl. `http/`, `persistence/`, etc. según diseño), `presentation/features/<bounded-context>/`, `shared/`, y `environments/`, de forma revisable en el repositorio.

#### Scenario: Verificación en revisión

- **WHEN** se revisa un cambio que añade código de cliente
- **THEN** la ubicación de archivos nuevos **MUST** ser coherente con la convención vigente documentada en `openspec/changes/migrate-react-to-angular/design.md` o en este spec tras su fusión

### Requirement: Seguridad observable en el cliente

El cliente **SHALL NOT** tratar datos sensibles como fuente de verdad frente al servidor; la gestión de tokens y almacenamiento local **SHALL** realizarse en infraestructura (p. ej. interceptores, storage acotado) sin exponer secretos al dominio como invariantes de negocio.

#### Scenario: Errores mostrados al usuario

- **WHEN** se muestra un error proveniente de la red o del servidor
- **THEN** el mensaje mostrado **SHOULD** evitar filtrar datos personales o detalles internos innecesarios

#### Scenario: Registro y telemetría

- **WHEN** se registran fallos o eventos de depuración
- **THEN** los payloads **SHOULD NOT** incluir datos personales o secretos sin política explícita del producto (**laguna de especificación** si no hay política escrita)
