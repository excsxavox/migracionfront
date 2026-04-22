# Delta para Frontend shell

## ADDED Requirements

### Requirement: Baseline legado explícito para shell

La especificación canónica de shell SHALL referenciar el layout y rutas del legado `Designcotizacionesmodule` como baseline (catálogo **#1**); mientras el remoto no sea accesible, SHALL etiquetarse **laguna de especificación** para rutas concretas hasta completar inventario local.

#### Scenario: Tabla de equivalencias incompleta

- GIVEN el legado no clonable públicamente
- WHEN se documenta el shell en destino
- THEN los requisitos de paridad MUST limitarse a principios verificables o MUST enlazar discrepancia `LEGACY_REPO_UNAVAILABLE`

### Requirement: Shell Angular inicial en código

El destino SHALL incluir un componente de layout bajo `src/app/shell/` con cabecera, marca y navegación al listado de cotizaciones (**#1**), coherente con la implementación actual hasta que el inventario del legado refine copy, enlaces y **paridad de diseño** documentada en el catálogo.

#### Scenario: Paridad documentada o pendiente

- GIVEN el layout del legado está inventariado
- WHEN se compara con el shell del destino
- THEN las diferencias observables quedan en `design.md` como discrepancia intencional o se corrige el destino para paridad
