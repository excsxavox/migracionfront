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

### Requirement: Registro de revisión shell destino cuando el baseline legado no es accesible

Mientras aplique `LEGACY_REPO_UNAVAILABLE`, el cambio SHALL documentar en `design.md` y en la fila **#1** de `migration-catalog.md` los criterios de shell verificables en destino (rutas raíz, layout padre, `router-outlet`, redirecciones, navegación, accesibilidad mínima del layout) **sin** afirmar equivalencia con rutas o componentes React hasta completar inventario (**Ola 1**).

#### Scenario: Bloqueo de baseline sin equivalencia silenciosa

- GIVEN el remoto del legado no es clonable o responde *not found*
- WHEN se completa una revisión del shell en el código destino
- THEN la documentación MUST citar `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md` y MUST limitar conclusiones a destino + catálogo **#1**

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

### Requirement: Coherencia comprobable del bootstrap (**#4**)

Los artefactos de arranque SHALL permanecer alineados entre sí: `environment.ts` y `environment.prod.ts` (flags `production`, `apiUrl`, `useCotizacionesMock`), `proxy.conf.json` (prefijo `/api` y reescritura acordada), `angular.json` (sustitución de entorno en build de producción, `proxyConfig` en `ng serve` development, estilos y assets `public/` en test), y `app.config.ts` (inyección de `API_BASE_URL` coherente con `environment.apiUrl`). La verificación automatizada SHALL enlazar a este requisito (véase `design.md` § QA).

#### Scenario: Entorno de desarrollo vs producción

- GIVEN el código fuente del destino
- WHEN se inspeccionan `environment.ts` y `environment.prod.ts`
- THEN el desarrollo SHALL tener `useCotizacionesMock` habilitado por defecto y la producción SHALL tenerlo deshabilitado, sin secretos en cliente

#### Scenario: Proxy y build

- GIVEN `proxy.conf.json` y `angular.json`
- WHEN se valida la configuración de desarrollo
- THEN `ng serve` (development) SHALL referenciar el proxy y el build de producción SHALL aplicar `fileReplacements` a `environment.prod.ts`

#### Scenario: HTML y CSS globales en disco

- GIVEN el repositorio en CI o máquina de desarrollo
- WHEN se ejecuta el script documentado de verificación estática
- THEN `src/index.html` SHALL declarar `lang` explícito y `src/styles.css` SHALL definir tokens `--app-*` y reglas de foco accesible según escenarios anteriores
