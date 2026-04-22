# Cotizaciones UI — Módulo de cotizaciones (paridad con legado)

## Purpose

Documentar el comportamiento observable del **módulo de cotizaciones** (nombre inferido del repositorio legado `Designcotizacionesmodule`) al migrar su interfaz a Angular en el destino.

**Baseline legado:** pantallas, formularios, listados y acciones de usuario del módulo de cotizaciones en React en el repo origen (rutas y componentes exactos: **pendiente de inventario** en clon local).

**Resultado en destino:** funcionalidades equivalentes en componentes y rutas Angular, consumiendo las mismas APIs HTTP que ya consume el legado salvo que se documente un cambio de contrato fuera de este repo.

## Requirements

### Requirement: Paridad funcional del módulo

Las capacidades de usuario del módulo de cotizaciones que existan en el legado y estén en alcance SHALL comportarse de forma equivalente en el destino respecto a datos mostrados, validaciones visibles y resultados de acciones, salvo desviaciones listadas en `design.md`.

#### Scenario: Flujo principal de cotización

- GIVEN un flujo de cotización documentado en la tabla de equivalencias
- WHEN el usuario lo completa en el destino
- THEN los datos persistidos o mensajes de resultado coinciden con el legado **o** la diferencia está registrada como discrepancia intencional

### Requirement: Contratos HTTP asumidos existentes

Las llamadas HTTP desde este módulo SHALL asumirse **existentes** en backend ajeno a este flujo de migración; si el legado usa URLs, headers o códigos de error determinados, el destino SHALL conservar el mismo contrato observable (mismos códigos y mensajes expuestos al usuario salvo mejora documentada).

#### Scenario: Código de error conocido

- GIVEN un endpoint que en el legado muestra un mensaje específico ante `4xx/5xx`
- WHEN el destino invoca el mismo endpoint en el mismo caso
- THEN el usuario MUST ver el mismo mensaje esencial **o** una discrepancia MUST registrarse en `openspec/sync/discrepancies/`

### Requirement: Listado con estados explícitos (destino actual)

La vista de listado de cotizaciones en el destino SHALL mostrar estados de **carga**, **error** (con posibilidad de reintentar) y **vacío**, y SHALL no ocultar errores de red o HTTP sin mensaje al usuario.

#### Scenario: Carga inicial

- GIVEN el usuario navega a `/cotizaciones`
- WHEN la petición de datos está en curso
- THEN se muestra un indicador de carga accesible (`aria-live="polite"`)

#### Scenario: Error de red o HTTP

- GIVEN la petición al API falla
- WHEN la vista deja de estar en carga
- THEN se muestra un mensaje de error y un control para reintentar

#### Scenario: Lista vacía

- GIVEN el API responde con lista vacía
- WHEN la vista deja de estar en carga
- THEN se muestra un mensaje de vacío sin error

#### Scenario: Datos mostrados

- GIVEN el API responde con uno o más elementos
- WHEN la vista deja de estar en carga
- THEN se listan títulos (y estado si viene en el payload) de cada elemento

### Requirement: Errores de API sin presentación cruda al usuario

Ante fallos de red o HTTP en el listado, el destino SHALL mostrar un mensaje breve y legible producido por la aplicación (p. ej. vía mapeo centralizado de errores) y SHALL NOT usar como contenido principal de la vista el HTML completo del servidor, una página de error embebida ni una traza técnica sin contexto. Si el equipo adopta mocks o interceptores para desarrollo sin backend, el enfoque SHALL documentarse en el cambio activo de migración y en la fila **#6** de `openspec/changes/migracion-react-a-angular/migration-catalog.md`.

#### Scenario: Cuerpo de error no estructurado

- GIVEN el servidor responde con cuerpo HTML o texto no estructurado que no es JSON útil para la UI
- WHEN se muestra el estado de error al usuario
- THEN el mensaje es acotado y legible (p. ej. derivado de código o razón HTTP) **o** se documenta **laguna** hasta implementar saneamiento adicional

#### Scenario: Trazabilidad con catálogo

- GIVEN la fila **#6** del catálogo de migración
- WHEN se cierra la paridad con el legado
- THEN el comportamiento observable de errores queda alineado al baseline o registrado como discrepancia intencional en `design.md`
