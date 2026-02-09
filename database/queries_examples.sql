-- ================================================================
-- CONSULTAS DE EJEMPLO - Sistema de Versionado
-- Proyecto: HC Investigación - CEDIM
-- ================================================================

-- ================================================================
-- 1. CONSULTAS BÁSICAS
-- ================================================================

-- 1.1 Obtener la versión actual de un formulario específico
SELECT 
  f.id as form_id,
  f.form_number,
  f.status,
  v.version_number,
  v.form_data,
  v.created_at,
  v.comment,
  u.nombre_completo as autor
FROM evolucion_forms f
JOIN evolucion_versions v ON f.current_version_id = v.id
JOIN users u ON v.created_by_user_id = u.id
WHERE f.id = 'UUID_DEL_FORMULARIO';

-- 1.2 Obtener todas las evoluciones de un paciente
SELECT 
  f.form_number,
  f.status,
  f.fecha_evolucion,
  v.version_number,
  v.created_at,
  u.nombre_completo as autor
FROM evolucion_forms f
JOIN evolucion_versions v ON f.current_version_id = v.id
JOIN users u ON v.created_by_user_id = u.id
WHERE f.patient_id = 'UUID_DEL_PACIENTE'
ORDER BY f.form_number DESC;

-- 1.3 Historial completo de versiones de un formulario
SELECT 
  v.version_number,
  v.created_at,
  v.comment,
  v.is_major_version,
  u.nombre_completo as autor,
  u.rol,
  (SELECT COUNT(*) FROM evolucion_changes WHERE version_id = v.id) as num_cambios
FROM evolucion_versions v
JOIN users u ON v.created_by_user_id = u.id
WHERE v.form_id = 'UUID_DEL_FORMULARIO'
ORDER BY v.version_number DESC;

-- ================================================================
-- 2. COMPARACIÓN DE VERSIONES
-- ================================================================

-- 2.1 Ver todos los cambios de una versión específica
SELECT 
  c.field_label as campo,
  c.old_value as valor_anterior,
  c.new_value as valor_nuevo,
  c.change_type as tipo_cambio,
  c.page_number as pagina,
  c.package_name as seccion,
  v.created_at as fecha_modificacion,
  u.nombre_completo as modificado_por
FROM evolucion_changes c
JOIN evolucion_versions v ON c.version_id = v.id
JOIN users u ON v.created_by_user_id = u.id
WHERE c.version_id = 'UUID_DE_LA_VERSION'
ORDER BY c.page_number, c.field_name;

-- 2.2 Comparar dos versiones específicas
WITH version_a AS (
  SELECT form_data FROM evolucion_versions WHERE id = 'UUID_VERSION_A'
),
version_b AS (
  SELECT form_data FROM evolucion_versions WHERE id = 'UUID_VERSION_B'
)
SELECT 
  c.field_label,
  c.old_value,
  c.new_value,
  c.change_type
FROM evolucion_changes c
WHERE c.version_id = 'UUID_VERSION_B'
  AND c.previous_version_id = 'UUID_VERSION_A';

-- 2.3 Ver cambios entre versión N y N-1
SELECT 
  v.version_number,
  v.created_at,
  u.nombre_completo as autor,
  json_agg(json_build_object(
    'campo', c.field_label,
    'anterior', c.old_value,
    'nuevo', c.new_value,
    'tipo', c.change_type
  )) as cambios
FROM evolucion_versions v
JOIN users u ON v.created_by_user_id = u.id
LEFT JOIN evolucion_changes c ON c.version_id = v.id
WHERE v.form_id = 'UUID_DEL_FORMULARIO'
  AND v.version_number = 2  -- Cambiar número de versión
GROUP BY v.id, v.version_number, v.created_at, u.nombre_completo;

-- ================================================================
-- 3. AUDITORÍA Y TRAZABILIDAD
-- ================================================================

-- 3.1 Todas las modificaciones realizadas por un usuario
SELECT 
  p.nombre_completo as paciente,
  f.form_number as evolucion,
  v.version_number as version,
  c.field_label as campo_modificado,
  c.old_value as valor_anterior,
  c.new_value as valor_nuevo,
  c.created_at as fecha
FROM evolucion_changes c
JOIN evolucion_versions v ON c.version_id = v.id
JOIN evolucion_forms f ON v.form_id = f.id
JOIN patients p ON f.patient_id = p.id
WHERE v.created_by_user_id = 'UUID_DEL_USUARIO'
ORDER BY c.created_at DESC
LIMIT 50;

-- 3.2 Actividad reciente del sistema (últimas 24 horas)
SELECT 
  p.nombre_completo as paciente,
  p.dni,
  f.form_number,
  v.version_number,
  v.created_at,
  u.nombre_completo as usuario,
  u.rol,
  COUNT(c.id) as cantidad_cambios
FROM evolucion_versions v
JOIN evolucion_forms f ON v.form_id = f.id
JOIN patients p ON f.patient_id = p.id
JOIN users u ON v.created_by_user_id = u.id
LEFT JOIN evolucion_changes c ON c.version_id = v.id
WHERE v.created_at >= NOW() - INTERVAL '24 hours'
GROUP BY p.id, f.id, v.id, u.id
ORDER BY v.created_at DESC;

-- 3.3 Historial de cambios de un campo específico
SELECT 
  v.version_number,
  v.created_at,
  u.nombre_completo as modificado_por,
  c.old_value as valor_anterior,
  c.new_value as valor_nuevo
FROM evolucion_changes c
JOIN evolucion_versions v ON c.version_id = v.id
JOIN users u ON v.created_by_user_id = u.id
WHERE v.form_id = 'UUID_DEL_FORMULARIO'
  AND c.field_name = 'peso_examen'  -- Cambiar por el campo deseado
ORDER BY v.version_number;

-- ================================================================
-- 4. BÚSQUEDAS EN JSONB
-- ================================================================

-- 4.1 Buscar pacientes con HTA en su evolución actual
SELECT 
  p.nombre_completo,
  p.dni,
  f.form_number,
  v.form_data->>'hta' as tiene_hta,
  v.created_at
FROM patients p
JOIN evolucion_forms f ON p.id = f.patient_id
JOIN evolucion_versions v ON f.current_version_id = v.id
WHERE v.form_data->>'hta' = 'true'
ORDER BY p.nombre_completo;

-- 4.2 Buscar pacientes con IMC mayor a 30 (obesidad)
SELECT 
  p.nombre_completo,
  p.dni,
  CAST(v.form_data->>'imc_examen' AS DECIMAL) as imc,
  CAST(v.form_data->>'peso_examen' AS DECIMAL) as peso,
  CAST(v.form_data->>'altura_examen' AS DECIMAL) as altura
FROM patients p
JOIN evolucion_forms f ON p.id = f.patient_id
JOIN evolucion_versions v ON f.current_version_id = v.id
WHERE CAST(v.form_data->>'imc_examen' AS DECIMAL) > 30
ORDER BY CAST(v.form_data->>'imc_examen' AS DECIMAL) DESC;

-- 4.3 Buscar pacientes con diabetes Y dislipemia
SELECT 
  p.nombre_completo,
  p.dni,
  f.form_number,
  v.form_data->>'diabetes' as diabetes,
  v.form_data->>'dislipemia' as dislipemia
FROM patients p
JOIN evolucion_forms f ON p.id = f.patient_id
JOIN evolucion_versions v ON f.current_version_id = v.id
WHERE v.form_data->>'diabetes' = 'true'
  AND v.form_data->>'dislipemia' = 'true';

-- 4.4 Búsqueda por múltiples criterios médicos
SELECT 
  p.nombre_completo,
  p.dni,
  v.form_data->>'edad' as edad,
  v.form_data->>'hta' as hta,
  v.form_data->>'diabetes' as diabetes,
  v.form_data->>'tabaquismo' as tabaquismo,
  CAST(v.form_data->>'imc_examen' AS DECIMAL) as imc
FROM patients p
JOIN evolucion_forms f ON p.id = f.patient_id
JOIN evolucion_versions v ON f.current_version_id = v.id
WHERE v.form_data->>'hta' = 'true'
  AND CAST(v.form_data->>'edad' AS INTEGER) > 50
  AND CAST(v.form_data->>'imc_examen' AS DECIMAL) > 25;

-- ================================================================
-- 5. ESTADÍSTICAS Y REPORTES
-- ================================================================

-- 5.1 Cantidad de formularios por estado
SELECT 
  status,
  COUNT(*) as cantidad,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as porcentaje
FROM evolucion_forms
GROUP BY status
ORDER BY cantidad DESC;

-- 5.2 Promedio de versiones por formulario
SELECT 
  AVG(version_count) as promedio_versiones,
  MIN(version_count) as min_versiones,
  MAX(version_count) as max_versiones
FROM (
  SELECT 
    form_id,
    COUNT(*) as version_count
  FROM evolucion_versions
  GROUP BY form_id
) subquery;

-- 5.3 Usuarios más activos (por cantidad de versiones creadas)
SELECT 
  u.nombre_completo,
  u.rol,
  COUNT(v.id) as versiones_creadas,
  MIN(v.created_at) as primera_version,
  MAX(v.created_at) as ultima_version
FROM users u
JOIN evolucion_versions v ON u.id = v.created_by_user_id
GROUP BY u.id
ORDER BY versiones_creadas DESC
LIMIT 10;

-- 5.4 Campos más modificados
SELECT 
  c.field_label as campo,
  COUNT(*) as veces_modificado,
  COUNT(DISTINCT c.version_id) as versiones_afectadas
FROM evolucion_changes c
WHERE c.change_type = 'modified'
GROUP BY c.field_label
ORDER BY veces_modificado DESC
LIMIT 20;

-- 5.5 Actividad por hora del día
SELECT 
  EXTRACT(HOUR FROM created_at) as hora,
  COUNT(*) as cantidad_versiones
FROM evolucion_versions
GROUP BY EXTRACT(HOUR FROM created_at)
ORDER BY hora;

-- ================================================================
-- 6. OPERACIONES DE MANTENIMIENTO
-- ================================================================

-- 6.1 Encontrar formularios sin versión actual asignada
SELECT 
  f.id,
  f.patient_id,
  f.form_number,
  f.status
FROM evolucion_forms f
WHERE f.current_version_id IS NULL;

-- 6.2 Verificar integridad de versiones (todas tienen previous_version correcto)
SELECT 
  v.id,
  v.form_id,
  v.version_number,
  v.previous_version_id,
  prev.version_number as previous_version_number
FROM evolucion_versions v
LEFT JOIN evolucion_versions prev ON v.previous_version_id = prev.id
WHERE v.version_number > 1
  AND (v.previous_version_id IS NULL 
    OR prev.version_number != v.version_number - 1);

-- 6.3 Encontrar versiones huérfanas (sin cambios registrados)
SELECT 
  v.id,
  v.form_id,
  v.version_number,
  v.created_at
FROM evolucion_versions v
WHERE v.version_number > 1
  AND NOT EXISTS (
    SELECT 1 
    FROM evolucion_changes c 
    WHERE c.version_id = v.id
  );

-- 6.4 Tamaño de almacenamiento por tabla
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as tamaño,
  pg_total_relation_size(schemaname||'.'||tablename) as tamaño_bytes
FROM pg_tables
WHERE schemaname = 'public'
  AND (tablename LIKE 'evolucion%' OR tablename IN ('users', 'patients'))
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ================================================================
-- 7. ROLLBACK Y RESTAURACIÓN
-- ================================================================

-- 7.1 Preparar rollback a una versión anterior
-- (En la aplicación debes crear una nueva versión con los datos antiguos)
WITH target_version AS (
  SELECT 
    form_id,
    form_data,
    version_number
  FROM evolucion_versions
  WHERE id = 'UUID_VERSION_A_RESTAURAR'
),
current_max_version AS (
  SELECT 
    MAX(version_number) as max_version
  FROM evolucion_versions
  WHERE form_id = (SELECT form_id FROM target_version)
)
SELECT 
  tv.form_id,
  tv.form_data,
  cmv.max_version + 1 as nueva_version_number,
  'Restauración a versión ' || tv.version_number as comment
FROM target_version tv
CROSS JOIN current_max_version cmv;

-- 7.2 Ver qué se restauraría al hacer rollback
SELECT 
  c.field_label,
  current_v.form_data->>c.field_name as valor_actual,
  target_v.form_data->>c.field_name as valor_a_restaurar
FROM evolucion_versions current_v
CROSS JOIN evolucion_versions target_v
CROSS JOIN LATERAL (
  SELECT DISTINCT field_name, field_label
  FROM evolucion_changes
  WHERE version_id IN (current_v.id, target_v.id)
) c
WHERE current_v.id = 'UUID_VERSION_ACTUAL'
  AND target_v.id = 'UUID_VERSION_A_RESTAURAR'
  AND current_v.form_data->>c.field_name IS DISTINCT FROM target_v.form_data->>c.field_name;

-- ================================================================
-- 8. VISTAS MATERIALIZADAS (Opcional para rendimiento)
-- ================================================================

-- 8.1 Crear vista materializada de estadísticas
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_form_statistics AS
SELECT 
  p.id as patient_id,
  p.nombre_completo as patient_name,
  COUNT(DISTINCT f.id) as total_forms,
  COUNT(DISTINCT v.id) as total_versions,
  MAX(v.created_at) as last_modified,
  COUNT(DISTINCT v.created_by_user_id) as contributors_count
FROM patients p
LEFT JOIN evolucion_forms f ON p.id = f.patient_id
LEFT JOIN evolucion_versions v ON f.id = v.form_id
GROUP BY p.id;

-- Crear índice en la vista materializada
CREATE INDEX idx_mv_form_stats_patient ON mv_form_statistics(patient_id);

-- Refrescar la vista materializada
-- REFRESH MATERIALIZED VIEW CONCURRENTLY mv_form_statistics;

-- ================================================================
-- FIN DE CONSULTAS DE EJEMPLO
-- ================================================================



