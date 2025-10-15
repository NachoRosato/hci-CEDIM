# Flujo de Evolución

## Layout

- Main 50/50 sin padding entre columnas.
- Panel izquierdo (azul): resumen y captura rápida.
- Panel derecho (blanco): formulario detallado.
- Botón circular con flecha para ocultar/mostrar el panel izquierdo:
  - Visible en el borde del panel azul; al ocultar, aparece arriba-izquierda en el panel blanco.

## Panel izquierdo

- Información de paciente (nombre, edad/DNI, tel/dirección, HCD/HCP).
- NOTAS: badges de ejemplo (mock) a reemplazar por endpoint real.
- IMC: inputs Altura (cm), Peso (kg) y Rango de edad; cálculo en vivo del IMC.
- Presión: inputs TA sistólica/diastólica; cálculo de TA media en vivo.

## Panel derecho

- Campos de datos: Apellidos y Nombres, Domicilio, DNI, Edad, Fecha de nacimiento, Profesión/Tarea, Accesibilidad (placeholders).
- Botonera inferior (Cancelar, Preview, Preview) placeholder.

## Próximos pasos

- Conectar datos de paciente y notas a endpoints reales.
- Agregar clasificación del IMC (bajo/normal/sobrepeso/obesidad) por rango y color.
- Paginar formularios en pasos (varias páginas) manteniendo el estado.
