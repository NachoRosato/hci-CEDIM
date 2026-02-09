-- ================================================================
-- ESQUEMA DE BASE DE DATOS - Sistema de Versionado de Formularios
-- Proyecto: HC Investigación - CEDIM
-- Fecha: Noviembre 2025
-- ================================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================================================
-- TABLA: users
-- Descripción: Usuarios del sistema (médicos, enfermeros, admins)
-- ================================================================
CREATE TABLE users (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email             VARCHAR(255) UNIQUE NOT NULL,
  nombre_completo   VARCHAR(255) NOT NULL,
  rol               VARCHAR(50) NOT NULL CHECK (rol IN ('medico', 'enfermero', 'admin', 'investigador')),
  activo            BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_rol ON users(rol);
CREATE INDEX idx_users_activo ON users(activo);

-- ================================================================
-- TABLA: patients
-- Descripción: Información básica de pacientes
-- ================================================================
CREATE TABLE patients (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dni                VARCHAR(20) UNIQUE NOT NULL,
  nombre_completo    VARCHAR(255) NOT NULL,
  fecha_nacimiento   DATE NOT NULL,
  sexo               VARCHAR(10) NOT NULL CHECK (sexo IN ('M', 'F', 'Otro')),
  domicilio          TEXT,
  telefono_1         VARCHAR(50),
  telefono_2         VARCHAR(50),
  contacto           VARCHAR(255),
  hcd                VARCHAR(50),  -- Historia Clínica Digital
  hcp                VARCHAR(50),  -- Historia Clínica Papel
  activo             BOOLEAN DEFAULT TRUE,
  created_at         TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at         TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by_user_id UUID REFERENCES users(id)
);

-- Índices para patients
CREATE INDEX idx_patients_dni ON patients(dni);
CREATE INDEX idx_patients_hcd ON patients(hcd);
CREATE INDEX idx_patients_hcp ON patients(hcp);
CREATE INDEX idx_patients_activo ON patients(activo);
CREATE INDEX idx_patients_nombre ON patients USING gin(to_tsvector('spanish', nombre_completo));

-- ================================================================
-- TABLA: evolucion_forms
-- Descripción: Formularios de evolución médica
-- ================================================================
CREATE TABLE evolucion_forms (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id            UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  form_number           INTEGER NOT NULL,  -- Número secuencial de evolución para el paciente
  
  -- Versión "HEAD" (actual)
  current_version_id    UUID,  -- Se establece después con FK a evolucion_versions
  
  -- Metadata
  status                VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'archived', 'cancelled')),
  fecha_evolucion       DATE DEFAULT CURRENT_DATE,
  
  -- Auditoría
  created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by_user_id    UUID NOT NULL REFERENCES users(id),
  
  -- Constraints
  UNIQUE(patient_id, form_number)
);

-- Índices para evolucion_forms
CREATE INDEX idx_evolucion_patient ON evolucion_forms(patient_id);
CREATE INDEX idx_evolucion_status ON evolucion_forms(status);
CREATE INDEX idx_evolucion_fecha ON evolucion_forms(fecha_evolucion DESC);
CREATE INDEX idx_evolucion_patient_current ON evolucion_forms(patient_id, current_version_id);

-- ================================================================
-- TABLA: evolucion_versions
-- Descripción: Versiones completas del formulario (snapshots)
-- ================================================================
CREATE TABLE evolucion_versions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id               UUID NOT NULL REFERENCES evolucion_forms(id) ON DELETE CASCADE,
  version_number        INTEGER NOT NULL CHECK (version_number > 0),
  
  -- Snapshot completo del formulario en JSONB
  form_data             JSONB NOT NULL,
  
  -- Metadata de la versión
  created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by_user_id    UUID NOT NULL REFERENCES users(id),
  comment               TEXT,  -- Comentario opcional del usuario sobre los cambios
  
  -- Información adicional
  is_major_version      BOOLEAN DEFAULT FALSE,  -- Marca versiones importantes (ej: firma final)
  previous_version_id   UUID REFERENCES evolucion_versions(id),
  
  -- Constraints
  UNIQUE(form_id, version_number)
);

-- Índices para evolucion_versions
CREATE INDEX idx_versions_form ON evolucion_versions(form_id, version_number DESC);
CREATE INDEX idx_versions_created ON evolucion_versions(created_at DESC);
CREATE INDEX idx_versions_user ON evolucion_versions(created_by_user_id);
CREATE INDEX idx_versions_major ON evolucion_versions(is_major_version) WHERE is_major_version = TRUE;

-- Índices GIN para búsquedas eficientes en JSONB
CREATE INDEX idx_versions_data_gin ON evolucion_versions USING gin(form_data jsonb_path_ops);
CREATE INDEX idx_versions_data_keys ON evolucion_versions USING gin(form_data);

-- ================================================================
-- TABLA: evolucion_changes
-- Descripción: Registro granular de cambios entre versiones
-- ================================================================
CREATE TABLE evolucion_changes (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version_id            UUID NOT NULL REFERENCES evolucion_versions(id) ON DELETE CASCADE,
  previous_version_id   UUID REFERENCES evolucion_versions(id) ON DELETE SET NULL,
  
  -- Información del campo modificado
  field_name            VARCHAR(255) NOT NULL,  -- ID del campo (ej: "peso_examen")
  field_label           VARCHAR(255),           -- Label legible (ej: "Peso (kg)")
  
  -- Valores antes/después
  old_value             TEXT,
  new_value             TEXT,
  
  -- Metadata del cambio
  change_type           VARCHAR(20) NOT NULL CHECK (change_type IN ('added', 'modified', 'deleted')),
  page_number           INTEGER,                -- Número de página del formulario
  package_name          VARCHAR(255),           -- Nombre del paquete/sección
  
  created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para evolucion_changes
CREATE INDEX idx_changes_version ON evolucion_changes(version_id);
CREATE INDEX idx_changes_prev_version ON evolucion_changes(previous_version_id);
CREATE INDEX idx_changes_field ON evolucion_changes(field_name);
CREATE INDEX idx_changes_type ON evolucion_changes(change_type);
CREATE INDEX idx_changes_created ON evolucion_changes(created_at DESC);
CREATE INDEX idx_changes_version_field ON evolucion_changes(version_id, field_name);

-- ================================================================
-- CONSTRAINTS ADICIONALES
-- ================================================================

-- Agregar FK de current_version_id en evolucion_forms
-- (Se hace después porque es una referencia circular)
ALTER TABLE evolucion_forms
ADD CONSTRAINT fk_evolucion_forms_current_version
FOREIGN KEY (current_version_id) 
REFERENCES evolucion_versions(id) 
ON DELETE SET NULL;

-- ================================================================
-- FUNCIONES Y TRIGGERS
-- ================================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER trigger_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_evolucion_forms_updated_at
  BEFORE UPDATE ON evolucion_forms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- VISTAS ÚTILES
-- ================================================================

-- Vista: Versiones actuales con información completa
CREATE OR REPLACE VIEW vw_current_versions AS
SELECT 
  p.id as patient_id,
  p.nombre_completo as patient_name,
  p.dni,
  f.id as form_id,
  f.form_number,
  f.status as form_status,
  f.fecha_evolucion,
  v.id as version_id,
  v.version_number,
  v.form_data,
  v.created_at as version_created_at,
  v.is_major_version,
  u.nombre_completo as created_by,
  u.rol as created_by_rol
FROM patients p
JOIN evolucion_forms f ON p.id = f.patient_id
JOIN evolucion_versions v ON f.current_version_id = v.id
JOIN users u ON v.created_by_user_id = u.id
WHERE p.activo = TRUE;

-- Vista: Historial completo de versiones
CREATE OR REPLACE VIEW vw_version_history AS
SELECT 
  p.id as patient_id,
  p.nombre_completo as patient_name,
  p.dni,
  f.id as form_id,
  f.form_number,
  v.id as version_id,
  v.version_number,
  v.created_at,
  v.comment,
  v.is_major_version,
  u.nombre_completo as created_by,
  u.email as created_by_email,
  u.rol as created_by_rol,
  -- Contar cambios en esta versión
  (SELECT COUNT(*) FROM evolucion_changes WHERE version_id = v.id) as changes_count
FROM patients p
JOIN evolucion_forms f ON p.id = f.patient_id
JOIN evolucion_versions v ON f.id = v.form_id
JOIN users u ON v.created_by_user_id = u.id
ORDER BY p.id, f.form_number, v.version_number DESC;

-- Vista: Últimas modificaciones (actividad reciente)
CREATE OR REPLACE VIEW vw_recent_activity AS
SELECT 
  p.nombre_completo as patient_name,
  p.dni,
  f.form_number,
  v.version_number,
  c.field_label,
  c.old_value,
  c.new_value,
  c.change_type,
  c.created_at,
  u.nombre_completo as modified_by
FROM evolucion_changes c
JOIN evolucion_versions v ON c.version_id = v.id
JOIN evolucion_forms f ON v.form_id = f.id
JOIN patients p ON f.patient_id = p.id
JOIN users u ON v.created_by_user_id = u.id
ORDER BY c.created_at DESC
LIMIT 100;

-- ================================================================
-- COMENTARIOS EN TABLAS Y COLUMNAS
-- ================================================================

COMMENT ON TABLE users IS 'Usuarios del sistema con roles diferenciados';
COMMENT ON TABLE patients IS 'Información demográfica y de contacto de pacientes';
COMMENT ON TABLE evolucion_forms IS 'Formularios de evolución médica asociados a pacientes';
COMMENT ON TABLE evolucion_versions IS 'Versiones completas (snapshots) de cada formulario';
COMMENT ON TABLE evolucion_changes IS 'Registro detallado de cambios individuales entre versiones';

COMMENT ON COLUMN evolucion_versions.form_data IS 'Snapshot completo del formulario en formato JSONB. Contiene todos los 169 campos del formulario de evolución';
COMMENT ON COLUMN evolucion_versions.is_major_version IS 'Marca versiones importantes como firmas finales, aprobaciones, etc.';
COMMENT ON COLUMN evolucion_changes.change_type IS 'Tipo de cambio: added (campo nuevo), modified (campo modificado), deleted (campo eliminado)';

-- ================================================================
-- DATOS DE EJEMPLO (OPCIONAL - Comentar en producción)
-- ================================================================

-- Insertar usuarios de ejemplo
INSERT INTO users (email, nombre_completo, rol) VALUES
  ('dr.lopez@hospital.com', 'Dr. Juan López', 'medico'),
  ('enf.martinez@hospital.com', 'Enf. María Martínez', 'enfermero'),
  ('dr.rodriguez@hospital.com', 'Dra. Ana Rodríguez', 'medico'),
  ('admin@hospital.com', 'Administrador Sistema', 'admin');

-- Insertar paciente de ejemplo
INSERT INTO patients (
  dni, 
  nombre_completo, 
  fecha_nacimiento, 
  sexo, 
  domicilio, 
  telefono_1,
  hcd,
  hcp,
  created_by_user_id
) VALUES (
  '40559615',
  'Jane Doe',
  '1995-02-01',
  'F',
  'Brasil 780, Villa Sarmiento',
  '115569605',
  '11812033',
  '18669',
  (SELECT id FROM users WHERE email = 'dr.lopez@hospital.com')
);

-- ================================================================
-- FIN DEL ESQUEMA
-- ================================================================

-- Verificación de integridad
DO $$
BEGIN
  RAISE NOTICE 'Esquema creado exitosamente!';
  RAISE NOTICE 'Tablas creadas: %', (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'evolucion%' OR table_name IN ('users', 'patients'));
  RAISE NOTICE 'Vistas creadas: %', (SELECT COUNT(*) FROM information_schema.views WHERE table_schema = 'public' AND table_name LIKE 'vw_%');
END $$;



