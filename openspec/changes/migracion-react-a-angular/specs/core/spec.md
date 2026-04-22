# Delta para Core

## ADDED Requirements

### Requirement: Migración front con baseline legado

El sistema de front en el repositorio destino SHALL implementarse como **migración desde React** hacia **Angular**, tomando como referencia el comportamiento observable del código en `https://github.com/Fer-Nexti/Designcotizacionesmodule`, sin redefinir el producto como greenfield.

#### Scenario: Paridad documentada

- GIVEN un flujo de usuario presente en el legado y listado en la tabla de equivalencias de `design.md`
- WHEN el flujo está implementado en el destino
- THEN el resultado observable (navegación, datos mostrados, mensajes de error) coincide con el legado **o** la diferencia está descrita como discrepancia intencional en `design.md`

#### Scenario: Capacidad no portada

- GIVEN una capacidad que existía en el legado y no se implementará en Angular
- WHEN se cierra el alcance del cambio o del release
- THEN queda explícito en artefactos OpenSpec que **deja de existir** y el motivo
