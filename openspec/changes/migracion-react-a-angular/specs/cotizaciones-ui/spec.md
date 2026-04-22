# Delta para Cotizaciones UI

## ADDED Requirements

### Requirement: Módulo de cotizaciones trazado al legado

El dominio `cotizaciones-ui` SHALL modelar únicamente comportamiento UI del módulo homónimo inferido del nombre del repo legado, con escenarios contrastables con pantallas del origen una vez inventariadas.

#### Scenario: API fuera de este repo

- GIVEN endpoints consumidos por el módulo
- WHEN se especifica comportamiento
- THEN se asume backend existente sin ampliar alcance backend en OpenSpec salvo decisión explícita en `proposal.md`
