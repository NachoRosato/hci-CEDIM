# Manejo de Múltiples Recetas - Documentación

## Resumen de Cambios

Se han implementado modificaciones para manejar el caso donde el servidor devuelve múltiples recetas en lugar de una sola.

## Archivos Modificados

### 1. `RecetaDigital.js`

- **Función `nextStep`**: Modificada para detectar si `data.value` es un array o un objeto
- **Lógica de recetas**: Ahora crea múltiples objetos de receta cuando se recibe un array
- **Modal condicional**: Muestra `RecetaPDF` para una receta o `RecetaPDFList` para múltiples
- **Función `updateArrRecetas`**: Corregida para usar `idRcta` en lugar de `id`

### 2. `RecetaPDFList.js` (NUEVO)

- **Componente de lista**: Muestra todas las recetas generadas en una lista
- **Identificación**: Cada receta tiene un número secuencial (#1, #2, etc.)
- **Acciones por receta**: Botones "Ver PDF" y "Anular" para cada receta individual
- **Modal anidado**: Al hacer clic en "Ver PDF" se abre el modal de `RecetaPDF` para esa receta específica

### 3. `localstyle.js`

- **Estilos agregados**: Nuevos componentes styled para `RecetaPDFList`
- **Diseño responsive**: Lista con scroll y diseño moderno
- **Hover effects**: Efectos visuales para mejor UX

## Flujo de Funcionamiento

### Caso 1: Una sola receta

1. Servidor devuelve un objeto con una receta
2. Se crea un objeto `recetaNew` con la información
3. Se muestra directamente el modal `RecetaPDF`

### Caso 2: Múltiples recetas

1. Servidor devuelve un array con múltiples recetas
2. Se crean múltiples objetos `recetaNew` con información adicional:
   - `numeroReceta`: Número secuencial (1, 2, 3...)
   - `linkPdf`: Link al PDF de cada receta
   - `medicamentos`: Array de medicamentos
   - `idRcta`: ID de la receta
   - `idexterno`: ID externo
3. Se muestra el modal `RecetaPDFList` con todas las recetas
4. Al hacer clic en "Ver PDF" se abre el modal `RecetaPDF` para esa receta específica

## Estructura de Datos

### Objeto de receta individual:

```javascript
{
  id: receta.idRcta,
  descripcion: "Medicamento: Paracetamol (Acetaminofén) - Cantidad: 20...",
  numeroReceta: 1, // Solo si hay múltiples recetas
  linkPdf: "https://...",
  medicamentos: [...],
  idRcta: "12345",
  idexterno: "67890"
}
```

## Mensajes de Usuario

- **Una receta**: "Receta generada correctamente."
- **Múltiples recetas**: "X recetas generadas correctamente."
- **Anulación**: "Receta #X anulada correctamente."

## Consideraciones Técnicas

1. **Compatibilidad**: El código es compatible con el flujo existente de una sola receta
2. **Identificación**: Se usa `idRcta` como identificador principal
3. **Estado**: Las recetas se almacenan en el estado local y en IndexDB
4. **Modal anidado**: Se puede abrir un modal dentro de otro para ver PDFs individuales
5. **Anulación**: Cada receta se puede anular individualmente

## Pruebas Recomendadas

1. Generar una sola receta (flujo existente)
2. Generar múltiples recetas (nuevo flujo)
3. Ver PDF de cada receta individual
4. Anular recetas individuales
5. Verificar que el estado se actualice correctamente
6. Probar con diferentes cantidades de recetas (2, 3, 5+)
