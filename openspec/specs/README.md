# OpenSpec — partición de dominios (este repositorio)

Este repo es el **destino** de la migración del front: la verdad de comportamiento observable vive aquí bajo `openspec/specs/<dominio>/spec.md`.

## Dominios canónicos

| Dominio | Qué cubre | Leer antes de… |
|--------|-------------|----------------|
| [`core`](./core/spec.md) | Propósito del producto, política de repositorios (origen vs destino), restricciones globales. | Cualquier implementación o decisión de alcance. |
| [`migration`](./migration/spec.md) | Alcance de la migración React → Angular, referencia al legado, paridad y riesgos observables. | Planificar features, pruebas de regresión o inventario desde el remoto legado. |
| [`frontend`](./frontend/spec.md) | Contrato de arquitectura del cliente Angular (capas hexagonales, dependencias permitidas). | Codificar UI, rutas, casos de uso, adaptadores HTTP o DI. |

## Cambios activos

Las propuestas y deltas hasta integrarse en estos specs viven en `openspec/changes/<id>/`. Tras completar un cambio, fusionar manualmente los deltas en los `spec.md` canónicos y archivar la carpeta del cambio según convención del equipo.

## Convención de deltas

Los archivos bajo `openspec/changes/<id>/specs/<dominio>/spec.md` usan secciones **ADDED**, **MODIFIED** y **REMOVED** respecto al spec canónico del mismo dominio.
