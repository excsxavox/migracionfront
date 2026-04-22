# Catálogo de migración — legado → destino

**Cambio:** `migracion-react-a-angular`  
**Origen (baseline):** `https://github.com/Fer-Nexti/Designcotizacionesmodule`  
**Destino:** `https://github.com/excsxavox/migracionfront`  

Cada fila es una unidad de trazabilidad (feature o pantalla coherente). Las columnas **Ruta(s) legado** y **Paths componentes legado** SHALL completarse tras clon e inventario; mientras el remoto responda *repository not found*, el estado refleja **laguna de baseline** documentada en `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md`.

**Resumen:** **6** filas en **4** olas (0 = SDD, 1 = inventario legado, 2 = implementación destino conocida, 3 = extensión y cierre). Hasta cerrar una ola: funcionalidad **usable** en destino cuando aplique **y** presentación alineada al **DoD visual** acordado con el legado (o decisión explícita en `design.md`).

| # | Nombre feature | Ruta(s) legado | Paths componentes legado | APIs / servicios tocados | Depende de | Ruta / componente destino | Paridad diseño | Estado | DoD funcional | DoD visual |
|---|----------------|----------------|---------------------------|---------------------------|------------|---------------------------|------------------|--------|----------------|-------------|
| 1 | Shell / layout raíz SPA | TBD (inventario legado) | TBD | N/A visible | — | `src/app/shell/layout/main-layout.component.ts`, `src/app/app.routes.ts` | TBD — objetivo «igual que legado» salvo decisión en `design.md` | **Destino implementado; baseline legado pendiente** | Usuario abre `/` y es redirigido a flujo cotizaciones; cabecera, skip link y nav enfocables; `404` → raíz. | Layout legible desktop y viewport estrecho; jerarquía cabecera + main; foco visible; contraste copy/nav al contrastar con legado. |
| 2 | Listado de cotizaciones | TBD | TBD | `GET` cotizaciones (path exacto TBD tras inventario) | 1, 3 | `src/app/features/cotizaciones/pages/cotizaciones-list/`, lazy `src/app/features/cotizaciones/cotizaciones.routes.ts` | TBD — objetivo «igual que legado» | **Destino implementado; contrato y UI finos pendientes** | Lista con carga, error con **Reintentar**, vacío sin falso error; datos mínimos (título, estado si existe). | Estados loading/error/empty claramente diferenciados; sin pantalla en blanco silenciosa; lista usable en móvil. |
| 3 | Cliente HTTP cotizaciones | TBD | TBD | `GET` `{apiUrl}/cotizaciones` (provisional) | 4 | `src/app/infrastructure/adapters/cotizaciones.http-adapter.ts`, `CotizacionesPort`, `API_BASE_URL` | N/A (no UI) | **Implementado (provisional)** | Normaliza array o `{ data: [] }`; errores mapeados a mensaje legible para la vista. | N/A |
| 4 | Entorno y proxy desarrollo | TBD | TBD | Backend local vía proxy | — | `src/environments/environment.ts`, `environment.prod.ts`, `proxy.conf.json` | N/A | **Placeholder** | `apiUrl` coherente con proxy; sin secretos en repo; ajuste a backend real documentado. | N/A |
| 5 | Rutas y módulos adicionales del SPA legado | TBD | TBD | TBD | 1 | *Por definir* bajo `src/app/features/…` | TBD | **No iniciado** | Cada nueva ruta legado mapeada a destino o marcada fuera de alcance en OpenSpec. | Paridad por pantalla con legado o discrepancia intencional. |
| 6 | Resiliencia cuando API ausente o inestable | TBD | TBD | Mismos que fila 2 | 2, 3, 4 | *Documentado en `design.md`*; mocks/interceptor **pendientes de decisión** | Objetivo: no mostrar **500 crudo** ni stack al usuario | **Gap documentado** | Si backend cae o falta: mensaje controlado o datos mock según estrategia acordada; sin regresión de fila 2. | Misma severidad visual que estados error de fila 2; sin HTML de error del servidor expuesto. |

### Olas ↔ filas

| Ola | Objetivo | Filas # |
|-----|----------|--------|
| **0** | Estructura OpenSpec, comando `/opsx:sync`, discrepancias | (metadato SDD; no fila de producto) |
| **1** | Inventario legado, equivalencias y deltas refinados | **1–6** (columnas legado y APIs cerradas) |
| **2** | Implementación destino alineada al catálogo para alcance conocido | **1–4**, parte de **6** (mensajes ya no crudos vía mapper; mocks opcional) |
| **3** | Nuevas features del legado, cierre de paridad y merge spec | **5**, resto **6**, refinamiento **1–2** |

### Uso

Las tareas en `tasks.md` SHALL referenciar el **#** de fila de esta tabla. Los requisitos en deltas bajo `changes/migracion-react-a-angular/specs/` SHOULD citar el **#** cuando el comportamiento sea propio de esa fila.
