# Proposal: migrate-react-to-angular

## Intención

Reimplementar en **Angular** el cliente que hoy existe en el repositorio **React legado**, concentrando commits y evolución en el **repositorio destino** (`migracionfront`). El legado permanece como **referencia de lectura** para pantallas, rutas y comportamiento observable.

## Alcance

- **Incluido:** especificación de comportamiento observable y de arquitectura del cliente (hexagonal), estructura de carpetas bajo `src/`, criterios de paridad con el legado dentro del alcance migrado, riesgos y decisiones abiertas documentadas para cierre explícito.
- **Excluido (este cambio OpenSpec):** implementación de código Angular, configuración de CI, ni modificación del repositorio legado.

## Enfoque

- Un solo modelo OpenSpec en el repo (`openspec/specs/<dominio>/` y `openspec/changes/<id>/`).
- Dominios canónicos mínimos y no redundantes: `core`, `migration`, `frontend`.
- Comportamiento observable en Markdown; detalle técnico de capas y árbol en `design.md`.
- `tasks.md` como lista maestra con checkboxes para quien implemente después.

## Plan vs hecho (esta iteración)

| Plan | Estado |
|------|--------|
| Bootstrap `openspec/specs/` y dominios canónicos | Hecho |
| Cambio activo con `proposal`, `design`, `tasks`, deltas | Hecho |
| Lista de bounded contexts cerrada desde el legado | Pendiente (laguna; ver `design.md`) |
| Implementación Angular en `src/` | Pendiente (fuera de rol OpenSpec en esta entrega) |

## Referencias

- OpenSpec (conceptos): [Fission-AI/OpenSpec — concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
