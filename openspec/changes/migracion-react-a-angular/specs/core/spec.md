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

El catálogo [migration-catalog.md](../../migration-catalog.md) SHALL incluir la columna **Tipo** con valor `shell` en exactamente la fila **#1** (marco global SPA: layout, router, navegación global, tema base de aplicación) y `feature` en **#2–#6**. SHALL incluir la sección **Lista plana para Foreach** con el orden **#4** → **#1** → **#3** → **#2** → **#6** → **#5** (bootstrap global del SPA antes que el shell de aplicación; luego dependencias del dominio). SHALL existir [migration-files-queue.md](../../migration-files-queue.md) como cola en texto plano alineada a ese orden. Mientras no exista inventario verificable del legado, las rutas legado en el catálogo y en `migration-files-queue.md` MAY usar el marcador **`LEGACY_PATH_PENDING`** documentado en la discrepancia `LEGACY_REPO_UNAVAILABLE`.

#### Scenario: Primera fila shell en catálogo

- GIVEN el catálogo de migración del cambio activo
- WHEN se valida la columna **Tipo** de la tabla principal
- THEN la fila **#1** es `shell` y **#2–#6** son `feature`

#### Scenario: Foreach sin pantalla suelta

- GIVEN un lote Foreach sobre el catálogo
- WHEN se ordenan los ítems por la lista plana
- THEN el primer bloque corresponde a **#4** (global/env/estilos) antes que **#1** (layout de aplicación) y antes que cualquier pantalla **#2**

#### Scenario: Sustitución tras inventario

- GIVEN el clon del repositorio legado es accesible y la discrepancia de baseline queda resuelta o archivada
- WHEN se completa la tarea **1.2** del checklist
- THEN cada **`LEGACY_PATH_PENDING`** en el catálogo y en `migration-files-queue.md` queda sustituido por al menos una ruta relativa al repo legado o por un grupo explícito de paths separados por `; `
