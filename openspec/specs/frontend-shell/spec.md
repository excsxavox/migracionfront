# Frontend shell — Layout y navegación (destino Angular)

## Purpose

Describir el **comportamiento observable** del contenedor de aplicación en el destino (Angular): shell, layout, navegación y estados globales visibles al usuario, en **relación** con el baseline del legado React en `https://github.com/Fer-Nexti/Designcotizacionesmodule`.

**Baseline legado:** estructura de rutas, layout principal y puntos de entrada de la SPA React tal como existan en el código del origen (inventario pendiente si el remoto no es accesible).

**Resultado en destino:** equivalente en Angular (rutas standalone, componentes de layout) con la misma semántica de navegación salvo discrepancias documentadas.

## Requirements

### Requirement: Paridad de navegación observable

El destino SHALL ofrecer rutas y títulos o encabezados visibles equivalentes a los del legado para cada entrada listada en la tabla de equivalencias de `openspec/changes/migracion-react-a-angular/design.md`, o SHALL documentar la desviación como discrepancia intencional.

#### Scenario: Ruta equivalente

- GIVEN una ruta documentada en la tabla legado → destino con estado **paridad**
- WHEN el usuario navega a la URL destino
- THEN el conjunto de regiones de layout y el flujo principal coinciden con el legado desde la perspectiva del usuario **o** la diferencia aparece en `design.md` o en `openspec/sync/discrepancies/`

### Requirement: Estados globales de UI

Errores de red, spinners de carga y mensajes de autorización visibles en el shell SHALL ser al menos tan claros como en el legado para los mismos flujos, salvo mejora documentada que no reduzca información esencial.

#### Scenario: Error de API en shell

- GIVEN un fallo de red al cargar datos del layout
- WHEN el usuario está en cualquier ruta hija
- THEN el sistema MUST mostrar un estado de error coherente con el contrato descrito en este spec o en `cotizaciones-ui` sin dejar la vista en blanco silenciosa

### Requirement: Shell accesible y punto de entrada a cotizaciones

Hasta completar la paridad fina con el legado, el destino SHALL exponer un layout con cabecera, marca y navegación al dominio de cotizaciones, accesible por teclado y con foco visible.

#### Scenario: Raíz redirige a cotizaciones

- GIVEN el usuario abre la raíz del sitio
- WHEN la aplicación termina de cargar
- THEN la URL observable es `/cotizaciones` o el contenido mostrado corresponde al listado de cotizaciones

#### Scenario: Navegación por teclado

- GIVEN el usuario usa solo teclado
- WHEN recorre cabecera y enlaces de navegación
- THEN los controles interactivos son enfocables y el foco es visible
