# Tasks: migrate-react-to-angular

Checklist maestra en el repo. Marcar **[x]** cuando el ítem quede verificado en el destino.

## OpenSpec y alineación

- [x] Crear o verificar `openspec/specs/` y dominios `core`, `migration`, `frontend`
- [x] Crear cambio activo `openspec/changes/migrate-react-to-angular/` con `proposal.md`, `design.md`, `tasks.md` y deltas bajo `specs/`
- [ ] Tras inventario del legado, actualizar `design.md` (lista de bounded contexts) y, si aplica, deltas/specs canónicos sin contradicción
- [ ] Al cerrar el cambio en el flujo del equipo, fusionar deltas en `openspec/specs/**/spec.md` y archivar carpeta del cambio según convención interna

## Inventario y contrato (antes de codificar features)

- [ ] Clonar o abrir el remoto legado solo lectura: `https://github.com/Fer-Nexti/Designcotizacionesmodule`
- [ ] Documentar rutas/pantallas principales y dependencias de API desde el legado
- [ ] Cerrar decisiones abiertas en `design.md` (REST/GraphQL, auth, estado global, SSR, i18n, pruebas)
- [ ] Añadir matriz breve paridad (feature legado ↔ caso de uso / escenario) en este archivo o enlace en `design.md`

## Bootstrap Angular (destino)

- [ ] Crear proyecto Angular (versión acordada por el equipo) en el repo destino con estructura `src/` alineada a `design.md`
- [ ] Configurar `app.config.ts`, rutas raíz y lazy loading por feature/contexto
- [ ] Añadir capas vacías `domain/`, `application/`, `infrastructure/`, `presentation/features/` conforme a bounded contexts cerrados

## Implementación por contexto

- [ ] Por cada `<bounded-context>`: entidades, puertos, casos de uso, adaptadores HTTP, páginas y componentes presentacionales
- [ ] Registro DI: enlazar puertos del dominio a implementaciones de infraestructura (p. ej. `providers.ts`)
- [ ] Interceptores HTTP (auth, 401, correlación) en infraestructura

## Calidad y aceptación

- [ ] Pruebas unitarias prioritarias en dominio y aplicación (puertos mockeados)
- [ ] Pruebas e2e o manuales contra criterios de aceptación por feature migrada
- [ ] Verificar ausencia de imports prohibidos desde `domain/` hacia Angular

## Plan vs hecho

| Área | Plan | Hecho (última actualización) |
|------|------|------------------------------|
| OpenSpec bootstrap | Sí | Sí (esta rama) |
| Código Angular | Sí | No (pendiente implementación) |
