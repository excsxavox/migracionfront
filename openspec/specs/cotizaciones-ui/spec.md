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

Ante fallos de red o HTTP en el listado, el destino SHALL mostrar un mensaje breve y legible producido por la aplicación (p. ej. vía mapeo centralizado de errores) y SHALL NOT usar como contenido principal de la vista el HTML completo del servidor, una página de error embebida ni una traza técnica sin contexto. El cuerpo de error HTTP MUST NOT usarse como mensaje principal cuando sea un documento HTML o un fragmento HTML no trivial. Si el equipo adopta mocks o interceptores para desarrollo sin backend, el enfoque SHALL documentarse en el cambio activo de migración y en la fila **#6** de `openspec/changes/migracion-react-a-angular/migration-catalog.md`.

#### Scenario: Cuerpo de error no estructurado

- GIVEN el servidor responde con cuerpo HTML o texto no estructurado que no es JSON útil para la UI
- WHEN se muestra el estado de error al usuario
- THEN el mensaje es acotado y legible (p. ej. derivado de código o razón HTTP) sin etiquetas HTML del cuerpo de respuesta visibles en pantalla

#### Scenario: Respuesta de error con HTML

- GIVEN el servidor responde con cuerpo de error que es HTML (p. ej. página 502)
- WHEN la vista deja de estar en carga
- THEN el usuario ve un mensaje genérico explicativo en español y MAY ver un control para reintentar

#### Scenario: Trazabilidad con catálogo

- GIVEN la fila **#6** del catálogo de migración
- WHEN se cierra la paridad con el legado
- THEN el comportamiento observable de errores queda alineado al baseline o registrado como discrepancia intencional en `design.md`

### Requirement: Rutas y pantallas adicionales del dominio (**#5**)

Las pantallas o flujos del dominio de cotizaciones (u homólogo en el legado) que **no** estén cubiertos por el listado principal documentado en el cambio activo de migración como fila **#2** SHALL seguir el mismo criterio de paridad: inventario en catálogo (**#5**), cola Foreach, tareas y deltas del cambio activo antes de implementación bajo `src/app/features/…`. Cualquier enlace nuevo en el shell global SHALL coordinarse con `frontend-shell` (**#1**). Además del listado principal, el destino MAY exponer rutas hijas bajo el prefijo `/cotizaciones` (p. ej. información); cada ruta satélite SHOULD cargarse de forma diferida y, si el producto la ofrece, SHALL ser alcanzable desde la navegación principal del shell.

#### Scenario: Una pantalla Foreach

- GIVEN una pantalla legado adicional inventariada
- WHEN se documenta en OpenSpec
- THEN existe trazabilidad **#5** con paths legado y destino y escenarios contrastables en el delta `cotizaciones-ui` del cambio o su sucesor mergeable

#### Scenario: Pantalla informativa satélite (destino actual **5a**)

- GIVEN el usuario navega a `/cotizaciones/acerca`
- WHEN la vista termina de cargar
- THEN se muestra contenido estructurado con encabezado principal y al menos una sección de alcance o ayuda, sin depender de llamadas HTTP obligatorias para esta pantalla

#### Scenario: Trazabilidad con catálogo **#5**

- GIVEN la fila **#5** del catálogo de migración
- WHEN se añade o modifica una ruta satélite en el destino
- THEN el path destino y el propósito observable quedan reflejados en `migration-catalog.md` y en la tabla de equivalencias del cambio activo hasta completar inventario del legado
