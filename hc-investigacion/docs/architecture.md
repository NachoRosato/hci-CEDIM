# Arquitectura

- Next.js (App Router) + TypeScript
- Estilos: styled-components + utilidades Tailwind aplicadas dentro de styled-components (respetando `GlobalStyle.ts`)
- Datos: React Query + `axiosInstance` (baseURL desde `public/config.json`)
- Auth: token en `sessionStorage`; login usuario/clave y login por token encriptado

## Providers

- `app/providers.tsx`: ThemeProvider + QueryClientProvider

## Rutas

- `/login`: pública, redirección desde `/`
- `/protected/*`: layout con `AuthGuard` (permite acceso si `authOptional` está activo en config)
- `/protected/dashboard`: Navbar + Sidebar + Filtros + Buscador + Tabla (mock)
- `/protected/evolucion`: Panel izquierdo (resumen y captura rápida) + Panel derecho (formulario)

## Config runtime

- `public/config.json` con `BACKEND_URL` y `features`
- `src/utils/runtimeConfig.ts` lo carga y cachea

## Estilos

- `src/styles/GlobalStyle.ts`: variables, tipografías rb*, utilidades `c-*`y`bgc-\*`
- `tailwind.config.ts`: mapea colores (primary, secondary, latex10, latex30)

## Layouts y Componentes comunes

- `src/components/layout/Navbar.tsx`:
  - Gradiente, logo, hora en vivo, botón menú (hamburguesa)
  - Position relative (se oculta al hacer scroll)
  - Botón flotante circular que aparece al hacer scroll > 48px
  - Transiciones suaves con scale y opacity
  - Botón flotante: bottom-right, z-index 999 (debajo del Sidebar), efecto hover
- `src/components/layout/Sidebar.tsx`: despliegue desde la derecha, blur de backdrop, radius izquierdo, items con iconos y botón "Cerrar Sesión"
- `src/components/ui/Toast.tsx`: tóast reutilizable (arriba a la derecha)

## Dashboard

- `Filters.tsx`: filtros de protocolo, médico, usuario, día
- `SearchBar.tsx`: búsqueda (prioriza paciente > médico > protocolo > estado) y botón “Actualizar datos” con icono giratorio continuo
- `Table.tsx`: tabla con scroll interno, headers sticky, badges de estado, toggles de columnas y estado vacío
- `mock/data.json`: datos de ejemplo

## Evolución

- `app/protected/evolucion/page.tsx`:
  - Main dividido 50/50 sin padding: panel azul (izq) y panel blanco (der)
  - Panel izquierdo: información de paciente, NOTAS (mock), IMC y Presión con inputs y cálculo en vivo
  - Flecha circular para ocultar/mostrar el panel izquierdo (aparece arriba a la izquierda al ocultar)
  - Panel derecho: formulario multi-página con `MultiPageForm`

### Formulario Multi-Página (Evolución)

- **Página 1**: Datos del Paciente y Accesibilidad
  - Información básica: nombre, domicilio, DNI, edad, fecha de nacimiento
  - Evaluación de accesibilidad: movilidad, transporte, condiciones de vivienda

- **Página 2**: Antecedentes Patológicos Confirmados (Parte I)
  - 37 checkboxes organizados en 2 columnas
  - Campos con detalle condicional (ej: Alergia → especificar tipo)
  - Campos requeridos: HTA, Diabetes, Dislipemia, Enf. Coronaria
  - Agrupación automática de checkbox + input de texto

- **Página 3**: Antecedentes Patológicos Confirmados (Continuación)
  - 25 campos organizados en 2 columnas
  - 14 checkboxes + 11 inputs de texto directos
  - Incluye: Hiperuricemia, Hipoacusia, Obesidad, Tabaquismo, etc.
  - Campos requeridos: Obesidad, Tabaquismo
  - Campos de texto con placeholders detallados (Litiasis, Miocardiopatía, Nefropatía, etc.)

- **Página 4**: Antecedentes Adicionales - Parte I ⭐ **NUEVO**
  - 3 textareas con botón "+" flotante
  - Otros/Observaciones
  - A) Infancia
  - B) Adulto
  - Min-height: 120px para mejor visualización

- **Página 5**: Antecedentes Adicionales - Parte II ⭐ **NUEVO**
  - 3 textareas con botón "+" flotante
  - C) Operaciones
  - D) Traumas
  - Medicación Actual
  - Min-height: 120px para mejor visualización

- **Página 6**: Antecedentes Familiares y Socio-económicos
  - 3 textareas con botón "+" flotante
  - Antecedentes Familiares
  - Antecedentes Socio-económicos
  - Comentarios
  - Min-height: 120px para mejor visualización

- **Página 7**: Signos Vitales y Evaluación Clínica
  - Altura, peso, rango de edad, IMC calculado
  - TA sistólica, diastólica y media (calculada)
  - Estado general y tolerancia al tratamiento

- **Página 8**: Criterios y Seguimiento
  - Criterios de evaluación ANT-010 RED
  - Plan de seguimiento y modificaciones al tratamiento

## Configuración Runtime y Módulos

- `public/config.json`: `REACT_APP_BACKEND_URL`, `features` (ej. `authOptional`, `search`), `mockUser`
- `src/utils/runtimeConfig.ts`: carga y caché de config
- `src/config/modules.ts`: helper para toggles de módulos
