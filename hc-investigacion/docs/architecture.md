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

- `src/components/layout/Navbar.tsx`: gradiente, logo, hora en vivo, botón menú (hamburguesa)
- `src/components/layout/Sidebar.tsx`: despliegue desde la derecha, blur de backdrop, radius izquierdo, items con iconos y botón “Cerrar Sesión”
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

## Configuración Runtime y Módulos

- `public/config.json`: `REACT_APP_BACKEND_URL`, `features` (ej. `authOptional`, `search`), `mockUser`
- `src/utils/runtimeConfig.ts`: carga y caché de config
- `src/config/modules.ts`: helper para toggles de módulos
