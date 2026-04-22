# Catálogo de migración — legado → destino

**Cambio:** `migracion-react-a-angular`  
**Origen (baseline):** `https://github.com/Fer-Nexti/Designcotizacionesmodule`  
**Destino:** `https://github.com/excsxavox/migracionfront`

Cada **#** es una unidad de trazabilidad (feature o pantalla coherente). Las columnas **Ruta(s) legado** y **Paths componentes legado** (incl. estilos globales, variables de tema, assets) SHALL completarse tras clon e inventario.

**Dato:** mientras el remoto del legado responda *repository not found* (`git ls-remote` / clon en este entorno), el estado refleja **laguna de baseline** en `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md`.

**Inferencia:** el destino Angular **no** declara Material ni otro design system en `package.json`; la **paridad visual** frente al legado depende de inventario de tokens y componentes React (**#1**, **#2**, **#5**).

**Resumen:** **6** filas en **4** olas (0 = SDD, 1 = inventario legado, 2 = implementación destino conocida, 3 = extensión y cierre). Hasta cerrar una ola: funcionalidad **usable** en destino cuando aplique **y** presentación alineada al **DoD visual** acordado con el legado (o decisión explícita en `design.md`).

| # | Nombre feature | Ruta(s) legado | Paths componentes legado (UI, estilos, tema, assets) | APIs / servicios tocados | Depende de | Ruta / componente destino | Paridad diseño (legado → destino) | Riesgo API | Riesgo diseño | Ola | Estado | DoD funcional | DoD visual |
|---|----------------|----------------|------------------------------------------------------|--------------------------|------------|---------------------------|-----------------------------------|------------|---------------|-----|--------|----------------|-------------|
| **1** | Shell / layout raíz SPA | TBD | TBD (layout raíz, router, nav, cabecera, assets) | N/A visible | — | `src/app/shell/layout/main-layout.component.ts`, `src/app/app.routes.ts` | TBD — objetivo «igual que legado» salvo decisión en `design.md` | Bajo | Alto si el legado usa DS distinto sin mapeo | **2** | **Destino implementado; baseline legado pendiente** | Usuario abre `/` y es redirigido a flujo cotizaciones; cabecera, skip link y nav enfocables; ruta comodín → raíz. | Layout legible desktop y viewport estrecho; jerarquía cabecera + main; foco visible; contraste copy/nav al contrastar con legado. |
| **2** | Listado de cotizaciones | TBD | TBD (pantalla lista, estilos de módulo) | `GET` cotizaciones (path exacto TBD tras inventario) | **1**, **3**, **4** | `src/app/features/cotizaciones/pages/cotizaciones-list/`, lazy `src/app/features/cotizaciones/cotizaciones.routes.ts` | TBD — densidad, tipografía y estados vs legado | Medio (vía contrato **#3**) | Medio (listas y estados) | **2** | **Destino implementado; contrato y UI finos pendientes** | Lista con carga, error con **Reintentar**, vacío sin falso error; datos mínimos (título, estado si existe). | Estados loading/error/empty claramente diferenciados; sin pantalla en blanco silenciosa; lista usable en móvil (p. ej. ≤768px vs legado). |
| **3** | Cliente HTTP cotizaciones | TBD | TBD (hooks/servicios/fetch) | `GET` `{apiUrl}/cotizaciones` (**hipótesis** hasta inventario) | **4** | `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts`, `CotizacionesPort`, `API_BASE_URL`, `src/app/app.config.ts` | N/A (no UI) | Alto: path, envoltura `{ data }`, cuerpos error HTML | Bajo | **2** | **Implementado (provisional)** | Normaliza array o `{ data: [] }`; errores mapeados a mensaje legible para la vista. | N/A |
| **4** | Entorno, proxy y estilos globales mínimos | TBD | TBD (`.env`, proxy bundler legado) + inventario de `index`/CSS global | Backend local vía proxy | — | `src/environments/environment.ts`, `environment.prod.ts`, `proxy.conf.json`, `angular.json`, `src/styles.css`, `src/index.html`, `public/` | TBD — tokens/tipografía globales legado → hoy `styles.css` casi vacío | Medio: URL/base path distinto al backend real | Alto: sin tokens globales, deriva entre pantallas | **2** | **Placeholder** (proxy + `apiUrl`) | `apiUrl` coherente con proxy; sin secretos en repo; ajuste a backend o mock documentado en `design.md`. | Responsive base coherente con **#1**; sin regresiones de contraste en shell + listado. |
| **5** | Rutas y módulos adicionales del SPA legado | TBD | TBD | TBD | **1** | *Por definir* bajo `src/app/features/…` | TBD | TBD | TBD | **3** | **No iniciado** | Cada nueva ruta legado mapeada a destino o marcada fuera de alcance en OpenSpec. | Paridad por pantalla con legado o discrepancia intencional. |
| **6** | Resiliencia cuando API ausente o inestable | TBD | TBD (manejo errores en legado) | Mismos que fila **2** | **2**, **3**, **4** | `src/app/infrastructure/http/http-error.mapper.ts` + estados error en listado; mocks/interceptor **pendientes de decisión** | Objetivo: no mostrar **500** ni HTML de error del servidor como contenido principal | Alto si el backend devuelve HTML o trazas | Bajo | **3** | **Gap documentado / parcial** | Si backend cae o falta: mensaje controlado o datos mock según estrategia acordada; sin regresión de fila **2**. | Misma severidad visual que estados error de fila **2**; sin HTML del servidor expuesto. |

### Olas ↔ filas

| Ola | Objetivo | Filas # | DoD (funcional + visual) |
|-----|----------|---------|---------------------------|
| **0** | Estructura OpenSpec, comando `/opsx:sync`, discrepancias | (metadato SDD) | Artefactos enlazados y coherentes. |
| **1** | Inventario legado, equivalencias y deltas refinados | **1–6** | Columnas legado y APIs cerradas; mapeo preliminar token/componente donde aplique. |
| **2** | Implementación destino alineada al catálogo para alcance conocido | **1–4**, parte de **6** (mensajes vía mapper) | Rutas, listado, HTTP y env usables; revisión visual **#1–2** + lista **#2** vs legado (desktop + viewport estrecho). |
| **3** | Nuevas features del legado, cierre de paridad y merge spec | **5**, resto **6** | **#5** cubierto o fuera de alcance explícito; **#6** cerrado (mock/interceptor o backend doc.); merge a `openspec/specs/` cuando proceda. |

### Uso

Las tareas en `tasks.md` SHALL referenciar el **#** de fila de esta tabla. Los requisitos en deltas bajo `changes/migracion-react-a-angular/specs/` SHOULD citar el **#** cuando el comportamiento sea propio de esa fila.

### Referencias rápidas (IDs históricos)

**CAT-001…CAT-005** (primer borrador): CAT-001 → **#1**, CAT-002 → **#2**, CAT-003 → **#3**, CAT-004 → **#4**, CAT-005 → expansiones futuras alineadas a **#5** cuando exista inventario.
