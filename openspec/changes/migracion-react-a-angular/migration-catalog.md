# Catálogo de migración — legado → destino

**Cambio:** `migracion-react-a-angular`  
**Origen (baseline):** `https://github.com/Fer-Nexti/Designcotizacionesmodule`  
**Destino:** `https://github.com/excsxavox/migracionfront`

Cada **#** es una unidad de trazabilidad (feature o pantalla coherente). La columna **Tipo** (`shell` \| `feature`) alimenta el **Foreach** del flujo de migración. Las columnas **Ruta(s) legado** y **Paths componentes legado** (incl. estilos globales, variables de tema, assets) SHALL completarse tras clon e inventario; mientras el legado no sea clonable, SHALL usarse el marcador **`LEGACY_PATH_PENDING`** (véase discrepancia `LEGACY_REPO_UNAVAILABLE`).

**Regla de oro:** las primeras filas del catálogo (**#1**, **#2**, … en orden) con **Tipo = `shell`** cubren el **marco global** del legado (layout raíz, router-outlet, cabecera/marca, navegación principal, tokens/tema/responsive base, proxy/env). Sin ellas, paridad «producto real» vs una pantalla suelta no es contrastable.

**Dato:** mientras el remoto del legado responda *repository not found* (`git ls-remote` / clon en este entorno), el estado refleja **laguna de baseline** en `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md`. **Dato (verificación en este clone, 2026-04-22):** `git ls-remote https://github.com/Fer-Nexti/Designcotizacionesmodule.git` → *repository not found*; no hay árbol legado local en el workspace.

**Hipótesis:** al desbloquear el acceso, las rutas React reales sustituirán los marcadores `BLOQUEADO: …` sin reinterpretar convenciones OpenSpec del repo.

**Inferencia:** el destino Angular **no** declara Material ni otro design system en `package.json`; la **paridad visual** frente al legado depende de inventario de tokens y componentes React (**#1**, **#2**, **#4**, **#5**).

**Resumen:** **6** filas en **4** olas (0 = SDD, 1 = inventario legado, 2 = implementación destino conocida, 3 = extensión y cierre). En la tabla, **Tipo** = `shell` solo en la fila **#1** (marco de aplicación: layout, router, nav); **#2–#6** son `feature` (incluye **#4** infra global). **Hipótesis de alineación con el flujo «shell/layout primero»:** la **Lista plana para Foreach** ordena **#4** antes de **#1** para migrar primero bootstrap global del SPA (entorno, `index`, CSS, proxy) y después el layout de aplicación; el motor Foreach SHALL usar esa lista, no un orden arbitrario por número de fila.

| # | Tipo | Nombre | Ruta(s) legado | Paths componentes legado (UI, estilos, tema, assets) | APIs / servicios tocados | Depende de | Ruta / componente destino | Paridad diseño (legado → destino) | Riesgo API | Riesgo diseño | Ola | Estado | DoD funcional | DoD visual |
|---|------|--------|----------------|------------------------------------------------------|--------------------------|------------|---------------------------|-----------------------------------|------------|---------------|-----|--------|----------------|-------------|
| **1** | **shell** | Shell / layout raíz SPA | `LEGACY_PATH_PENDING` | `LEGACY_PATH_PENDING` (layout raíz, router, top bar, sidebar si aplica, nav, cabecera, tema, assets) | N/A visible | — | `src/app/shell/layout/main-layout.component.ts`, `src/app/app.routes.ts` | TBD — objetivo «igual que legado» salvo decisión en `design.md` | Bajo | Alto si el legado usa DS distinto sin mapeo | **2** | **Destino implementado; baseline legado pendiente** | Usuario abre `/` y es redirigido a flujo cotizaciones; cabecera, skip link y nav enfocables; ruta comodín → raíz. | Layout legible desktop y viewport estrecho; jerarquía cabecera + main; foco visible; contraste copy/nav al contrastar con legado. |
| **2** | feature | Listado de cotizaciones | `LEGACY_PATH_PENDING` | `LEGACY_PATH_PENDING` (pantalla lista, estilos de módulo) | `GET` cotizaciones (path exacto TBD tras inventario) | **1**, **3**, **4** | `src/app/features/cotizaciones/pages/cotizaciones-list/`, lazy `src/app/features/cotizaciones/cotizaciones.routes.ts` | TBD — densidad, tipografía y estados vs legado | Medio (vía contrato **#3**) | Medio (listas y estados) | **2** | **Destino implementado; contrato y UI finos pendientes** | Lista con carga, error con **Reintentar**, vacío sin falso error; datos mínimos (título, estado si existe). | Estados loading/error/empty claramente diferenciados; sin pantalla en blanco silenciosa; lista usable en móvil (p. ej. ≤768px vs legado). |
| **3** | feature | Cliente HTTP cotizaciones | `LEGACY_PATH_PENDING` | `LEGACY_PATH_PENDING` (hooks/servicios/fetch) | `GET` `{apiUrl}/cotizaciones` (**hipótesis** hasta inventario) | **4** | `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts`, `CotizacionesPort`, `API_BASE_URL`, `src/app/app.config.ts` | N/A (no UI) | Alto: path, envoltura `{ data }`, cuerpos error HTML | Bajo | **2** | **Implementado (provisional)** | Normaliza array o `{ data: [] }`; errores mapeados a mensaje legible para la vista. | N/A |
| **4** | feature | Entorno, proxy y estilos globales mínimos | `LEGACY_PATH_PENDING` | `LEGACY_PATH_PENDING` (`.env`, proxy bundler legado) + inventario de `index`/CSS global | Backend local vía proxy | — | `src/environments/environment.ts`, `environment.prod.ts`, `proxy.conf.json`, `angular.json`, `src/styles.css`, `src/index.html`, `public/`, `src/app/app.config.ts` (providers globales: HTTP, `API_BASE_URL`, flags de entorno) | TBD — tokens/tipografía globales legado → variables `--app-*` en `styles.css` hasta inventario; el fichero del mock/interceptor vive en **#6** pero su **registro** en `app.config.ts` se trata aquí como parte del bootstrap | Medio: URL/base path distinto al backend real | Alto: sin tokens globales, deriva entre pantallas | **2** | **Implementado (destino)** — mock dev opcional documentado con **#6** | `apiUrl` coherente con proxy; sin secretos en repo; `useCotizacionesMock` documentado en `design.md`; desactivar mock al usar API real. | Responsive base coherente con **#1**; sin regresiones de contraste en shell + listado. |
| **5** | feature | Rutas y módulos adicionales del SPA legado | `LEGACY_PATH_PENDING` | `LEGACY_PATH_PENDING` | TBD | **1** | *Por definir* bajo `src/app/features/…` | TBD | TBD | TBD | **3** | **No iniciado** | Cada nueva ruta legado mapeada a destino o marcada fuera de alcance en OpenSpec. | Paridad por pantalla con legado o discrepancia intencional. |
| **6** | feature | Resiliencia cuando API ausente o inestable | `LEGACY_PATH_PENDING` | `LEGACY_PATH_PENDING` (manejo errores en legado) | Mismos que fila **2** | **2**, **3**, **4** | `src/app/infrastructure/http/http-error.mapper.ts` + estados error en listado; `cotizacionesMockInterceptor` (dev, `useCotizacionesMock`) | Objetivo: no mostrar **500** ni HTML de error del servidor como contenido principal | Alto si el backend devuelve HTML o trazas | Bajo | **2–3** | **Parcialmente implementado (destino)** — mapper + mock dev; contraste con legado pendiente | Si backend cae o falta: mensaje controlado **o** datos mock en dev según bandera; sin regresión de fila **2**. | Misma severidad visual que estados error de fila **2**; sin HTML del servidor expuesto. |

### Olas ↔ filas

| Ola | Objetivo | Filas # | DoD (funcional + visual) |
|-----|----------|---------|---------------------------|
| **0** | Estructura OpenSpec, comando `/opsx:sync`, discrepancias | (metadato SDD) | Artefactos enlazados y coherentes. |
| **1** | Inventario legado, equivalencias y deltas refinados | **1–6** | Columnas legado y APIs cerradas; mapeo preliminar token/componente donde aplique. |
| **2** | Implementación destino alineada al catálogo para alcance conocido | **1–4**, **6** (mapper + mock dev opcional) | Shell, entorno, HTTP, listado usables; revisión visual **#1**, **#2**, **#4** vs legado (desktop + viewport estrecho). |
| **3** | Nuevas features del legado, cierre de paridad y merge spec | **5**, resto **6** | **#5** cubierto o fuera de alcance explícito; **#6** cerrado (mock/interceptor o backend doc.); merge a `openspec/specs/` cuando proceda. |

### Lista plana para Foreach (orden de ejecución)

**Dato:** un ítem Foreach = un **#** del catálogo; dentro de cada **#**, uno o más paths del legado (separados por `; ` cuando compartan paso). La cola en texto plano está en [migration-files-queue.md](./migration-files-queue.md).

**Orden obligatorio** (bootstrap global del SPA antes que layout de aplicación; luego dependencias del dominio cotizaciones):

1. **#4** — `index`/HTML raíz, estilos globales, variables de entorno o proxy del legado; registro de mocks/interceptors equivalentes si aplica.
2. **#1** — entry layout, router, cabecera, nav global, tema y assets del shell.
3. **#3** — cliente HTTP / hooks / servicios que alimenten cotizaciones.
4. **#2** — pantalla o ruta de listado y estilos de módulo.
5. **#6** — manejo de errores y estados «API caída» (puede compartir paths con **#2**/**#3**; listar explícitamente en inventario).
6. **#5** — por cada ruta o módulo adicional del SPA legado no cubierto arriba (añadir filas al catálogo si multiplica pantallas).

**Inferencia:** si el inventario revela que **#4** vive en los mismos ficheros que **#1**, Foreach puede consolidar paths bajo un solo **#** siempre que la otra fila quede referenciada para trazabilidad API/tema.

### Uso

Las tareas en `tasks.md` SHALL referenciar el **#** de fila de esta tabla. Los requisitos en deltas bajo `changes/migracion-react-a-angular/specs/` SHOULD citar el **#** cuando el comportamiento sea propio de esa fila. Sustituir **`LEGACY_PATH_PENDING`** por rutas relativas al repo `Designcotizacionesmodule` cuando exista clon accesible (tarea **1.2**). El **Tipo** en tabla SHALL mantener **exactamente una** fila `shell` (**#1**); el orden Foreach real es el de esta sección, no el orden numérico de la tabla.

### Referencias históricas (IDs antiguos)

Renumeración **2026-04-22:** se añadió la columna **Tipo** y se reordenó para cumplir la regla **shell primero** (entorno global pasa a **#2**; listado pasa a **#4**). Mapa breve **antes → después**: antigua **#4** (env) → **#2**; antigua **#3** (HTTP) → **#3**; antigua **#2** (lista) → **#4**; **#1**, **#5**, **#6** sin cambio de significado. Los identificadores **CAT-001…CAT-005** del primer borrador quedan **obsoletos**; usar solo **#** de esta tabla.
