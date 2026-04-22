# Lineamientos — Convenciones de especificación y sync

## Purpose

Este dominio define **lineamientos de documentación y sincronización** para el repositorio destino de migración **React (legado) → Angular**, de forma que el comportamiento acordado permanezca trazable respecto al proyecto origen `https://github.com/Fer-Nexti/Designcotizacionesmodule` y respecto a las reglas de edición en Cursor.

## Requirements

### Requirement: Comando de sincronización as-built

El proyecto SHALL mantener el procedimiento **`/opsx:sync`** en `.cursor/commands/opsx-sync.md` y SHALL ejecutarlo o su equivalente manual cuando se incorpore código nuevo, se modifiquen rutas visibles o cambien las reglas `.cursor/rules/*.mdc`, de modo que specs y reglas no queden obsoletos frente al código.

#### Scenario: Cambio en routing o shell

- GIVEN una modificación en rutas o componentes de shell que afecte navegación o layout observable
- WHEN el cambio se integra en la rama de trabajo
- THEN `openspec/specs/frontend-shell/spec.md` o el delta activo correspondiente SHALL actualizarse en el mismo lote de trabajo o SHALL registrarse una discrepancia bajo `openspec/sync/discrepancies/`

### Requirement: Alineación con cinco reglas canónicas

Los lineamientos de implementación en Cursor SHALL ser coherentes con los ficheros: `estandar.mdc`, `reglas-arquitectura.mdc`, `testing.mdc`, `use-custom-ui-components.mdc`, `use-global-color-palette.mdc`. Si el código o el framework Angular imponen una excepción estable, SHALL documentarse en `openspec/sync/discrepancies/` y en el spec del dominio afectado.

#### Scenario: Regla contradice el stack

- GIVEN una regla `.mdc` que asume patrones del legado React
- WHEN el destino es Angular
- THEN la regla SHALL actualizarse a patrones Angular equivalentes o SHALL marcarse la discrepancia hasta resolución

### Requirement: Trazabilidad legado en toda especificación

Todo requisito nuevo en dominios de producto (`frontend-shell`, `cotizaciones-ui`, extensiones futuras) SHALL indicar **baseline legado** (qué comportamiento o pantalla del origen se sustituye o replica) y **resultado en destino**, salvo que se documente ruptura intencional.

#### Scenario: Laguna de especificación

- GIVEN un comportamiento UI aún no contrastable con el legado por falta de acceso al repo origen
- WHEN se documenta en OpenSpec
- THEN SHALL etiquetarse explícitamente como **laguna de especificación** hasta completar inventario
