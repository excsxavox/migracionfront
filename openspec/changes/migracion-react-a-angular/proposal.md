# Proposal: Migración front React → Angular (destino migracionfront)

## Intent

Ejecutar la **migración del front** desde el stack **React del proyecto legado** hacia **Angular** en este repositorio destino, usando **ingeniería inversa** del legado como línea base de comportamiento y UX, no como greenfield.

## Contexto de repositorios

| Rol | URL / notas |
|-----|-------------|
| **Origen (legado, referencia)** | `https://github.com/Fer-Nexti/Designcotizacionesmodule` |
| **Destino (este repo)** | `https://github.com/excsxavox/migracionfront` |

## Equivalencias legado → destino

Estado **2026-04-22:** el remoto del legado responde *repository not found* en comprobación pública; la tabla detallada (rutas, componentes) permanece **pendiente de inventario** en `design.md`. No interpretar ausencia de filas como paridad silenciosa.

| Legado (origen) | Destino (Angular) | Estado |
|-----------------|-------------------|--------|
| *Pendiente: rutas SPA / shell React* | *Pendiente: rutas y layout Angular* | **Laguna de especificación** hasta clon del legado |
| *Pendiente: módulo cotizaciones (pantallas)* | *Pendiente: feature routes + componentes* | **Laguna de especificación** |
| APIs HTTP ya consumidas por el legado | Mismos endpoints desde servicios Angular | **Paridad** (asunción: backend existente fuera de este repo) |

## Plan vs hecho (OpenSpec)

| Artefacto | Plan | Hecho |
|-----------|------|-------|
| Dominios canónicos | `core`, `lineamientos`, `frontend-shell`, `cotizaciones-ui` | Creados bajo `openspec/specs/` |
| `/opsx:sync` | Comando Cursor con pasos 1–11 | `.cursor/commands/opsx-sync.md` |
| Reglas `.mdc` canónicas | Cinco ficheros alineados Angular | `.cursor/rules/*.mdc` |
| Discrepancias | Registrar bloqueos de baseline | `openspec/sync/discrepancies/2026-04-22-legacy-repo-unavailable.md` |
| Tabla fina legado → destino | Completar con rutas reales | **Pendiente** (acceso Git al origen) |

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
