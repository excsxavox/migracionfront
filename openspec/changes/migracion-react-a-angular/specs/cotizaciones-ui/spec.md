# Delta para Cotizaciones UI

## ADDED Requirements

### Requirement: Módulo de cotizaciones trazado al legado

El dominio `cotizaciones-ui` SHALL modelar únicamente comportamiento UI del módulo homónimo inferido del nombre del repo legado, con escenarios contrastables con pantallas del origen una vez inventariadas. El listado principal del módulo SHALL trazarse a la fila **#2** de [migration-catalog.md](../../migration-catalog.md).

#### Scenario: API fuera de este repo

- GIVEN endpoints consumidos por el módulo
- WHEN se especifica comportamiento
- THEN se asume backend existente sin ampliar alcance backend en OpenSpec salvo decisión explícita en `proposal.md`

### Requirement: Listado bajo ruta lazy y puerto HTTP

El destino SHALL cargar la ruta `/cotizaciones` de forma diferida (`loadChildren` / rutas del feature; **#2** con registro lazy en shell **#1**) y SHALL consumir datos vía un puerto (`CotizacionesPort`) implementado por adaptador HTTP (**#3**), alineable al contrato real cuando se documente desde el legado.

#### Scenario: Contrato HTTP provisional (**#3**)

- GIVEN el endpoint exacto del legado no está cerrado en el inventario
- WHEN se implementa el adaptador
- THEN la URL base y la ruta relativa (`cotizacionesListRelativePath` sobre `apiUrl`; por defecto `/cotizaciones`) están centralizadas en configuración (**#4**: `environment`, proxy, tokens inyectados) y son ajustables sin cambiar la vista (**#2**)

### Requirement: Errores de API sin respuesta cruda al usuario (**#6**)

Ante fallos HTTP o de red en el listado (**#2**), la aplicación SHALL cumplir el requisito canónico «Errores de API sin presentación cruda al usuario» en `openspec/specs/cotizaciones-ui/spec.md`. La aplicación SHALL mostrar un mensaje legible para el usuario y SHALL NOT mostrar cuerpos de error del servidor sin procesar (p. ej. HTML de traza o **500** como único contenido visible). El saneamiento vía `mapHttpErrorToMessage` SHALL ser suficiente para cumplir esta obligación cuando el cuerpo sea HTML o no estructurado; la adopción de mocks para desarrollo offline SHALL documentarse en `design.md` y en el catálogo **#6** (registro en **#4**).

#### Scenario: Error 500 con cuerpo HTML

- GIVEN el backend responde con error y cuerpo no JSON
- WHEN la vista de listado deja de estar en carga
- THEN el usuario ve un mensaje de error de la aplicación **o** texto seguro derivado del mapeo, sin página HTML completa del servidor embebida como contenido principal de la vista

#### Scenario: API ausente en desarrollo

- GIVEN no hay backend alcanzable y `useCotizacionesMock` es falso
- WHEN el usuario intenta cargar el listado
- THEN aparece un estado de error coherente con **#6** (mensaje controlado)

#### Scenario: Mock activo en desarrollo (**#4** / **#6**)

- GIVEN `environment.useCotizacionesMock` es verdadero y el build no es de producción
- WHEN la aplicación solicita el listado
- THEN el usuario ve al menos un ítem de demostración sin error de red

### Requirement: Pantallas y rutas adicionales del módulo (**#5**)

Cada pantalla o flujo de usuario del **mismo dominio de producto** que el listado **#2** y que exista en el legado pero no esté cubierto por la fila **#2** del [catálogo](../../migration-catalog.md) SHALL inventariarse en **Ola 1** y SHALL migrarse o quedar explícitamente fuera de alcance con justificación en `design.md` o discrepancias. El destino SHALL documentar equivalencias legado → destino (rutas UI, carpetas bajo `src/app/features/…`) y SHALL implementar rutas lazy y componentes alineados al contrato observable del legado cuando estén en alcance.

#### Scenario: Inventario antes de implementar

- GIVEN el clon del legado es accesible
- WHEN se detecta una ruta React o pantalla no mapeada en **#2**
- THEN existe una fila de catálogo (**#5** extendida o nueva fila numerada acordada por el equipo) con paths legado y destino, una entrada en `migration-files-queue.md`, y subchecklist **3.1** en `tasks.md` actualizada

#### Scenario: Paridad o discrepancia

- GIVEN una pantalla adicional documentada en **#5**
- WHEN el usuario completa el flujo equivalente en el destino
- THEN el comportamiento observable coincide con el legado **o** la desviación está registrada como discrepancia intencional en `design.md`

#### Scenario: Navegación global

- GIVEN una nueva ruta destino requiere enlace desde el shell
- WHEN se implementa **#5**
- THEN los cambios en cabecera o nav quedan trazados en delta o spec de `frontend-shell` (**#1**) además de `cotizaciones-ui` cuando aplique
