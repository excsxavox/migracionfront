# Especificaciones canónicas (`openspec/specs/`)

Este directorio es la **fuente de verdad** del comportamiento acordado del producto en el repositorio destino, según el modelo OpenSpec ([conceptos](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)).

## Dominios

| Dominio | Archivo | Alcance |
|--------|---------|---------|
| `core/` | [core/spec.md](./core/spec.md) | Alcance del proyecto destino, vínculo con el sistema legado y expectativas de paridad en la migración React → Angular. |

Los dominios pueden ampliarse (por ejemplo `frontend/`, `api/`) cuando exista código y contratos observables que documentar.
