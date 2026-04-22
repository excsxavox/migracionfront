# Delta para Cotizaciones UI

## ADDED Requirements

### Requirement: Módulo de cotizaciones trazado al legado

El dominio `cotizaciones-ui` SHALL modelar únicamente comportamiento UI del módulo homónimo inferido del nombre del repo legado, con escenarios contrastables con pantallas del origen una vez inventariadas. El listado principal del módulo SHALL trazarse a la fila **#2** de [migration-catalog.md](../../migration-catalog.md).

#### Scenario: API fuera de este repo

- GIVEN endpoints consumidos por el módulo
- WHEN se especifica comportamiento
- THEN se asume backend existente sin ampliar alcance backend en OpenSpec salvo decisión explícita en `proposal.md`

### Requirement: Listado bajo ruta lazy y puerto HTTP

El destino SHALL cargar la ruta `/cotizaciones` de forma diferida (`loadChildren` / rutas del feature; **#2**) y SHALL consumir datos vía un puerto (`CotizacionesPort`) implementado por adaptador HTTP (**#3**), alineable al contrato real cuando se documente desde el legado.

#### Scenario: Contrato HTTP provisional

- GIVEN el endpoint exacto del legado no está cerrado en el inventario
- WHEN se implementa el adaptador
- THEN la URL base y la ruta relativa (`/cotizaciones` sobre `apiUrl`) están centralizadas en configuración (`environment`, proxy; **#4**) y son ajustables sin cambiar la vista

### Requirement: Errores de API sin respuesta cruda al usuario (**#6**)

Ante fallos HTTP o de red en el listado (**#2**), la aplicación SHALL cumplir el requisito canónico «Errores de API sin presentación cruda al usuario» en `openspec/specs/cotizaciones-ui/spec.md`. La aplicación SHALL mostrar un mensaje legible para el usuario y SHALL NOT mostrar cuerpos de error del servidor sin procesar (p. ej. HTML de traza o **500** como único contenido visible). El saneamiento vía `mapHttpErrorToMessage` SHALL ser suficiente para cumplir esta obligación cuando el cuerpo sea HTML o no estructurado; la adopción de mocks para desarrollo offline SHALL documentarse en `design.md` y en el catálogo **#6**.

#### Scenario: Error 500 con cuerpo HTML

- GIVEN el backend responde con error y cuerpo no JSON
- WHEN la vista de listado deja de estar en carga
- THEN el usuario ve un mensaje de error de la aplicación **o** texto seguro derivado del mapeo, sin página HTML completa del servidor embebida como contenido principal de la vista

#### Scenario: API ausente en desarrollo

- GIVEN no hay backend alcanzable y `useCotizacionesMock` es falso
- WHEN el usuario intenta cargar el listado
- THEN aparece un estado de error coherente con **#6** (mensaje controlado)

#### Scenario: Mock activo en desarrollo (**#6**, bandera **#4**)

- GIVEN `environment.useCotizacionesMock` es verdadero y el build no es de producción
- WHEN la aplicación solicita el listado
- THEN el usuario ve al menos un ítem de demostración sin error de red
