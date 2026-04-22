# Design: migrate-react-to-angular

## Contexto

El workspace destino arranca casi vacío: la base Angular se creará en commits posteriores. Este documento fija **decisiones de arquitectura** y convenciones para que el nodo de implementación no reinterprete la estructura.

## Límites hexagonales

| Capa | Rol | Depende de |
|------|-----|------------|
| **Dominio** | Reglas de negocio, invariantes, entidades ligeras, **puertos** (interfaces). Sin Angular, sin `HttpClient`, sin DOM directo. | Nada externo al dominio |
| **Aplicación** | Casos de uso (orquestación), DTOs de entrada/salida del caso de uso. | Dominio (puertos como tipos) |
| **Infraestructura** | Adaptadores de salida: HTTP, storage local, logging, etc. | Dominio (interfaces), librerías técnicas |
| **Presentación (Angular)** | Adaptadores de entrada: componentes, rutas, formularios. Invocan casos de uso o fachadas delgadas. | Aplicación |

## Árbol de carpetas (convención `src/`)

Angular CLI mantiene `src/app/` como bootstrap; el núcleo hexagonal vive **al mismo nivel** que `app/` para no mezclar framework con reglas puras.

```text
src/
├── app/
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.component.ts|html|scss
│   └── layout/                    # opcional
├── domain/
│   └── <bounded-context>/
│       ├── entities/
│       ├── value-objects/         # opcional
│       ├── errors/
│       └── ports/
├── application/
│   └── <bounded-context>/
│       ├── use-cases/
│       ├── dtos/
│       └── mappers/               # opcional
├── infrastructure/
│   ├── http/
│   │   ├── api-mappers/
│   │   ├── <bounded-context>-http.adapter.ts
│   │   └── interceptors/
│   ├── persistence/
│   ├── logging/
│   └── providers.ts             # opcional: bind puerto → adaptador
├── presentation/
│   └── features/
│       └── <bounded-context>/
│           ├── pages/
│           ├── components/
│           ├── routes.ts
│           └── feature.providers.ts   # opcional
├── shared/
│   ├── ui/
│   ├── pipes/
│   └── validators/
└── environments/
```

### Reglas operativas

- **`domain/`:** solo TypeScript puro; **prohibido** importar `@angular/*`.
- **`application/`:** sin URLs ni headers; resultados y errores abstractos del dominio.
- **`infrastructure/`:** único lugar autorizado para `HttpClient`, URLs, serialización, retries.
- **`presentation/features/`:** bindings y navegación; delegación a use cases inyectados.
- **`shared/`:** reutilización horizontal; lo específico de un contexto va al feature correspondiente.

## Trade-offs (resumen)

1. **Capas explícitas** frente a “solo features Angular”: elegidas capas `domain` / `application` / `infrastructure` para evitar replicar acoplamiento tipo “todo en el componente” y facilitar cambio de transporte.
2. **Casos de uso inyectables** frente a smart components pesados: elegida orquestación en aplicación.
3. **Puertos en dominio** frente a puertos solo en aplicación: elegidas interfaces de repositorio/gateway en dominio, implementaciones en infraestructura.

## Bounded contexts (inventario)

**Laguna hasta cerrar:** los nombres concretos de `<bounded-context>` **SHALL** listarse aquí tras el barrido del remoto legado (`Designcotizacionesmodule`). Hasta entonces, usar un único contexto provisional `app` solo si es inevitable, y sustituir por nombres de negocio en cuanto exista inventario.

## Decisiones abiertas (cerrar explícitamente antes o durante implementación)

1. Lista y nombres finales de `<bounded-context>` desde el mapa de módulos React.
2. Contrato backend: REST vs GraphQL; versión; OpenAPI y generación de tipos (solo infraestructura o carpeta generada, sin contaminar dominio).
3. Autenticación: Bearer en memoria vs cookie `httpOnly`; refresh e interceptores.
4. Estado global: Signals + servicios vs NgRx u otro; sin usar estado de UI como fuente de verdad de invariantes de dominio frente al servidor.
5. SSR/SSG (Angular Universal): necesidad SEO; adaptadores browser-only.
6. i18n: `@angular/localize` vs `ngx-translate`; mapeo mensajes dominio vs UI.
7. Equivalencia de rutas con React Router; lazy loading por feature/contexto.
8. Pirámide de pruebas: unit dominio/aplicación vs e2e; mocking de puertos.

## Riesgos

- Crecimiento monolítico en `domain/` sin contextos claros.
- Paridad funcional no documentada (validaciones solo cliente en legado).
- Seguridad: tokens, PII en logs, errores de red mostrados sin sanitizar.
- Drift entre dos remotos si alguien corrige solo el legado: regla **origen = lectura**, **destino = commits**.
