# Flujo de Evolución

## Layout

- Main 50/50 sin padding entre columnas.
- Panel izquierdo (azul): resumen y captura rápida.
- Panel derecho (blanco): formulario detallado.
- Botón circular con flecha para ocultar/mostrar el panel izquierdo:
  - Visible en el borde del panel azul; al ocultar, aparece arriba-izquierda en el panel blanco.

## Panel izquierdo (4 secciones optimizadas)

### Sección 1: Datos del Paciente
- Grid 3 columnas responsive (colapsa a 2 en pantallas medianas).
- Campos mock de solo lectura: Nombre, Edad, F. Nac, DNI, Tel, Dirección, HCD, HCP.
- Tipografía compacta: rb10b para labels, rb10l para valores.
- Ocupa 100vh sin scroll vertical.

### Sección 2: NOTAS
- Chips compactos con tipografía rb10b.
- Mock items: Estado AUSENTE (rojo), Eventos Adversos (rojo), Dosis Normal (verde).

### Sección 3: IMC y Presión (2 columnas)
- **IMC (izquierda):**
  - Inputs: Altura (cm) y Peso (kg).
  - Selector de rango edad: botones horizontales estilo tabs (< 18, 18-25, 25-30, 30-35, 35-40, 40+).
  - Resultado IMC calculado en vivo con rb16b en color primary.
- **Presión (derecha):**
  - Inputs: TA sistólica y TA diastólica.
  - TA media calculada en vivo: (sistólica + 2*diastólica) / 3.
  - Resultado con rb16b en color primary.

### Sección 4: Criterios ANT-010 RED
- Items verticales compactos con rb10b.
- Mock 5 items: 3 verdes (#A4DF71), 2 rojos (#FB5555).
- Textos cortos para optimizar espacio vertical.

## Panel derecho

- Placeholder para futuras integraciones de formularios.
- Mantiene estructura para desarrollo modular.

## Tipografías añadidas

- rb10l, rb10b, rb9b, rb8l (para diseño compacto sin sacrificar legibilidad).

## Próximos pasos

- Conectar datos de paciente a endpoints reales (mock actualmente).
- Agregar clasificación visual del IMC por rango y color.
- Integrar formularios multi-página en panel derecho.
- Conectar NOTAS y Criterios a API real.
