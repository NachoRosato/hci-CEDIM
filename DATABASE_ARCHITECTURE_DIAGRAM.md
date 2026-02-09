# 📊 Diagrama de Arquitectura de Base de Datos

## 🏗️ Vista General del Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                      APLICACIÓN FRONTEND                             │
│  (React + Next.js + MultiPageForm Component)                        │
└────────────┬────────────────────────────────────────────────────────┘
             │
             │ HTTP/REST
             │
┌────────────▼────────────────────────────────────────────────────────┐
│                      BACKEND API LAYER                               │
│  • POST /api/forms/{id}/versions    (Crear versión)                │
│  • GET  /api/forms/{id}/versions    (Listar versiones)             │
│  • GET  /api/forms/{id}/versions/compare (Comparar)                │
│  • POST /api/forms/{id}/versions/{id}/restore (Restaurar)          │
└────────────┬────────────────────────────────────────────────────────┘
             │
             │ Version Service
             │
┌────────────▼────────────────────────────────────────────────────────┐
│                  CAPA DE LÓGICA DE NEGOCIO                          │
│                                                                      │
│  VersionService {                                                   │
│    • createVersion()       → Calcula diffs y guarda snapshot       │
│    • getVersionHistory()   → Lista todas las versiones             │
│    • compareVersions()     → Compara dos versiones                 │
│    • restoreVersion()      → Rollback a versión anterior           │
│  }                                                                  │
└────────────┬────────────────────────────────────────────────────────┘
             │
             │ ORM (Prisma/TypeORM)
             │
┌────────────▼────────────────────────────────────────────────────────┐
│                    BASE DE DATOS (PostgreSQL)                       │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  users   │  │ patients │  │evolucion │  │evolucion │          │
│  │          │  │          │  │ _forms   │  │_versions │          │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘          │
│                                    │              │                 │
│                                    └──────┬───────┘                 │
│                                           │                         │
│                                  ┌────────▼────────┐                │
│                                  │  evolucion_     │                │
│                                  │   changes       │                │
│                                  └─────────────────┘                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Estructura de Tablas Detallada

```
┌─────────────────────────────────────────────────────────────────────┐
│                           TABLA: users                               │
├─────────────────────────────────────────────────────────────────────┤
│ • id (UUID, PK)                                                     │
│ • email (VARCHAR, UNIQUE)                                           │
│ • nombre_completo (VARCHAR)                                         │
│ • rol (VARCHAR) → 'medico' | 'enfermero' | 'admin'                 │
│ • created_at, updated_at (TIMESTAMP)                                │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                         TABLA: patients                              │
├─────────────────────────────────────────────────────────────────────┤
│ • id (UUID, PK)                                                     │
│ • dni (VARCHAR, UNIQUE)                                             │
│ • nombre_completo (VARCHAR)                                         │
│ • fecha_nacimiento (DATE)                                           │
│ • sexo (VARCHAR)                                                    │
│ • domicilio, telefono_1, telefono_2 (TEXT/VARCHAR)                 │
│ • hcd, hcp (VARCHAR)                                                │
│ • created_by_user_id (UUID, FK → users)                            │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N (Un paciente → Muchos formularios)
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                      TABLA: evolucion_forms                          │
├─────────────────────────────────────────────────────────────────────┤
│ • id (UUID, PK)                                                     │
│ • patient_id (UUID, FK → patients)                                 │
│ • form_number (INTEGER) → Secuencial para cada paciente            │
│ • current_version_id (UUID, FK → evolucion_versions) ⭐            │
│ • status (VARCHAR) → 'draft' | 'completed' | 'archived'            │
│ • fecha_evolucion (DATE)                                            │
│ • created_by_user_id (UUID, FK → users)                            │
│                                                                      │
│ UNIQUE(patient_id, form_number)                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N (Un formulario → Muchas versiones)
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                    TABLA: evolucion_versions ⭐                      │
├─────────────────────────────────────────────────────────────────────┤
│ • id (UUID, PK)                                                     │
│ • form_id (UUID, FK → evolucion_forms)                             │
│ • version_number (INTEGER) → 1, 2, 3, 4...                         │
│ • form_data (JSONB) ← SNAPSHOT COMPLETO 169 CAMPOS                 │
│ • created_at (TIMESTAMP)                                            │
│ • created_by_user_id (UUID, FK → users)                            │
│ • comment (TEXT)                                                    │
│ • is_major_version (BOOLEAN)                                        │
│ • previous_version_id (UUID, FK → evolucion_versions)              │
│                                                                      │
│ UNIQUE(form_id, version_number)                                     │
│ INDEX GIN(form_data) ← Para búsquedas rápidas en JSONB             │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N (Una versión → Muchos cambios)
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                     TABLA: evolucion_changes                         │
├─────────────────────────────────────────────────────────────────────┤
│ • id (UUID, PK)                                                     │
│ • version_id (UUID, FK → evolucion_versions)                       │
│ • previous_version_id (UUID, FK → evolucion_versions)              │
│ • field_name (VARCHAR) → 'peso_examen'                             │
│ • field_label (VARCHAR) → 'Peso (kg)'                              │
│ • old_value (TEXT)                                                  │
│ • new_value (TEXT)                                                  │
│ • change_type (VARCHAR) → 'added' | 'modified' | 'deleted'         │
│ • page_number (INTEGER)                                             │
│ • package_name (VARCHAR)                                            │
│ • created_at (TIMESTAMP)                                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Creación de Versión

```
┌─────────────────────┐
│ Usuario completa    │
│ formulario          │
│ (169 campos)        │
└──────────┬──────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ Frontend: MultiPageForm                  │
│ • onSubmit(formData)                     │
│ • Envía POST /api/forms/{id}/versions    │
└──────────┬───────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ Backend: VersionService.createVersion()  │
│                                          │
│ 1. Obtener versión anterior (si existe) │
│    previousVersion = getLatestVersion()  │
│                                          │
│ 2. Calcular cambios                     │
│    changes = calculateChanges(           │
│      oldData: previousVersion?.formData, │
│      newData: formData                   │
│    )                                     │
│                                          │
│ 3. Iniciar transacción                  │
└──────────┬───────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ TRANSACCIÓN DE BASE DE DATOS            │
│                                          │
│ BEGIN;                                   │
│                                          │
│ INSERT INTO evolucion_versions {         │
│   form_id,                               │
│   version_number: prev + 1,              │
│   form_data: { ...formData },  ← SNAPSHOT│
│   created_by_user_id,                    │
│   previous_version_id                    │
│ }                                        │
│ RETURNING id;                            │
│                                          │
│ ↓                                        │
│                                          │
│ INSERT INTO evolucion_changes (bulk) {   │
│   { field: 'peso', old: 70, new: 75 },  │
│   { field: 'imc', old: 25.1, new: 26.9 }│
│   ...                                    │
│ }                                        │
│                                          │
│ ↓                                        │
│                                          │
│ UPDATE evolucion_forms                   │
│ SET current_version_id = newVersionId    │
│                                          │
│ COMMIT;                                  │
└──────────┬───────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ Respuesta al Frontend                    │
│ {                                        │
│   success: true,                         │
│   version: { ... },                      │
│   changesCount: 3                        │
│ }                                        │
└──────────────────────────────────────────┘
```

---

## 🔍 Flujo de Comparación de Versiones

```
┌─────────────────────┐
│ Usuario selecciona  │
│ Versión A y Versión B│
│ en VersionHistory    │
└──────────┬──────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ Frontend: VersionHistory.handleCompare() │
│ GET /api/forms/{id}/versions/compare     │
│ ?versionA=uuid-a&versionB=uuid-b         │
└──────────┬───────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ Backend: Consulta a BD                   │
│                                          │
│ SELECT * FROM evolucion_changes          │
│ WHERE version_id = 'uuid-b'              │
│   AND previous_version_id = 'uuid-a'     │
│ ORDER BY page_number, field_name         │
│                                          │
│ ↓ Resultado instantáneo ⚡               │
│                                          │
│ [                                        │
│   {                                      │
│     field_label: 'Peso (kg)',           │
│     old_value: '70',                    │
│     new_value: '75',                    │
│     change_type: 'modified'             │
│   },                                     │
│   ...                                    │
│ ]                                        │
└──────────┬───────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ Frontend: Renderiza cambios              │
│ • Campos agregados (verde)               │
│ • Campos modificados (amarillo)          │
│ • Campos eliminados (rojo)               │
└──────────────────────────────────────────┘
```

---

## 📦 Ejemplo de Almacenamiento

### Versión 1 (Primera captura)
```json
// Tabla: evolucion_versions
{
  "id": "v1-uuid",
  "form_id": "form-uuid",
  "version_number": 1,
  "form_data": {
    "nombre": "Jane Doe",
    "dni": "40559615",
    "sexo": "F",
    "peso_examen": 70,
    "altura_examen": 167,
    "imc_examen": 25.1,
    ... // todos los 169 campos
  },
  "created_by_user_id": "user-1-uuid",
  "comment": "Primera versión"
}

// Tabla: evolucion_changes (169 registros)
[
  { field_name: "nombre", old_value: null, new_value: "Jane Doe", change_type: "added" },
  { field_name: "dni", old_value: null, new_value: "40559615", change_type: "added" },
  ...
]
```

### Versión 2 (Modificación de 2 campos)
```json
// Tabla: evolucion_versions
{
  "id": "v2-uuid",
  "form_id": "form-uuid",
  "version_number": 2,
  "form_data": {
    "nombre": "Jane Doe",
    "dni": "40559615",
    "sexo": "F",
    "peso_examen": 75,      // ✏️ MODIFICADO
    "altura_examen": 167,
    "imc_examen": 26.9,     // ✏️ MODIFICADO (recalculado)
    ... // resto igual
  },
  "created_by_user_id": "user-2-uuid",
  "comment": "Actualización de peso",
  "previous_version_id": "v1-uuid"
}

// Tabla: evolucion_changes (SOLO 2 registros)
[
  { field_name: "peso_examen", old_value: "70", new_value: "75", change_type: "modified" },
  { field_name: "imc_examen", old_value: "25.1", new_value: "26.9", change_type: "modified" }
]
```

---

## 🎯 Ventajas de esta Arquitectura

### ✅ Rendimiento
- **Lectura**: O(1) - Leer versión completa sin reconstrucción
- **Comparación**: O(n) donde n = número de cambios (NO todos los campos)
- **Búsqueda en JSONB**: Índices GIN permiten búsquedas rápidas

### ✅ Escalabilidad
```
1000 pacientes × 5 evoluciones × 3 versiones promedio
= 15,000 versiones × 4.5 KB = ~67 MB

Con 10,000 pacientes: ~670 MB (MUY MANEJABLE)
```

### ✅ Trazabilidad Total
- Quién cambió qué y cuándo
- Comentarios en cada versión
- Historial completo navegable

### ✅ Flexibilidad
- Agregar campos sin migración de esquema
- JSONB permite estructura dinámica
- Fácil restauración de versiones

### ✅ Auditoria
- Cumple con regulaciones médicas
- Registro inmutable de cambios
- Capacidad de rollback

---

## 🔐 Consideraciones de Seguridad

```
┌─────────────────────────────────────────┐
│ SEGURIDAD DE DATOS                      │
├─────────────────────────────────────────┤
│ ✓ Datos sensibles en BD encriptada     │
│ ✓ Backups automáticos diarios          │
│ ✓ Roles de usuario (RBAC)              │
│ ✓ Auditoría completa (quien/cuando)    │
│ ✓ Versiones inmutables (no se borran)  │
│ ✓ Restauración no destructiva          │
└─────────────────────────────────────────┘
```

---

## 📚 Recursos Adicionales

- **DATABASE_ARCHITECTURE.md**: Documentación completa
- **schema.sql**: Script de creación de tablas
- **queries_examples.sql**: Ejemplos de consultas
- **versionService.ts**: Implementación en TypeScript
- **VersionHistory.tsx**: Componente React de UI

---

## 🚀 Próximos Pasos

1. ✅ Crear esquema en PostgreSQL → `psql < database/schema.sql`
2. ✅ Configurar Prisma/ORM con el esquema
3. ✅ Implementar VersionService en backend
4. ✅ Crear API endpoints
5. ✅ Integrar VersionHistory component en frontend
6. ✅ Testing completo
7. ✅ Deploy a producción

---

**¿Preguntas? ¿Necesitas más detalles?** 🎯



