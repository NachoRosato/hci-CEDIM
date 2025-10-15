# Flujo de Dashboard

## Navbar y Sidebar

- Navbar con gradiente, logo a la izquierda, hora y botón menú a la derecha.
- Menú abre Sidebar desde la derecha con blur; items con iconos; botón “Cerrar Sesión”.

## Filtros y Búsqueda

- `Filters`: protocolo, médico, usuario, día (controlados en estado local de la página).
- `SearchBar`: input largo con focus azul `latex30` y botón “Actualizar datos” con icono giratorio continuo.
- Lógica de búsqueda: paciente > médico > protocolo > estado.

## Tabla

- Scroll sólo para el cuerpo de la tabla, header sticky.
- Columnas: Protocolo, Paciente, Médico, Usuario, Hora, Día, Estado.
- Toggles de columnas como “botoncitos”; al desmarcar desaparece header y celdas.
- Estado vacío: ícono “i” dentro de círculo oscuro + leyenda “Sin datos para mostrar en su búsqueda”.

## Datos

- Datos mock en `src/features/dashboard/mock/data.json`.
- Adaptar a API real reemplazando las lecturas del mock por queries con React Query.
