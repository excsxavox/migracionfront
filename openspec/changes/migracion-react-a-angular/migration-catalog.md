# Catálogo de migración — legado → destino

**Cambio:** `migracion-react-a-angular`  
**Origen (baseline):** `https://github.com/Fer-Nexti/Designcotizacionesmodule`  
**Destino:** `https://github.com/excsxavox/migracionfront`

Cada **#** es una unidad de trazabilidad (feature o pantalla coherente). Las columnas **Ruta(s) legado** y **Paths componentes legado** (incl. estilos globales, variables de tema, assets) SHALL completarse tras clon e inventario.

**Dato:** mientras el remoto del legado responda *repository not found* (`git ls-remote` / clon en este entorno), el estado refleja **laguna de baseline** en `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md`.

**Inferencia:** el destino Angular **no** declara Material ni otro design system en `package.json`; la **paridad visual** frente al legado depende de inventario de tokens y componentes React (**#1**, **#2**, **#5**).

**Resumen:** **6** filas en **4** olas (0 = SDD, 1 = inventario legado, 2 = implementación destino conocida, 3 = extensión y cierre). La columna **Tipo** SHALL ser `shell` solo para el marco global SPA (**#1**); el resto SHALL ser `feature` (incluye infra de cliente **#3–#4**, resiliencia **#6** y extensiones **#5**). Hasta cerrar una ola: funcionalidad **usable** en destino cuando aplique **y** presentación alineada al **DoD visual** acordado con el legado (o decisión explícita en `design.md`).

| # | Tipo | Nombre | Ruta(s) legado | Paths componentes legado (UI, estilos, tema, assets) | APIs / servicios tocados | Depende de | Ruta / componente destino | Paridad diseño (legado → destino) | Riesgo API | Riesgo diseño | Ola | Estado | DoD funcional | DoD visual |
|---|------|--------|----------------|------------------------------------------------------|--------------------------|------------|---------------------------|-----------------------------------|------------|---------------|-----|--------|----------------|-------------|
| **1** | **shell** | Shell / layout raíz SPA | TBD | TBD (layout raíz, router, top bar, sidebar si aplica, nav, cabecera, tema, assets) | N/A visible | — | `src/app/shell/layout/main-layout.component.ts`, `src/app/app.routes.ts` | TBD — objetivo «igual que legado» salvo decisión en `design.md` | Bajo | Alto si el legado usa DS distinto sin mapeo | **2** | **Destino implementado; baseline legado pendiente** | Usuario abre `/` y es redirigido a flujo cotizaciones; cabecera, skip link y nav enfocables; ruta comodín → raíz. | Layout legible desktop y viewport estrecho; jerarquía cabecera + main; foco visible; contraste copy/nav al contrastar con legado. |
| **2** | feature | Listado de cotizaciones | TBD | TBD (pantalla lista, estilos de módulo) | `GET` cotizaciones (path exacto TBD tras inventario) | **1**, **3**, **4** | `src/app/features/cotizaciones/pages/cotizaciones-list/`, lazy `src/app/features/cotizaciones/cotizaciones.routes.ts` | TBD — densidad, tipografía y estados vs legado | Medio (vía contrato **#3**) | Medio (listas y estados) | **2** | **Destino implementado; contrato y UI finos pendientes** | Lista con carga, error con **Reintentar**, vacío sin falso error; datos mínimos (título, estado si existe). | Estados loading/error/empty claramente diferenciados; sin pantalla en blanco silenciosa; lista usable en móvil (p. ej. ≤768px vs legado). |
| **3** | feature | Cliente HTTP cotizaciones | TBD | TBD (hooks/servicios/fetch) | `GET` `{apiUrl}/cotizaciones` (**hipótesis** hasta inventario) | **4** | `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts`, `CotizacionesPort`, `API_BASE_URL`, `src/app/app.config.ts` | N/A (no UI) | Alto: path, envoltura `{ data }`, cuerpos error HTML | Bajo | **2** | **Implementado (provisional)** | Normaliza array o `{ data: [] }`; errores mapeados a mensaje legible para la vista. | N/A |
| **4** | feature | Entorno, proxy y estilos globales mínimos | TBD | TBD (`.env`, proxy bundler legado) + inventario de `index`/CSS global | Backend local vía proxy | — | `src/environments/environment.ts`, `environment.prod.ts`, `proxy.conf.json`, `cotizaciones-mock.interceptor.ts`, `angular.json`, `src/styles.css`, `src/index.html`, `public/` | TBD — tokens/tipografía globales legado → hoy `styles.css` casi vacío | Medio: URL/base path distinto al backend real | Alto: sin tokens globales, deriva entre pantallas | **2** | **Implementado (destino)** — mock dev opcional | `apiUrl` coherente con proxy; sin secretos en repo; `useCotizacionesMock` documentado en `design.md`; desactivar mock al usar API real. | Responsive base coherente con **#1**; sin regresiones de contraste en shell + listado. |
| **5** | feature | Rutas y módulos adicionales del SPA legado | TBD | TBD | TBD | **1** | *Por definir* bajo `src/app/features/…` | TBD | TBD | TBD | **3** | **No iniciado** | Cada nueva ruta legado mapeada a destino o marcada fuera de alcance en OpenSpec. | Paridad por pantalla con legado o discrepancia intencional. |
| **6** | feature | Resiliencia cuando API ausente o inestable | TBD | TBD (manejo errores en legado) | Mismos que fila **2** | **2**, **3**, **4** | `src/app/infrastructure/http/http-error.mapper.ts` + estados error en listado; `cotizacionesMockInterceptor` (dev, `useCotizacionesMock`) | Objetivo: no mostrar **500** ni HTML de error del servidor como contenido principal | Alto si el backend devuelve HTML o trazas | Bajo | **2–3** | **Parcialmente implementado (destino)** — mapper + mock dev; contraste con legado pendiente | Si backend cae o falta: mensaje controlado **o** datos mock en dev según bandera; sin regresión de fila **2**. | Misma severidad visual que estados error de fila **2**; sin HTML del servidor expuesto. |

### Olas ↔ filas

| Ola | Objetivo | Filas # | DoD (funcional + visual) |
|-----|----------|---------|---------------------------|
| **0** | Estructura OpenSpec, comando `/opsx:sync`, discrepancias | (metadato SDD) | Artefactos enlazados y coherentes. |
| **1** | Inventario legado, equivalencias y deltas refinados | **1–6** | Columnas legado y APIs cerradas; mapeo preliminar token/componente donde aplique. |
| **2** | Implementación destino alineada al catálogo para alcance conocido | **1–4**, **6** (mapper + mock dev opcional) | Rutas, listado, HTTP y env usables; revisión visual **#1–2** + lista **#2** vs legado (desktop + viewport estrecho). |
| **3** | Nuevas features del legado, cierre de paridad y merge spec | **5**, resto **6** | **#5** cubierto o fuera de alcance explícito; **#6** cerrado (mock/interceptor o backend doc.); merge a `openspec/specs/` cuando proceda. |

### Lista plana para Foreach (paths legado)

Orden **obligatorio** para el paso analista **Foreach** (un ítem = un **#**; dentro de cada #, uno o más paths del legado): **shell primero**, luego **features** en orden de dependencia del catálogo.

Hasta completar **Ola 1**, los paths concretos son **TBD**; SHALL sustituirse por rutas de archivo reales relativas al repo legado (una línea por path principal, sin duplicar el **#**).

1. **[#1] [shell]** — *TBD:* entry layout / router / cabecera / nav global / tema y CSS global del SPA legado.
2. **[#4] [feature]** — *TBD:* `index`/HTML raíz, estilos globales, variables de entorno o proxy del legado (desbloquea contrato HTTP y tokens base para **#1**).
3. **[#3] [feature]** — *TBD:* cliente HTTP / hooks / servicios que alimenten cotizaciones.
4. **[#2] [feature]** — *TBD:* pantalla o ruta de listado de cotizaciones y estilos de módulo.
5. **[#6] [feature]** — *TBD:* manejo de errores y estados «API caída» en el legado (puede compartir paths con **#2**/**#3**; listar explícitamente).
6. **[#5] [feature]** — *TBD:* por cada ruta o módulo adicional del SPA legado no cubierto por **#1–#4** (añadir filas al catálogo si multiplica pantallas).

**Nota:** Si el inventario revela que **#4** (global/env) vive en los mismos ficheros que **#1**, Foreach puede ejecutar un solo bloque de paths bajo **#1** siempre que la columna **Paths legado** de **#4** quede referenciada o duplicada explícitamente para trazabilidad API/tema.

### Uso

Las tareas en `tasks.md` SHALL referenciar el **#** de fila de esta tabla. Los requisitos en deltas bajo `changes/migracion-react-a-angular/specs/` SHOULD citar el **#** cuando el comportamiento sea propio de esa fila. El **Tipo** (`shell` \| `feature`) SHALL usarse para validar que la primera fila migrable del producto real es el marco global (**#1**), no una pantalla aislada.

### Referencias rápidas (IDs históricos)

**CAT-001…CAT-005** (primer borrador): CAT-001 → **#1**, CAT-002 → **#2**, CAT-003 → **#3**, CAT-004 → **#4**, CAT-005 → expansiones futuras alineadas a **#5** cuando exista inventario.
