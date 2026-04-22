# Delta para Cotizaciones UI

## ADDED Requirements

### Requirement: Módulo de cotizaciones trazado al legado

El dominio `cotizaciones-ui` SHALL modelar únicamente comportamiento UI del módulo homónimo inferido del nombre del repo legado, con escenarios contrastables con pantallas del origen una vez inventariadas.

#### Scenario: API fuera de este repo

- GIVEN endpoints consumidos por el módulo
- WHEN se especifica comportamiento
- THEN se asume backend existente sin ampliar alcance backend en OpenSpec salvo decisión explícita en `proposal.md`

### Requirement: Listado bajo ruta lazy y puerto HTTP

El destino SHALL cargar la ruta `/cotizaciones` de forma diferida (`loadChildren` / rutas del feature) y SHALL consumir datos vía un puerto (`CotizacionesPort`) implementado por adaptador HTTP, alineable al contrato real cuando se documente desde el legado.

#### Scenario: Contrato HTTP provisional

- GIVEN el endpoint exacto del legado no está cerrado en el inventario
- WHEN se implementa el adaptador
- THEN la URL base y la ruta relativa (`/cotizaciones` sobre `apiUrl`) están centralizadas en configuración (`environment`, proxy) y son ajustables sin cambiar la vista
