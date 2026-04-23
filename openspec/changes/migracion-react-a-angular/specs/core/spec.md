# Delta para Core

## ADDED Requirements

### Requirement: Migración front con baseline legado

El sistema de front en el repositorio destino SHALL implementarse como **migración desde React** hacia **Angular**, tomando como referencia el comportamiento observable del código en `https://github.com/Fer-Nexti/Designcotizacionesmodule`, sin redefinir el producto como greenfield. La trazabilidad por bloque migrable SHALL mantenerse en [migration-catalog.md](../../migration-catalog.md) (filas **#1–#6** y siguientes).

#### Scenario: Paridad documentada

- GIVEN un flujo de usuario presente en el legado y listado en la tabla de equivalencias de `design.md`
- WHEN el flujo está implementado en el destino
- THEN el resultado observable (navegación, datos mostrados, mensajes de error) coincide con el legado **o** la diferencia está descrita como discrepancia intencional en `design.md`

#### Scenario: Capacidad no portada

- GIVEN una capacidad que existía en el legado y no se implementará en Angular
- WHEN se cierra el alcance del cambio o del release
- THEN queda explícito en artefactos OpenSpec que **deja de existir** y el motivo

### Requirement: Catálogo de migración con Tipo y orden Foreach (**#1–#6**)

El catálogo [migration-catalog.md](../../migration-catalog.md) SHALL incluir la columna **Tipo** con valor `shell` en exactamente la fila **#1** (marco global SPA: layout, router, navegación global, tema base) y `feature` en **#2–#6**. SHALL incluir una **lista plana** de paths del legado ordenada para el paso **Foreach**: primero el bloque **shell** (**#1**), luego **features** en el orden de dependencia documentado en el catálogo (p. ej. **#4** → **#3** → **#2** → **#6** → **#5**), sustituyendo placeholders **TBD** por rutas de archivo reales al completar **Ola 1**.

#### Scenario: Primera fila es marco global

- GIVEN el catálogo de migración del cambio activo
- WHEN se valida la columna **Tipo**
- THEN la fila **#1** es `shell` y ninguna otra fila SHALL ser `shell` salvo que el equipo documente división explícita en `proposal.md` y amplíe el catálogo

#### Scenario: Foreach sin pantalla suelta

- GIVEN un lote Foreach sobre el catálogo
- WHEN se ordenan los ítems por la lista plana
- THEN el primer bloque de paths legado corresponde al marco global (**#1**) antes que pantallas de feature dependientes
