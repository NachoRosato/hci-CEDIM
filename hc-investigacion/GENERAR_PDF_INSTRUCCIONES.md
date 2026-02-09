# 📄 Generación de PDF - Lista de Inputs del Formulario

Este documento explica cómo generar el PDF de la lista completa de inputs del formulario de evolución médica.

---

## 📋 Archivos Generados

- **`LISTA_INPUTS_FORMULARIO.html`**: Archivo HTML estilizado con la lista completa de inputs
- **`LISTA_INPUTS_FORMULARIO.pdf`**: Archivo PDF generado (después de ejecutar el script)

---

## 🎨 Opción 1: Exportar PDF desde el Navegador (Más Rápido)

Esta opción **no requiere instalación de dependencias adicionales**.

### Pasos:

1. Abrir el archivo `LISTA_INPUTS_FORMULARIO.html` en tu navegador web
2. Presionar `Ctrl+P` (Windows/Linux) o `Cmd+P` (Mac)
3. En el diálogo de impresión:
   - Seleccionar **"Guardar como PDF"** como destino
   - Ajustar márgenes si es necesario (recomendado: Predeterminado)
   - Asegurarse de marcar **"Gráficos de fondo"** para incluir los colores y gradientes
4. Guardar el archivo como `LISTA_INPUTS_FORMULARIO.pdf`

### Ventajas:
- ✅ No requiere dependencias
- ✅ Más rápido
- ✅ Funciona en cualquier navegador moderno

---

## 🤖 Opción 2: Generación Automática con Script (Puppeteer)

Esta opción **automatiza** el proceso usando Puppeteer.

### Pasos:

#### 1. Instalar Puppeteer (solo la primera vez)

```bash
cd hc-investigacion
npm install --save-dev puppeteer
```

**Nota**: Puppeteer descargará una versión de Chromium (~170-300 MB). Esto puede tardar unos minutos.

#### 2. Ejecutar el Script

```bash
npm run generate-pdf
```

El PDF se generará automáticamente en la raíz del proyecto como `LISTA_INPUTS_FORMULARIO.pdf`.

### Ventajas:
- ✅ Completamente automatizado
- ✅ Resultados consistentes
- ✅ Útil para generación masiva o integración en CI/CD
- ✅ Puede ser modificado para incluir en procesos automáticos

---

## 🎨 Características del PDF

El PDF generado incluye:

- ✨ **Diseño Profesional**: Colores corporativos, gradientes y sombras
- 📊 **Tablas Organizadas**: Todos los inputs organizados por página y package
- 🔍 **Búsqueda Fácil**: Texto seleccionable y buscable
- 📈 **Resumen Estadístico**: Totales por página y por tipo de input
- ⚠️ **Páginas Comentadas**: Sección especial para páginas deshabilitadas
- 🎨 **Iconos y Emojis**: Para mejor identificación visual
- 📄 **Lista Completa**: 169 campos activos + 23 campos comentados = 192 campos totales

### Colores Utilizados:

- **Azul Corporativo**: `#030e35`, `#0283C0`, `#027BB5`
- **Púrpura**: `#667eea`, `#764ba2`
- **Verde (Requerido)**: `#27ae60`
- **Rojo (Comentado)**: `#e74c3c`

---

## 🛠️ Personalización

### Modificar Estilos del HTML

Edita el archivo `LISTA_INPUTS_FORMULARIO.html` en la sección `<style>`:

```css
/* Ejemplo: Cambiar color principal */
.page-title {
    background: linear-gradient(135deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
}
```

### Modificar Configuración del PDF (Script)

Edita `scripts/generatePDF.js`:

```javascript
await page.pdf({
  path: pdfPath,
  format: 'A4',        // Cambiar a 'Letter', 'Legal', etc.
  margin: {
    top: '20mm',       // Ajustar márgenes
    right: '15mm',
    bottom: '20mm',
    left: '15mm'
  },
  printBackground: true,  // Incluir colores de fondo
  preferCSSPageSize: true
});
```

---

## 📂 Estructura de Archivos

```
hc-investigacion/
├── LISTA_INPUTS_FORMULARIO.md        # Versión Markdown original
├── LISTA_INPUTS_FORMULARIO.html      # Versión HTML estilizada
├── LISTA_INPUTS_FORMULARIO.pdf       # PDF generado (gitignored)
├── GENERAR_PDF_INSTRUCCIONES.md      # Este archivo
└── scripts/
    └── generatePDF.js                 # Script de generación automática
```

---

## ❓ Troubleshooting

### El PDF no muestra los colores

**Solución**: Asegúrate de marcar "Gráficos de fondo" o "Print background colors" en las opciones de impresión.

### Error: "Cannot find module 'puppeteer'"

**Solución**: Instala puppeteer:
```bash
npm install --save-dev puppeteer
```

### El script falla en Linux/Mac

**Solución**: Asegúrate de tener las dependencias del sistema para Chromium:

**Ubuntu/Debian**:
```bash
sudo apt-get install -y libgbm-dev
```

**CentOS/RHEL**:
```bash
sudo yum install -y libX11-xcb libXcomposite libXcursor libXdamage libXi
```

### El PDF se ve cortado

**Solución**: Ajusta los márgenes en la configuración del PDF o en el navegador.

---

## 📊 Estadísticas del Documento

- **Total Páginas del Formulario**: 11 activas + 2 comentadas
- **Total Inputs**: 169 activos + 23 comentados = **192 campos**
- **Campos Requeridos**: 32 (18.93% del total activo)
- **Tipos de Input**: checkbox, text, textarea, number, radio, date, select

---

## 🔄 Actualización

Cuando se modifique el formulario (`evolucionFormConfig.ts`):

1. Actualizar `LISTA_INPUTS_FORMULARIO.md`
2. Actualizar `LISTA_INPUTS_FORMULARIO.html` manualmente o regenerar
3. Ejecutar `npm run generate-pdf` para crear el nuevo PDF

---

## 📞 Soporte

Si tienes problemas o preguntas sobre la generación del PDF:

1. Revisa esta guía completa
2. Verifica que todos los archivos existan en sus ubicaciones correctas
3. Prueba primero con la Opción 1 (navegador) antes de usar el script

---

**Última actualización**: Octubre 2025  
**Versión**: 1.0.0






