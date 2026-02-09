# 📚 Sistema de Versionado de Formularios Médicos - Documentación Completa

## 🎯 Inicio Rápido

Si eres nuevo en este proyecto, comienza aquí:

1. 📋 Lee el **[RESUMEN_EJECUTIVO.md](./RESUMEN_EJECUTIVO.md)** → Visión general de la solución
2. 🏗️ Revisa **[DATABASE_ARCHITECTURE.md](./DATABASE_ARCHITECTURE.md)** → Arquitectura detallada
3. 🎨 Mira **[DATABASE_ARCHITECTURE_DIAGRAM.md](./DATABASE_ARCHITECTURE_DIAGRAM.md)** → Diagramas visuales
4. 🚀 Sigue la [Guía de Implementación](#guía-de-implementación-paso-a-paso) más abajo

---

## 📁 Estructura de Archivos

```
hciCedim/
├── 📋 RESUMEN_EJECUTIVO.md              ← Resumen para stakeholders
├── 📚 DATABASE_ARCHITECTURE.md          ← Documentación técnica completa
├── 🎨 DATABASE_ARCHITECTURE_DIAGRAM.md  ← Diagramas visuales
├── 📖 README_VERSIONADO.md              ← Este archivo (índice general)
│
├── database/                             ← Scripts de Base de Datos
│   ├── schema.sql                        ← Script de creación de tablas (LISTO PARA USAR)
│   ├── queries_examples.sql              ← 50+ ejemplos de consultas
│   └── prisma-schema-example.prisma      ← Schema para Prisma ORM
│
├── backend-examples/                     ← Código Backend
│   ├── versionService.ts                 ← Servicio de versionado (CORE)
│   └── api-routes-example.ts             ← API Routes para Next.js
│
└── frontend-examples/                    ← Código Frontend
    └── VersionHistory.tsx                ← Componente React de historial
```

---

## 📚 Guía de Documentos

### 🎯 Para Gerentes/Líderes de Proyecto
→ **[RESUMEN_EJECUTIVO.md](./RESUMEN_EJECUTIVO.md)**
- Visión general de la solución
- Estimaciones de tiempo y costo
- Casos de uso
- ROI y escalabilidad

### 👨‍💻 Para Desarrolladores Backend
→ **[DATABASE_ARCHITECTURE.md](./DATABASE_ARCHITECTURE.md)**
- Esquema completo de tablas
- Estrategia de versionado
- Flujos de operación
- Optimizaciones de rendimiento
- Consultas comunes

→ **[database/schema.sql](./database/schema.sql)**
- Script SQL listo para ejecutar
- Tablas, índices, vistas, triggers

→ **[backend-examples/versionService.ts](./backend-examples/versionService.ts)**
- Lógica de negocio completa
- Función `calculateChanges()`
- Servicio de versionado

### 🎨 Para Desarrolladores Frontend
→ **[frontend-examples/VersionHistory.tsx](./frontend-examples/VersionHistory.tsx)**
- Componente React completo
- Integración con API
- UI de comparación de versiones

### 📊 Para Arquitectos de Software
→ **[DATABASE_ARCHITECTURE_DIAGRAM.md](./DATABASE_ARCHITECTURE_DIAGRAM.md)**
- Diagramas de arquitectura
- Flujos de datos
- Patrones de diseño

### 🔍 Para QA/Testing
→ **[database/queries_examples.sql](./database/queries_examples.sql)**
- Casos de prueba
- Consultas de verificación
- Queries de auditoría

---

## 🚀 Guía de Implementación Paso a Paso

### Fase 1: Configuración de Base de Datos

#### Opción A: PostgreSQL Directo

```bash
# 1. Crear base de datos
createdb hc_investigacion

# 2. Ejecutar script de creación
psql -d hc_investigacion -f database/schema.sql

# 3. Verificar tablas
psql -d hc_investigacion -c "\dt"

# Deberías ver:
# - users
# - patients
# - evolucion_forms
# - evolucion_versions
# - evolucion_changes
```

#### Opción B: Con Prisma

```bash
# 1. Instalar Prisma
npm install @prisma/client
npm install -D prisma

# 2. Inicializar Prisma
npx prisma init

# 3. Copiar schema
cp database/prisma-schema-example.prisma prisma/schema.prisma

# 4. Configurar DATABASE_URL en .env
# DATABASE_URL="postgresql://user:password@localhost:5432/hc_investigacion"

# 5. Generar cliente y crear tablas
npx prisma generate
npx prisma db push

# 6. Verificar en Prisma Studio
npx prisma studio
```

---

### Fase 2: Implementación Backend

#### Paso 1: Copiar el servicio de versionado

```bash
# Copiar el archivo al proyecto
cp backend-examples/versionService.ts src/services/versionService.ts
```

#### Paso 2: Ajustar imports según tu proyecto

```typescript
// Ejemplo para Next.js con Prisma
import { prisma } from '@/lib/prisma';
import { evolucionFormConfig } from '@/config/evolucionFormConfig';
```

#### Paso 3: Crear los endpoints API

```bash
# Estructura de carpetas en Next.js App Router
app/
  api/
    forms/
      [formId]/
        versions/
          route.ts              ← GET, POST /api/forms/{id}/versions
          [versionId]/
            route.ts            ← GET /api/forms/{id}/versions/{id}
            changes/
              route.ts          ← GET cambios
            restore/
              route.ts          ← POST restaurar
          compare/
            route.ts            ← GET comparar versiones
```

Copia el contenido de `backend-examples/api-routes-example.ts` y ajusta según tu estructura.

---

### Fase 3: Implementación Frontend

#### Paso 1: Copiar el componente

```bash
# Copiar al proyecto
cp frontend-examples/VersionHistory.tsx src/components/VersionHistory.tsx
```

#### Paso 2: Integrar en la página de evolución

```typescript
// En tu página de evolución (ej: app/protected/evolucion/page.tsx)

import VersionHistory from '@/components/VersionHistory';

export default function EvolucionPage() {
  const [showHistory, setShowHistory] = useState(false);
  
  return (
    <div>
      {/* Tu formulario existente */}
      <MultiPageForm {...props} />
      
      {/* Botón para ver historial */}
      <button onClick={() => setShowHistory(true)}>
        Ver Historial de Versiones
      </button>
      
      {/* Modal o panel con historial */}
      {showHistory && (
        <Modal onClose={() => setShowHistory(false)}>
          <VersionHistory formId={currentFormId} />
        </Modal>
      )}
    </div>
  );
}
```

#### Paso 3: Integrar el guardado de versiones

```typescript
// En MultiPageForm.tsx
const handleSubmit = async (data: FormData) => {
  // Guardar en base de datos con versionado
  const response = await fetch(`/api/forms/${formId}/versions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formData: data,
      userId: currentUser.id,
      comment: 'Actualización del formulario'
    })
  });
  
  const result = await response.json();
  console.log(`Versión ${result.version.versionNumber} guardada con ${result.changesCount} cambios`);
};
```

---

### Fase 4: Testing

#### Tests Backend

```typescript
// tests/versionService.test.ts
import { calculateChanges } from '@/services/versionService';

describe('VersionService', () => {
  test('detecta campos modificados', () => {
    const oldData = { peso: 70, altura: 167 };
    const newData = { peso: 75, altura: 167 };
    
    const changes = calculateChanges(oldData, newData);
    
    expect(changes).toHaveLength(1);
    expect(changes[0]).toMatchObject({
      fieldName: 'peso',
      oldValue: '70',
      newValue: '75',
      changeType: 'modified'
    });
  });
  
  test('detecta campos agregados', () => {
    const oldData = {};
    const newData = { nombre: 'Jane Doe' };
    
    const changes = calculateChanges(oldData, newData);
    
    expect(changes).toHaveLength(1);
    expect(changes[0].changeType).toBe('added');
  });
});
```

#### Tests Frontend

```typescript
// tests/VersionHistory.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import VersionHistory from '@/components/VersionHistory';

test('muestra lista de versiones', async () => {
  render(<VersionHistory formId="test-form-id" />);
  
  // Esperar a que cargue
  await screen.findByText(/Versión 1/);
  
  // Verificar que muestra versiones
  expect(screen.getByText(/Versión 1/)).toBeInTheDocument();
  expect(screen.getByText(/Versión 2/)).toBeInTheDocument();
});

test('permite seleccionar y comparar versiones', async () => {
  render(<VersionHistory formId="test-form-id" />);
  
  // Seleccionar primera versión
  fireEvent.click(screen.getByText(/Versión 1/));
  
  // Seleccionar segunda versión
  fireEvent.click(screen.getByText(/Versión 2/));
  
  // Comparar
  fireEvent.click(screen.getByText(/Comparar Versiones/));
  
  // Verificar que muestra cambios
  await screen.findByText(/Cambios entre Versión/);
});
```

---

## 🔍 Verificación de la Implementación

### Checklist de Validación

- [ ] **Base de datos creada correctamente**
  ```sql
  -- Ejecutar en psql
  SELECT COUNT(*) FROM users;
  SELECT COUNT(*) FROM patients;
  SELECT COUNT(*) FROM evolucion_forms;
  ```

- [ ] **Endpoints funcionando**
  ```bash
  # Test manual con curl
  curl http://localhost:3000/api/forms/test-id/versions
  ```

- [ ] **Componente renderiza**
  - Abrir página de evolución
  - Click en "Ver Historial"
  - Debería mostrar lista de versiones

- [ ] **Crear primera versión**
  - Completar formulario
  - Click en "Guardar"
  - Verificar en BD: `SELECT * FROM evolucion_versions;`

- [ ] **Crear segunda versión (modificación)**
  - Modificar 2-3 campos
  - Guardar
  - Verificar cambios: `SELECT * FROM evolucion_changes WHERE version_id = '...'`

- [ ] **Comparar versiones**
  - Seleccionar dos versiones en el componente
  - Click en "Comparar"
  - Debería mostrar diferencias

---

## 📊 Monitoreo y Métricas

### Queries Útiles para Monitoreo

```sql
-- 1. Cantidad de versiones por día
SELECT 
  DATE(created_at) as fecha,
  COUNT(*) as versiones_creadas
FROM evolucion_versions
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY fecha DESC;

-- 2. Usuarios más activos
SELECT 
  u.nombre_completo,
  COUNT(v.id) as versiones_creadas
FROM users u
JOIN evolucion_versions v ON u.id = v.created_by_user_id
WHERE v.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id
ORDER BY versiones_creadas DESC
LIMIT 10;

-- 3. Tamaño de almacenamiento
SELECT 
  pg_size_pretty(pg_total_relation_size('evolucion_versions')) as versiones,
  pg_size_pretty(pg_total_relation_size('evolucion_changes')) as cambios;

-- 4. Campos más modificados
SELECT 
  field_label,
  COUNT(*) as veces_modificado
FROM evolucion_changes
WHERE change_type = 'modified'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY field_label
ORDER BY veces_modificado DESC
LIMIT 20;
```

---

## 🐛 Troubleshooting

### Problema: "No se guardan las versiones"

**Solución**:
```typescript
// Verificar que tienes el formId correcto
console.log('Form ID:', formId);

// Verificar que la API responde
const response = await fetch(`/api/forms/${formId}/versions`);
console.log('Status:', response.status);
console.log('Data:', await response.json());
```

### Problema: "Tabla evolucion_versions no existe"

**Solución**:
```bash
# Verificar que el script SQL se ejecutó correctamente
psql -d hc_investigacion -c "\dt"

# Si no existe, ejecutar nuevamente
psql -d hc_investigacion -f database/schema.sql
```

### Problema: "Error al calcular cambios"

**Solución**:
```typescript
// Debug en calculateChanges
console.log('Old Data:', oldData);
console.log('New Data:', newData);
console.log('Changes:', changes);

// Verificar que FIELDS_METADATA está cargado
console.log('Fields Metadata:', FIELDS_METADATA.size);
```

### Problema: "Performance lento con muchas versiones"

**Solución**:
```sql
-- Verificar índices
SELECT 
  tablename, 
  indexname, 
  indexdef 
FROM pg_indexes 
WHERE tablename IN ('evolucion_versions', 'evolucion_changes');

-- Crear índices adicionales si es necesario
CREATE INDEX idx_custom ON evolucion_versions(form_id, created_at DESC);

-- Analizar query plan
EXPLAIN ANALYZE
SELECT * FROM evolucion_versions WHERE form_id = '...';
```

---

## 📞 Soporte

### Recursos Adicionales

- 📖 [PostgreSQL JSONB Documentation](https://www.postgresql.org/docs/current/datatype-json.html)
- 🔷 [Prisma Documentation](https://www.prisma.io/docs)
- ⚛️ [React Styled Components](https://styled-components.com/)

### Contacto

Para dudas sobre la implementación:
1. Revisa primero la documentación en este repositorio
2. Verifica los ejemplos de código
3. Consulta `queries_examples.sql` para ejemplos de consultas

---

## 🎉 ¡Todo Listo!

Si has seguido todos los pasos, deberías tener:

✅ Base de datos configurada  
✅ Backend implementado  
✅ Frontend funcionando  
✅ Tests pasando  
✅ Sistema completo de versionado operativo  

**¡Felicitaciones! 🚀**

---

## 📝 Licencia y Créditos

**Proyecto**: HC Investigación - CEDIM  
**Fecha de Creación**: 5 de Noviembre, 2025  
**Versión de Documentación**: 1.0  

Esta documentación y código de ejemplo pueden ser utilizados libremente dentro del proyecto HC Investigación.

---

**Última actualización**: 5 de Noviembre, 2025



