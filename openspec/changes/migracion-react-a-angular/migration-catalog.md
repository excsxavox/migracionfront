# Catálogo de migración — legado → destino

**Cambio:** `migracion-react-a-angular`  
**Origen (baseline):** `https://github.com/Fer-Nexti/Designcotizacionesmodule`  
**Destino:** `https://github.com/excsxavox/migracionfront`

Cada **#** es una unidad de trazabilidad (bloque migrable). La columna **Tipo** (`shell` vs `feature`) alinea el orden de trabajo con la cola **Foreach** (shell y globales primero; luego pantallas y servicios de feature). Las columnas **Ruta(s) legado** y **Paths legado** SHALL completarse tras clon e inventario.

**Regla de oro:** las primeras filas del catálogo (**#1**, **#2**, … en orden) con **Tipo = `shell`** cubren el **marco global** del legado (layout raíz, router-outlet, cabecera/marca, navegación principal, tokens/tema/responsive base, proxy/env). Sin ellas, paridad «producto real» vs una pantalla suelta no es contrastable.

**Dato:** mientras el remoto del legado responda *repository not found* (`git ls-remote` / clon en este entorno), el estado refleja **laguna de baseline** en `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md`. **Dato (verificación en este clone, 2026-04-22):** `git ls-remote https://github.com/Fer-Nexti/Designcotizacionesmodule.git` → *repository not found*; no hay árbol legado local en el workspace.

**Hipótesis:** al desbloquear el acceso, las rutas React reales sustituirán los marcadores `BLOQUEADO: …` sin reinterpretar convenciones OpenSpec del repo.

**Inferencia:** el destino Angular **no** declara Material ni otro design system en `package.json`; la **paridad visual** frente al legado depende de inventario de tokens y componentes React (**#1**, **#2**, **#4**, **#5**).

**Resumen:** **6** filas en **4** olas (0 = SDD, 1 = inventario legado, 2 = implementación destino conocida, 3 = extensión y cierre). Hasta cerrar una ola: funcionalidad **usable** en destino cuando aplique **y** presentación alineada al **DoD visual** acordado con el legado (o decisión explícita en `design.md`).

| # | Tipo | Nombre | Ruta(s) legado | Paths legado (UI, estilos, tema, assets) | APIs / servicios tocados | Depende de (#) | Destino previsto | Paridad diseño (legado → destino) | Riesgo API | Riesgo diseño | Ola | Estado | DoD funcional | DoD visual |
|---|------|--------|----------------|------------------------------------------|--------------------------|----------------|------------------|-----------------------------------|------------|---------------|-----|--------|----------------|-------------|
| **1** | `shell` | Shell / layout raíz SPA | `BLOQUEADO: LEGACY_REPO_UNAVAILABLE` — sustituir en Ola 1 | `BLOQUEADO` — layout raíz, router, nav, cabecera, assets (tras inventario) | N/A visible | — | `src/app/shell/layout/main-layout.component.ts`, `src/app/app.routes.ts` | TBD — objetivo «igual que legado» salvo decisión en `design.md` | Bajo | Alto si el legado usa DS distinto sin mapeo | **2** | **Destino implementado; baseline legado pendiente** | Usuario abre `/` y es redirigido a flujo cotizaciones; cabecera, skip link y nav enfocables; ruta comodín → raíz. | Layout legible desktop y viewport estrecho; jerarquía cabecera + main; foco visible; contraste copy/nav al contrastar con legado. |
| **2** | `shell` | Entorno, proxy y estilos globales | `BLOQUEADO: LEGACY_REPO_UNAVAILABLE` | `BLOQUEADO` — `.env`, proxy bundler legado, `index`/CSS global (tras inventario) | Backend local vía proxy | — | `src/environments/environment.ts`, `environment.prod.ts`, `proxy.conf.json`, `cotizaciones-mock.interceptor.ts`, `angular.json`, `src/styles.css`, `src/index.html`, `public/` | TBD — tokens/tipografía globales legado → hoy `styles.css` casi vacío | Medio: URL/base path distinto al backend real | Alto: sin tokens globales, deriva entre pantallas | **2** | **Implementado (destino)** — mock dev opcional | `apiUrl` coherente con proxy; sin secretos en repo; `useCotizacionesMock` documentado en `design.md`; desactivar mock al usar API real. | Responsive base coherente con **#1**; sin regresiones de contraste en shell + listado. |
| **3** | `feature` | Cliente HTTP cotizaciones | `BLOQUEADO: LEGACY_REPO_UNAVAILABLE` | `BLOQUEADO` — hooks/servicios/fetch (tras inventario) | `GET` `{apiUrl}/cotizaciones` (**hipótesis** hasta inventario) | **2** | `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts`, `CotizacionesPort`, `API_BASE_URL`, `src/app/app.config.ts` | N/A (no UI) | Alto: path, envoltura `{ data }`, cuerpos error HTML | Bajo | **2** | **Implementado (provisional)** | Normaliza array o `{ data: [] }`; errores mapeados a mensaje legible para la vista. | N/A |
| **4** | `feature` | Listado de cotizaciones | `BLOQUEADO: LEGACY_REPO_UNAVAILABLE` | `BLOQUEADO` — pantalla lista, estilos de módulo (tras inventario) | `GET` cotizaciones (path exacto TBD tras inventario) | **1**, **2**, **3** | `src/app/features/cotizaciones/pages/cotizaciones-list/`, lazy `src/app/features/cotizaciones/cotizaciones.routes.ts` | TBD — densidad, tipografía y estados vs legado | Medio (vía contrato **#3**) | Medio (listas y estados) | **2** | **Destino implementado; contrato y UI finos pendientes** | Lista con carga, error con **Reintentar**, vacío sin falso error; datos mínimos (título, estado si existe). | Estados loading/error/empty claramente diferenciados; sin pantalla en blanco silenciosa; lista usable en móvil (p. ej. ≤768px vs legado). |
| **5** | `feature` | Rutas y módulos adicionales del SPA legado | `BLOQUEADO: LEGACY_REPO_UNAVAILABLE` | `BLOQUEADO` — rutas/pantallas fuera del alcance actual (tras inventario) | TBD | **1** | *Por definir* bajo `src/app/features/…` | TBD | TBD | TBD | **3** | **No iniciado** | Cada nueva ruta legado mapeada a destino o marcada fuera de alcance en OpenSpec. | Paridad por pantalla con legado o discrepancia intencional. |
| **6** | `feature` | Resiliencia cuando API ausente o inestable | `BLOQUEADO: LEGACY_REPO_UNAVAILABLE` | `BLOQUEADO` — manejo errores en legado (tras inventario) | Mismos que fila **#4** | **2**, **3**, **4** | `src/app/infrastructure/http/http-error.mapper.ts` + estados error en listado; `cotizacionesMockInterceptor` (dev, `useCotizacionesMock`) | Objetivo: no mostrar **500** ni HTML de error del servidor como contenido principal | Alto si el backend devuelve HTML o trazas | Bajo | **2–3** | **Parcialmente implementado (destino)** — mapper + mock dev; contraste con legado pendiente | Si backend cae o falta: mensaje controlado **o** datos mock en dev según bandera; sin regresión de fila **#4**. | Misma severidad visual que estados error de fila **#4**; sin HTML del servidor expuesto. |

### Olas ↔ filas

| Ola | Objetivo | Filas # | DoD (funcional + visual) |
|-----|----------|---------|---------------------------|
| **0** | Estructura OpenSpec, comando `/opsx:sync`, discrepancias | (metadato SDD) | Artefactos enlazados y coherentes. |
| **1** | Inventario legado, equivalencias y deltas refinados | **1–6** | Columnas legado y APIs cerradas; mapeo preliminar token/componente donde aplique. |
| **2** | Implementación destino alineada al catálogo para alcance conocido | **1–4**, **6** (mapper + mock dev opcional) | Shell, entorno, HTTP, listado usables; revisión visual **#1**, **#2**, **#4** vs legado (desktop + viewport estrecho). |
| **3** | Nuevas features del legado, cierre de paridad y merge spec | **5**, resto **6** | **#5** cubierto o fuera de alcance explícito; **#6** cerrado (mock/interceptor o backend doc.); merge a `openspec/specs/` cuando proceda. |

### Lista plana Foreach (orden de barrido legado)

Orden para inventario y para agentes **Foreach** sobre paths del **legado**: misma numeración que el catálogo (**shell** primero, luego **feature**). Sustituir `BLOQUEADO` / `TBD` tras Ola 1.

1. **#1** — paths layout / router / nav / cabecera / shell.  
2. **#2** — paths `.env`, proxy, `index`, CSS global, tema.  
3. **#3** — paths cliente HTTP / servicios cotizaciones.  
4. **#4** — paths pantalla lista cotizaciones.  
5. **#5** — paths demás rutas/features SPA.  
6. **#6** — paths manejo de errores / toasts / boundaries asociados a API.

### Uso

Las tareas en `tasks.md` SHALL referenciar el **#** de fila de esta tabla. Los requisitos en deltas bajo `changes/migracion-react-a-angular/specs/` SHOULD citar el **#** cuando el comportamiento sea propio de esa fila.

### Referencias históricas (IDs antiguos)

Renumeración **2026-04-22:** se añadió la columna **Tipo** y se reordenó para cumplir la regla **shell primero** (entorno global pasa a **#2**; listado pasa a **#4**). Mapa breve **antes → después**: antigua **#4** (env) → **#2**; antigua **#3** (HTTP) → **#3**; antigua **#2** (lista) → **#4**; **#1**, **#5**, **#6** sin cambio de significado. Los identificadores **CAT-001…CAT-005** del primer borrador quedan **obsoletos**; usar solo **#** de esta tabla.
