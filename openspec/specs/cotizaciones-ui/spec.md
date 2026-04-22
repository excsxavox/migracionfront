# Cotizaciones UI — Módulo de cotizaciones (paridad con legado)

## Purpose

Documentar el comportamiento observable del **módulo de cotizaciones** (nombre inferido del repositorio legado `Designcotizacionesmodule`) al migrar su interfaz a Angular en el destino.

**Baseline legado:** pantallas, formularios, listados y acciones de usuario del módulo de cotizaciones en React en el repo origen (rutas y componentes exactos: **pendiente de inventario** en clon local).

**Resultado en destino:** funcionalidades equivalentes en componentes y rutas Angular, consumiendo las mismas APIs HTTP que ya consume el legado salvo que se documente un cambio de contrato fuera de este repo.

## Requirements

### Requirement: Paridad funcional del módulo

Las capacidades de usuario del módulo de cotizaciones que existan en el legado y estén en alcance SHALL comportarse de forma equivalente en el destino respecto a datos mostrados, validaciones visibles y resultados de acciones, salvo desviaciones listadas en `design.md`.

#### Scenario: Flujo principal de cotización

- GIVEN un flujo de cotización documentado en la tabla de equivalencias
- WHEN el usuario lo completa en el destino
- THEN los datos persistidos o mensajes de resultado coinciden con el legado **o** la diferencia está registrada como discrepancia intencional

### Requirement: Contratos HTTP asumidos existentes

Las llamadas HTTP desde este módulo SHALL asumirse **existentes** en backend ajeno a este flujo de migración; si el legado usa URLs, headers o códigos de error determinados, el destino SHALL conservar el mismo contrato observable (mismos códigos y mensajes expuestos al usuario salvo mejora documentada).

#### Scenario: Código de error conocido

- GIVEN un endpoint que en el legado muestra un mensaje específico ante `4xx/5xx`
- WHEN el destino invoca el mismo endpoint en el mismo caso
- THEN el usuario MUST ver el mismo mensaje esencial **o** una discrepancia MUST registrarse en `openspec/sync/discrepancies/`
