# Proposal: Migración front React → Angular (destino migracionfront)

## Intent

Ejecutar la **migración del front** desde el stack **React del proyecto legado** hacia **Angular** en este repositorio destino, usando **ingeniería inversa** del legado como línea base de comportamiento y UX, no como greenfield.

## Contexto de repositorios

| Rol | URL / notas |
|-----|-------------|
| **Origen (legado, referencia)** | `https://github.com/Fer-Nexti/Designcotizacionesmodule` |
| **Destino (este repo)** | `https://github.com/excsxavox/migracionfront` |

## Equivalencias legado → destino

Estado **2026-04-22:** el remoto del legado responde *repository not found* (`git clone` verificado en el entorno de trabajo); la tabla detallada (rutas, componentes) permanece **pendiente de inventario** en `design.md` y en las columnas «legado» de [migration-catalog.md](./migration-catalog.md) (filas **#1–6**). No interpretar ausencia de datos legado como paridad silenciosa.

| Legado (origen) | Destino (Angular) | Catálogo # | Estado |
|-----------------|-------------------|------------|--------|
| *TBD: rutas SPA / shell React* | `MainLayoutComponent`, `app.routes.ts` | **#1** (`shell`) | **Laguna** hasta inventario; **revisión destino 2026-04-22** en `design.md` / `migration-catalog.md` (sin afirmar equivalencia legado) |
| *TBD: listado cotizaciones React* | `cotizaciones-list`, rutas lazy `/cotizaciones` | **#2** (`feature`) | **Destino con paridad fina pendiente** |
| *TBD: cliente HTTP legado* | `CotizacionesHttpAdapter`, `CotizacionesPort`, `API_BASE_URL` | **#3** (`feature`) | **Provisional** hasta cerrar path/DTO |
| *TBD: env / proxy / estilos globales legado* | `environment*.ts`, `proxy.conf.json`, `angular.json`, `src/styles.css`, `src/index.html`, `public/`, `src/app/app.config.ts` (HTTP e interceptors globales); implementación del mock en **#6** | **#4** (`feature`) | **Destino implementado**; paridad tokens vs legado pendiente inventario |
| *TBD: demás rutas SPA* | *TBD* `src/app/features/…` | **#5** (`feature`) | **No iniciado** |
| *TBD: manejo de fallos API en legado* | `http-error.mapper`, estados error en listado; mock dev `useCotizacionesMock` + interceptor (documentado con **#4** en `design.md`) | **#6** (`feature`) | **Parcial en destino** — `tasks.md` 2.5 hecho; paridad fina y baseline legado pendientes (**Ola 1**) |
| APIs HTTP ya consumidas por el legado | Mismos endpoints desde Angular | **#2–3** | **Paridad** asumida salvo brecha documentada |

## Plan vs hecho (OpenSpec)

| Artefacto | Plan | Hecho |
|-----------|------|-------|
| `migration-catalog.md` | Tabla completa: **#**, **Tipo** (`shell` \| `feature`), nombre, rutas legado, paths legado (incl. tema/estilos globales), APIs, depende de, destino, paridad diseño, riesgos API/diseño, estado, DoD funcional + visual, olas; **lista plana** Foreach (**#4** → **#1** → **#3** → **#2** → **#6** → **#5**); cola [migration-files-queue.md](./migration-files-queue.md) | [migration-catalog.md](./migration-catalog.md) — **6** filas; **#1** = única fila `shell`; columnas legado `LEGACY_PATH_PENDING` hasta inventario; discrepancia clone 404 |
| Dominios canónicos | `core`, `lineamientos`, `frontend-shell`, `cotizaciones-ui` | Creados bajo `openspec/specs/` |
| `/opsx:sync` | Comando Cursor con pasos 1–11 | `.cursor/commands/opsx-sync.md` |
| Reglas `.mdc` canónicas | Cinco ficheros alineados Angular | `.cursor/rules/*.mdc` |
| Discrepancias | Registrar bloqueos de baseline | `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md` |
| Tabla fina legado → destino | Completar con rutas reales | **Pendiente** (acceso Git al origen) |
| Catálogo: columna **Tipo** + orden **shell** primero | Regla de oro del flujo (Foreach / paridad marco) | **Hecho** — ver nota de renumeración en [migration-catalog.md](./migration-catalog.md) |

## Catálogo y olas (resumen)

- **Filas en catálogo:** 6 (**#1–#6**), descritas en [migration-catalog.md](./migration-catalog.md). **Tipo:** exactamente una fila **shell** (**#1**); **#2–#6** son **feature** (incluye infra cliente y resiliencia).
- **Foreach:** lista plana en *Lista plana para Foreach* (**#4** bootstrap global → **#1** shell app → **#3** → **#2** → **#6** → **#5**); duplicada en [migration-files-queue.md](./migration-files-queue.md); cada agente puede tomar un **#** por iteración.
- **Olas:** 0 (SDD), 1 (inventario legado + deltas), 2 (implementación destino y paridad sobre **#1–4** y **#6**), 3 (extensiones **#5** y cierre / merge a canónicos).
- **Criterios de éxito por ola:**
  - **Ola 0:** dominios canónicos, deltas, `/opsx:sync`, discrepancia de baseline si el legado no es clonable.
  - **Ola 1:** catálogo con rutas y paths del legado rellenos; equivalencias en `design.md` alineadas a **#**; deltas con escenarios contrastables.
  - **Ola 2:** destino usable para **#1–4**; **#6** sin UI de error cruda (mensaje controlado o mock según `design.md`); revisión visual **#1**, **#2**, **#4** documentada (shell, tema global, lista).
  - **Ola 3:** **#5** cubierto o explícitamente fuera de alcance; DoD del catálogo cerrado por fila; merge o archivo del cambio según flujo del equipo.

## Riesgos

- **Regresión de paridad:** sin inventario del legado, el destino puede divergir sin detección; mitigación: **Ola 1** y `/opsx:sync`.
- **Brecha API:** backend inexistente o `5xx` sin manejo → fallos visibles o HTML crudo; mitigación: fila **#6**, `tasks.md` 2.5 (ref. **#2**, **#4**, **#6**), discrepancias si el contrato difiere del legado.

## Scope

**En alcance:**

- Establecer en specs y deltas el **contrato observable** heredado del legado (rutas, flujos, estados de error, permisos visibles, etc.) en la medida inferible del código y pruebas del origen.
- Implementar en Angular la **paridad funcional** acordada, documentando cualquier desviación.
- Mantener bajo `openspec/changes/migracion-react-a-angular/` el diseño y tareas de la migración hasta su archivo o división en cambios más pequeños.

**Fuera de alcance de esta propuesta inicial (salvo decisión explícita):**

- Rediseño de producto no motivado por el legado.
- Cambios de backend no impuestos por el contrato ya consumido por el front legado.

## Approach

1. Clonar e inspeccionar el legado; completar la tabla de equivalencias en `design.md`.
2. Inicializar el workspace Angular en el destino según convenciones del equipo; mapear módulos/rutas a las del legado.
3. Iterar por dominios funcionales (p. ej. cotizaciones), verificando escenarios frente al baseline del legado.

## Estado de inventario legado

En el arranque OpenSpec de este clone, el árbol del repositorio legado **no pudo verificarse** vía API/GitHub público (respuesta 404). La tabla de equivalencias en `design.md` queda **pendiente de primera pasada** con clon local del legado y credenciales si aplica.
