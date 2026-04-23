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

### Requirement: Documento HTML y estilos globales alineados al shell (**#4**)

El bootstrap del SPA (catálogo **#4**) SHALL incluir `src/index.html` con metadatos mínimos del documento (título, `lang` del `html` acorde al locale del producto) y SHALL cargar `src/styles.css` con tokens CSS globales (p. ej. `--app-color-*`, `--app-font-sans`) que el shell (**#1**) y las vistas MAY reutilizar para mantener contraste y tipografía coherentes hasta completar inventario del legado.

#### Scenario: Idioma del documento

- GIVEN el usuario abre la aplicación
- WHEN el documento se renderiza
- THEN el elemento raíz `html` declara un `lang` explícito coherente con el idioma principal del producto

#### Scenario: Tokens globales disponibles

- GIVEN los estilos globales están cargados
- WHEN un componente del shell o de una vista usa variables `--app-*` definidas en `src/styles.css`
- THEN los valores son consistentes en toda la SPA salvo override documentado en `design.md`
