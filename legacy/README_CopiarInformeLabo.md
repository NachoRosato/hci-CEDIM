# Nueva Funcionalidad: CopiarInformeLabo

## Descripción

Se ha implementado una nueva función `CopiarInformeLabo` que permite copiar informes de laboratorio al editor React-Quill manteniendo el formato HTML completo, a diferencia de la función `copiarInforme` existente que solo copia texto plano.

## Características Principales

### 1. Preservación del Formato HTML

- Mantiene etiquetas HTML como `<strong>`, `<em>`, `<u>`, `<br>`, `<p>`, `<div>`
- Preserva estilos inline importantes (font-family, font-size, color, text-align, margin, padding)
- Elimina estilos problemáticos que pueden causar conflictos en Quill (display, position, float)

### 2. Procesamiento Inteligente del HTML

- Elimina elementos innecesarios del `<head>` (meta, title, style)
- Extrae solo el contenido del `<body>` o el contenido principal
- Limpia clases CSS que pueden no estar disponibles en Quill
- Mantiene la estructura jerárquica del documento

### 3. Integración con React-Quill

- Utiliza `clipboard.dangerouslyPasteHTML()` para insertar HTML completo
- Detecta automáticamente si el contenido es HTML o texto plano
- Fallback a inserción de texto plano si hay errores en el HTML

## Implementación Técnica

### Archivos Modificados

1. **`AdicionarInformeCmp.js`**

   - Nueva función `copiarInformeLabo()`
   - Nueva función `processHTMLForQuill()`
   - Nuevo botón "Copiar Informe Labo" en la interfaz

2. **`QuillEstudios.js`**
   - Modificación del `useEffect` que maneja `txtInfSelected`
   - Detección automática de contenido HTML
   - Uso de `dangerouslyPasteHTML` para HTML y `insertText` para texto plano

### Funciones Principales

#### `copiarInformeLabo()`

```javascript
const copiarInformeLabo = () => {
  // Obtiene el contenido HTML del informe
  // Procesa el HTML para optimizarlo para Quill
  // Establece el contenido procesado en txtInfSelected
  // Muestra notificación de éxito/error
};
```

#### `processHTMLForQuill(html)`

```javascript
const processHTMLForQuill = (html) => {
  // Elimina elementos del head innecesarios
  // Preserva estilos inline importantes
  // Limpia estilos problemáticos
  // Mantiene etiquetas HTML importantes
  // Retorna HTML optimizado para Quill
};
```

## Uso

### Para el Usuario

1. Abrir el modal de "Adicionar Informe"
2. Hacer clic en el botón "Copiar Informe Labo" (nuevo botón)
3. El informe se copiará al editor con formato completo
4. Se mostrará una notificación de éxito

### Para el Desarrollador

```javascript
// Llamar la función directamente
copiarInformeLabo();

// O usar el estado para insertar HTML procesado
setTxtInfSelected(processedHTML);
```

## Ventajas sobre la Función Anterior

| Aspecto        | `copiarInforme` (anterior) | `copiarInformeLabo` (nueva)  |
| -------------- | -------------------------- | ---------------------------- |
| Formato        | Solo texto plano           | HTML completo con formato    |
| Estilos        | Perdidos                   | Preservados (estilos inline) |
| Estructura     | Lineal                     | Jerárquica (divs, párrafos)  |
| Etiquetas      | No                         | Sí (strong, em, br, etc.)    |
| Compatibilidad | Universal                  | Optimizada para Quill        |

## Consideraciones de Seguridad

- Se utiliza `dangerouslyPasteHTML` que puede introducir riesgos XSS
- El HTML se procesa y limpia antes de la inserción
- Se eliminan elementos potencialmente peligrosos
- Se recomienda validar el HTML de entrada en entornos de producción

## Ejemplo de HTML Procesado

### Entrada (HTML original)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      ...
    </style>
  </head>
  <body>
    <div class="protocolo-info">Protocolo: 2298693<br />Fecha: 07/02/2025</div>
    <div class="resultado-item">
      <strong>HEMOGRAMA</strong>
      <div class="analisis-nombre">RECUENTO DE GLOBULOS ROJOS</div>
    </div>
  </body>
</html>
```

### Salida (HTML procesado)

```html
<div class="protocolo-info">Protocolo: 2298693<br />Fecha: 07/02/2025</div>
<div class="resultado-item">
  <strong>HEMOGRAMA</strong>
  <div class="analisis-nombre">RECUENTO DE GLOBULOS ROJOS</div>
</div>
```

## Testing

Se incluye un archivo `test_informe_laboratorio.html` que simula un informe de laboratorio completo para probar la funcionalidad.

## Compatibilidad

- React 16.8+
- React-Quill 2.0+
- Navegadores modernos (Chrome, Firefox, Safari, Edge)

## Próximas Mejoras

1. **Sanitización Avanzada**: Implementar DOMPurify para mayor seguridad
2. **Configuración de Estilos**: Permitir personalizar qué estilos preservar
3. **Validación de HTML**: Agregar validación más estricta del HTML de entrada
4. **Historial de Copias**: Mantener un registro de informes copiados
5. **Formato Personalizable**: Permitir al usuario elegir el nivel de formato a preservar
