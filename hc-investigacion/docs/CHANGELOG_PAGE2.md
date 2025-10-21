# 📋 Changelog - Página 2: Antecedentes Patológicos

## Fecha: [Actual]

### ✨ Nuevas Funcionalidades

#### 1. Nueva Página 2: Antecedentes Patológicos Confirmados

**Ubicación**: `src/config/evolucionFormConfig.ts`

Se agregó una página completa con **37 campos** organizados en **2 columnas** para registrar antecedentes patológicos del paciente:

**Columna Izquierda (20 campos):**

1. ACV
2. Aneur. Aort. Reparado
3. Alergia (+ campo de detalle)
4. Amenorrea
5. Amputación (+ campo de detalle)
6. Angiop./aterectomía
7. Arritmia
8. Artrosis/A.R.
9. Cataratas
10. Cefaleas
11. Cirug./angiop. Art. perif.
12. Claudicación intermitente
13. E.P.O.C.
14. Fracturas (+ campo de detalle)
15. Gastritis
16. Hemorroides
17. Hepatopatía
18. Hernia

**Columna Derecha (25 campos):**

1. HTA (Hipertensión Arterial) ⭐ **REQUERIDO**
2. Climaterio
3. Anemia/H. Hemat
4. Colagenoapatía (+ campo de detalle para Lupus)
5. Colagenoapatía otra (+ campo de detalle para UCTD)
6. Constipación (+ campo de detalle)
7. Diabetes ⭐ **REQUERIDO**
8. Dislipemia ⭐ **REQUERIDO**
9. Dismenorrea
10. Incont. Urinaria
11. Infec./Úlcera en extrem.
12. Endarterectomía Carotídea
13. Enf. Coronaria (+ campo de detalle) ⭐ **REQUERIDO**
14. Enf. Ginecológicas
15. Enf. Hemáticas
16. Enf. Infecciosas (+ campo de detalle)
17. Enf. T. Sexual (+ campo de detalle)
18. Enf. Oftalmológicas
19. Enolismo
20. Epilepsia

#### 2. Campos Requeridos (Críticos para Diagnóstico)

Se marcaron como **obligatorios** los siguientes antecedentes por su relevancia cardiovascular:

- ✅ **HTA** (Hipertensión Arterial)
- ✅ **Diabetes**
- ✅ **Dislipemia**
- ✅ **Enf. Coronaria**

#### 3. Campos Condicionales (Checkbox + Detalle)

Se implementó un patrón de "checkbox + input de texto" para antecedentes que requieren especificación:

- **Alergia** → Ej: Penicilina
- **Amputación** → Ej: Dedo anular izq.
- **Fracturas** → Especificar localización
- **Colagenoapatía** → Ej: Lupus / UCTD
- **Constipación** → Detalles
- **Enf. Coronaria** → Ej: Isquemia
- **Enf. Infecciosas** → Ej: Neumonía
- **Enf. T. Sexual** → Ej: VIH

### 🎨 Mejoras de UI/UX

#### 1. Mejoras en el componente `FormField.tsx`

**Checkboxes mejorados:**

```typescript
- Cursor pointer en hover
- Efecto de scale (1.1) al hacer hover
- Nuevo componente CheckboxLabel styled
- Padding vertical para mejor espaciado
- User-select: none para evitar selección accidental de texto
```

**Validación con colores:**

- Asterisco de campos requeridos: cambió de `c-danger` a `c-latex30` (azul)
- Bordes de error: cambió de `c-danger` a `c-latex30` (azul)
- Mensajes de error: cambió de `c-danger` a `c-latex30` (azul)

#### 2. Lógica de agrupación en `FormPackage.tsx`

Se implementó una **lógica inteligente de agrupación** que:

1. Detecta automáticamente campos con sufijo `_detalle`
2. Los agrupa con su checkbox padre
3. Muestra el campo de detalle **solo cuando el checkbox está marcado**
4. Mantiene el layout de 2 columnas balanceado

**Ejemplo:**

```typescript
// Campo: alergia (checkbox)
// Campo detalle: alergia_detalle (text)
// → Solo se muestra alergia_detalle si alergia está checked
```

#### 3. Toast de Warning mejorado

Se agregó un nuevo tono `warning` al componente Toast:

- Color: Gradiente naranja (`#f59e0b` → `#f97316`)
- Mensaje: "Complete los datos requeridos"
- Se muestra al intentar avanzar sin completar campos obligatorios

### 🔄 Cambios en la Estructura

#### Reordenamiento de Páginas

Debido a la inserción de la nueva página 2, se recorrieron las páginas existentes:

- **Página 1**: Datos del Paciente y Accesibilidad (sin cambios)
- **Página 2**: ⭐ **NUEVO** - Antecedentes Patológicos Confirmados
- **Página 3**: Signos Vitales y Evaluación Clínica (antes página 2)
- **Página 4**: Criterios y Seguimiento (antes página 3)

### 📝 Documentación Actualizada

- ✅ `docs/architecture.md`: Agregada sección de Formulario Multi-Página con detalles de cada página
- ✅ `docs/CHANGELOG_PAGE2.md`: Este archivo (documentación detallada de cambios)

---

## 🧪 Testing

Para probar la nueva página:

1. Navegar a `/protected/evolucion`
2. Completar la Página 1 (Datos del Paciente)
3. Hacer clic en "Siguiente"
4. Verificar que se muestre la Página 2 con todos los antecedentes
5. Intentar avanzar sin marcar los campos requeridos → debe mostrar Toast de warning
6. Marcar HTA, Diabetes, Dislipemia y Enf. Coronaria
7. Verificar que campos de detalle aparezcan al marcar checkboxes correspondientes

---

## 🎯 Próximos Pasos (Posibles Mejoras)

1. **Búsqueda dentro de antecedentes**: Agregar un input para filtrar la lista de antecedentes
2. **Categorización visual**: Agrupar por tipo (cardiovasculares, metabólicos, etc.)
3. **Antecedentes frecuentes**: Destacar visualmente los más comunes
4. **Historial**: Mostrar antecedentes registrados en consultas previas
5. **Cálculo de riesgo**: Implementar score de riesgo cardiovascular basado en antecedentes

---

## 👥 Créditos

- Diseño basado en la imagen de referencia proporcionada
- Implementación: Sistema de formularios multi-página con styled-components
- Integración con GlobalStyle.ts para consistencia visual
