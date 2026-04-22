# /opsx:sync — Sincronizar código, reglas Cursor y OpenSpec (as-built)

## Purpose

Mantener alineados el **comportamiento observable** documentado en `openspec/specs/`, las **reglas canónicas** en `.cursor/rules/*.mdc` y el **código** del repositorio destino, usando el proyecto **legado** (`https://github.com/Fer-Nexti/Designcotizacionesmodule`) como baseline de contraste cuando exista clon o documentación de inventario. Este comando es **autocontenido** en el clone: no depende del orquestador externo.

## Guardrails

- No sustituir la UI de producto con texto de spec; la especificación vive bajo `openspec/`.
- Los specs canónicos describen **comportamiento** (SHALL / MUST / SHOULD / MAY), no nombres de clases internas salvo que sean contrato observable estable.
- Cualquier divergencia código ↔ reglas ↔ spec se registra bajo `openspec/sync/discrepancies/` con fecha, hallazgo y acción propuesta.
- Tras sync, los deltas activos en `openspec/changes/<id>/specs/` deben seguir siendo **mergeables** con los canónicos (ADDED / MODIFIED / REMOVED explícitos).

## Dominios as-built (leer antes de codificar)

| Dominio | Ruta | Uso |
|---------|------|-----|
| Lineamientos de proyecto y sync | `openspec/specs/lineamientos/spec.md` | Convenciones, sync, paridad con legado |
| Núcleo / trazabilidad | `openspec/specs/core/spec.md` | Alcance repo, legado → destino |
| Shell y routing | `openspec/specs/frontend-shell/spec.md` | Layout, rutas, navegación observable |
| Cotizaciones (módulo UI) | `openspec/specs/cotizaciones-ui/spec.md` | Flujos de pantalla del módulo homónimo del legado |

## Cinco reglas canónicas (merge obligatorio)

Comprobar y **gap-fill** coherente con el código y con `openspec/specs/lineamientos/spec.md`:

1. `.cursor/rules/estandar.mdc`
2. `.cursor/rules/reglas-arquitectura.mdc`
3. `.cursor/rules/testing.mdc`
4. `.cursor/rules/use-custom-ui-components.mdc`
5. `.cursor/rules/use-global-color-palette.mdc`

## Pasos (1–11)

1. **Fetch baseline legado:** clonar o actualizar `Designcotizacionesmodule`; si el remoto no es accesible, registrar discrepancia `LEGACY_REPO_UNAVAILABLE` y usar inventario parcial (capturas, docs internas, último tag conocido).
2. **Inventario origen:** rutas SPA, layout, módulos de feature, llamadas HTTP desde UI, estados de carga y error **observables**.
3. **Inventario destino:** misma dimensión sobre el árbol Angular (`angular.json`, `src/app`, rutas lazy).
4. **Actualizar tabla de equivalencias** en `openspec/changes/migracion-react-a-angular/design.md` y la sección correspondiente en `proposal.md` (ruta/pantalla legado → equivalente destino; estado: paridad / cambio / fuera de alcance). Mantener `openspec/changes/migracion-react-a-angular/migration-catalog.md` alineado: columnas **Tipo** (`shell` / `feature`), **#** estables y lista plana **Foreach** (shell primero).
5. **Reconciliar** `openspec/specs/frontend-shell/spec.md` y `openspec/specs/cotizaciones-ui/spec.md` con lo hallado; marcar **lagunas de especificación** donde el comportamiento no sea aún testeable o contrastable.
6. **Leer** `openspec/specs/lineamientos/spec.md` y ajustar solo lo necesario para reflejar convenciones reales del repo.
7. **Auditar** las cinco reglas `.mdc`: eliminar contradicciones entre ellas y con el stack Angular; añadir reglas faltantes mínimas sin duplicar el spec.
8. **Discrepancias:** por cada divergencia persistente, añadir un fichero en `openspec/sync/discrepancies/` (título, contexto, spec afectado, regla afectada, severidad, propuesta).
9. **Deltas activos:** actualizar `openspec/changes/migracion-react-a-angular/specs/**` (ADDED/MODIFIED/REMOVED) para que el merge futuro en canónicos sea mecánico.
10. **`tasks.md`:** reflejar plan vs hecho con `[ ]` / `[x]`; no dejar ítems obsoletos sin marcar o rewording.
11. **Commit:** cambios en `openspec/`, `.cursor/rules/`, `.cursor/commands/` con mensaje convencional (p. ej. `docs(openspec): sync as-built`).

## Salida esperada

- Tabla legado → destino actualizada o discrepancia explícita.
- Specs canónicos y deltas sin contradicción interna.
- Carpeta `openspec/sync/discrepancies/` con registros nuevos solo si hubo hallazgos.
- Reglas `.mdc` coherentes entre sí y con Angular en este repo.
