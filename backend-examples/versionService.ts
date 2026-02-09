/**
 * Version Service - Servicio de Versionado de Formularios
 * 
 * Este servicio maneja la creación, comparación y gestión de versiones
 * de formularios de evolución médica.
 */

import { evolucionFormConfig } from '@/config/evolucionFormConfig';
import type { FormData, FormConfig } from '@/components/forms/types';

// ================================================================
// TIPOS Y INTERFACES
// ================================================================

export interface Change {
  fieldName: string;
  fieldLabel: string;
  oldValue: string | null;
  newValue: string | null;
  changeType: 'added' | 'modified' | 'deleted';
  pageNumber: number;
  packageName: string;
}

export interface VersionMetadata {
  versionNumber: number;
  createdAt: Date;
  createdBy: string;
  comment?: string;
  changesCount: number;
}

export interface FormVersion {
  id: string;
  formId: string;
  versionNumber: number;
  formData: FormData;
  createdAt: Date;
  createdByUserId: string;
  comment?: string;
  isMajorVersion: boolean;
  previousVersionId?: string;
}

// ================================================================
// CONFIGURACIÓN
// ================================================================

/**
 * Extrae información de campos del FormConfig para usar en comparaciones
 */
function extractFieldsMetadata(config: FormConfig) {
  const fieldsMap = new Map<string, {
    label: string;
    pageNumber: number;
    packageName: string;
  }>();

  config.pages.forEach(page => {
    const pageNumber = parseInt(page.id.replace('page_', ''));
    
    page.packages.forEach(pkg => {
      pkg.fields.forEach(field => {
        fieldsMap.set(field.id, {
          label: field.label,
          pageNumber,
          packageName: pkg.title
        });
      });
    });
  });

  return fieldsMap;
}

const FIELDS_METADATA = extractFieldsMetadata(evolucionFormConfig);

// ================================================================
// FUNCIONES DE COMPARACIÓN
// ================================================================

/**
 * Calcula las diferencias entre dos versiones del formulario
 * 
 * @param oldData - Datos de la versión anterior
 * @param newData - Datos de la nueva versión
 * @returns Array de cambios detectados
 */
export function calculateChanges(
  oldData: FormData | null,
  newData: FormData
): Change[] {
  const changes: Change[] = [];
  
  // Si no hay versión anterior, todos los campos son "added"
  if (!oldData) {
    Object.entries(newData).forEach(([fieldName, newValue]) => {
      if (newValue !== undefined && newValue !== null && newValue !== '') {
        const metadata = FIELDS_METADATA.get(fieldName);
        changes.push({
          fieldName,
          fieldLabel: metadata?.label || fieldName,
          oldValue: null,
          newValue: String(newValue),
          changeType: 'added',
          pageNumber: metadata?.pageNumber || 0,
          packageName: metadata?.packageName || 'Unknown'
        });
      }
    });
    return changes;
  }

  // Obtener todos los campos únicos de ambas versiones
  const allFields = new Set([
    ...Object.keys(oldData),
    ...Object.keys(newData)
  ]);

  // Comparar cada campo
  allFields.forEach(fieldName => {
    const oldValue = oldData[fieldName];
    const newValue = newData[fieldName];
    const metadata = FIELDS_METADATA.get(fieldName);

    // Normalizar valores para comparación
    const normalizedOldValue = normalizeValue(oldValue);
    const normalizedNewValue = normalizeValue(newValue);

    // Campo agregado
    if ((normalizedOldValue === null || normalizedOldValue === '') && 
        normalizedNewValue !== null && normalizedNewValue !== '') {
      changes.push({
        fieldName,
        fieldLabel: metadata?.label || fieldName,
        oldValue: null,
        newValue: String(normalizedNewValue),
        changeType: 'added',
        pageNumber: metadata?.pageNumber || 0,
        packageName: metadata?.packageName || 'Unknown'
      });
    }
    // Campo eliminado
    else if (normalizedOldValue !== null && normalizedOldValue !== '' &&
             (normalizedNewValue === null || normalizedNewValue === '')) {
      changes.push({
        fieldName,
        fieldLabel: metadata?.label || fieldName,
        oldValue: String(normalizedOldValue),
        newValue: null,
        changeType: 'deleted',
        pageNumber: metadata?.pageNumber || 0,
        packageName: metadata?.packageName || 'Unknown'
      });
    }
    // Campo modificado
    else if (normalizedOldValue !== normalizedNewValue &&
             normalizedOldValue !== null && normalizedOldValue !== '' &&
             normalizedNewValue !== null && normalizedNewValue !== '') {
      changes.push({
        fieldName,
        fieldLabel: metadata?.label || fieldName,
        oldValue: String(normalizedOldValue),
        newValue: String(normalizedNewValue),
        changeType: 'modified',
        pageNumber: metadata?.pageNumber || 0,
        packageName: metadata?.packageName || 'Unknown'
      });
    }
  });

  return changes;
}

/**
 * Normaliza valores para comparación consistente
 */
function normalizeValue(value: any): any {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  
  // Para booleanos
  if (typeof value === 'boolean') {
    return value;
  }
  
  // Para números
  if (typeof value === 'number') {
    return value;
  }
  
  // Para strings, trim
  if (typeof value === 'string') {
    return value.trim();
  }
  
  // Para arrays u objetos, convertir a JSON
  return JSON.stringify(value);
}

// ================================================================
// SERVICIO DE VERSIONADO (Ejemplo con Prisma)
// ================================================================

/**
 * Clase de servicio para manejar operaciones de versionado
 * 
 * NOTA: Este es un ejemplo. Debes ajustarlo según tu ORM/cliente de BD
 */
export class VersionService {
  // En un proyecto real, inyectarías tu cliente de base de datos aquí
  // Por ejemplo: constructor(private prisma: PrismaClient) {}
  
  /**
   * Crea una nueva versión del formulario
   * 
   * @param formId - ID del formulario
   * @param formData - Datos completos del formulario
   * @param userId - ID del usuario que crea la versión
   * @param comment - Comentario opcional sobre los cambios
   * @returns Nueva versión creada y cantidad de cambios
   */
  async createVersion(
    formId: string,
    formData: FormData,
    userId: string,
    comment?: string
  ): Promise<{ version: FormVersion; changesCount: number }> {
    
    // 1. Obtener la versión anterior (si existe)
    const previousVersion = await this.getLatestVersion(formId);
    
    const newVersionNumber = previousVersion 
      ? previousVersion.versionNumber + 1 
      : 1;
    
    // 2. Calcular cambios
    const changes = calculateChanges(
      previousVersion?.formData || null,
      formData
    );
    
    console.log(`🔍 Detectados ${changes.length} cambios en versión ${newVersionNumber}`);
    
    // 3. Crear nueva versión en la base de datos (transacción)
    // EJEMPLO CON PRISMA (ajustar según tu implementación)
    /*
    const newVersion = await prisma.$transaction(async (tx) => {
      // 3a. Insertar versión
      const version = await tx.evolucionVersion.create({
        data: {
          formId,
          versionNumber: newVersionNumber,
          formData: formData as any, // Prisma Json type
          createdByUserId: userId,
          comment,
          isMajorVersion: false,
          previousVersionId: previousVersion?.id
        }
      });
      
      // 3b. Insertar cambios
      if (changes.length > 0) {
        await tx.evolucionChange.createMany({
          data: changes.map(change => ({
            versionId: version.id,
            previousVersionId: previousVersion?.id,
            fieldName: change.fieldName,
            fieldLabel: change.fieldLabel,
            oldValue: change.oldValue,
            newValue: change.newValue,
            changeType: change.changeType,
            pageNumber: change.pageNumber,
            packageName: change.packageName
          }))
        });
      }
      
      // 3c. Actualizar current_version_id en evolucion_forms
      await tx.evolucionForm.update({
        where: { id: formId },
        data: { 
          currentVersionId: version.id,
          updatedAt: new Date()
        }
      });
      
      return version;
    });
    
    return {
      version: newVersion,
      changesCount: changes.length
    };
    */
    
    // Por ahora, retornamos un mock
    return {
      version: {
        id: 'mock-version-id',
        formId,
        versionNumber: newVersionNumber,
        formData,
        createdAt: new Date(),
        createdByUserId: userId,
        comment,
        isMajorVersion: false,
        previousVersionId: previousVersion?.id
      },
      changesCount: changes.length
    };
  }
  
  /**
   * Obtiene la versión más reciente de un formulario
   */
  async getLatestVersion(formId: string): Promise<FormVersion | null> {
    // EJEMPLO CON PRISMA
    /*
    return await prisma.evolucionVersion.findFirst({
      where: { formId },
      orderBy: { versionNumber: 'desc' }
    });
    */
    
    // Mock
    return null;
  }
  
  /**
   * Obtiene el historial completo de versiones de un formulario
   */
  async getVersionHistory(formId: string): Promise<VersionMetadata[]> {
    // EJEMPLO CON PRISMA
    /*
    const versions = await prisma.evolucionVersion.findMany({
      where: { formId },
      include: {
        _count: {
          select: { changes: true }
        },
        createdBy: {
          select: { nombreCompleto: true }
        }
      },
      orderBy: { versionNumber: 'desc' }
    });
    
    return versions.map(v => ({
      versionNumber: v.versionNumber,
      createdAt: v.createdAt,
      createdBy: v.createdBy.nombreCompleto,
      comment: v.comment || undefined,
      changesCount: v._count.changes
    }));
    */
    
    // Mock
    return [];
  }
  
  /**
   * Obtiene los cambios específicos de una versión
   */
  async getVersionChanges(versionId: string): Promise<Change[]> {
    // EJEMPLO CON PRISMA
    /*
    const changes = await prisma.evolucionChange.findMany({
      where: { versionId },
      orderBy: [
        { pageNumber: 'asc' },
        { fieldName: 'asc' }
      ]
    });
    
    return changes.map(c => ({
      fieldName: c.fieldName,
      fieldLabel: c.fieldLabel || c.fieldName,
      oldValue: c.oldValue,
      newValue: c.newValue,
      changeType: c.changeType as 'added' | 'modified' | 'deleted',
      pageNumber: c.pageNumber || 0,
      packageName: c.packageName || 'Unknown'
    }));
    */
    
    // Mock
    return [];
  }
  
  /**
   * Compara dos versiones específicas
   */
  async compareVersions(
    versionAId: string,
    versionBId: string
  ): Promise<Change[]> {
    // EJEMPLO CON PRISMA
    /*
    const [versionA, versionB] = await Promise.all([
      prisma.evolucionVersion.findUnique({ where: { id: versionAId } }),
      prisma.evolucionVersion.findUnique({ where: { id: versionBId } })
    ]);
    
    if (!versionA || !versionB) {
      throw new Error('Una o ambas versiones no existen');
    }
    
    return calculateChanges(versionA.formData as FormData, versionB.formData as FormData);
    */
    
    // Mock
    return [];
  }
  
  /**
   * Restaura una versión anterior (crea nueva versión con datos antiguos)
   */
  async restoreVersion(
    versionIdToRestore: string,
    userId: string,
    comment?: string
  ): Promise<{ version: FormVersion; changesCount: number }> {
    // EJEMPLO CON PRISMA
    /*
    const versionToRestore = await prisma.evolucionVersion.findUnique({
      where: { id: versionIdToRestore }
    });
    
    if (!versionToRestore) {
      throw new Error('Versión a restaurar no encontrada');
    }
    
    const defaultComment = comment || `Restauración a versión ${versionToRestore.versionNumber}`;
    
    return this.createVersion(
      versionToRestore.formId,
      versionToRestore.formData as FormData,
      userId,
      defaultComment
    );
    */
    
    // Mock
    return {
      version: {
        id: 'mock-restored-version',
        formId: 'mock-form-id',
        versionNumber: 1,
        formData: {},
        createdAt: new Date(),
        createdByUserId: userId,
        comment,
        isMajorVersion: false
      },
      changesCount: 0
    };
  }
}

// ================================================================
// EXPORTAR INSTANCIA (Singleton)
// ================================================================

export const versionService = new VersionService();

// ================================================================
// UTILIDADES
// ================================================================

/**
 * Genera un resumen legible de los cambios
 */
export function generateChangesSummary(changes: Change[]): string {
  const added = changes.filter(c => c.changeType === 'added').length;
  const modified = changes.filter(c => c.changeType === 'modified').length;
  const deleted = changes.filter(c => c.changeType === 'deleted').length;
  
  const parts: string[] = [];
  if (added > 0) parts.push(`${added} campo(s) agregado(s)`);
  if (modified > 0) parts.push(`${modified} campo(s) modificado(s)`);
  if (deleted > 0) parts.push(`${deleted} campo(s) eliminado(s)`);
  
  return parts.join(', ') || 'Sin cambios';
}

/**
 * Agrupa cambios por página
 */
export function groupChangesByPage(changes: Change[]): Map<number, Change[]> {
  const grouped = new Map<number, Change[]>();
  
  changes.forEach(change => {
    const pageChanges = grouped.get(change.pageNumber) || [];
    pageChanges.push(change);
    grouped.set(change.pageNumber, pageChanges);
  });
  
  return grouped;
}

/**
 * Agrupa cambios por tipo
 */
export function groupChangesByType(changes: Change[]): {
  added: Change[];
  modified: Change[];
  deleted: Change[];
} {
  return {
    added: changes.filter(c => c.changeType === 'added'),
    modified: changes.filter(c => c.changeType === 'modified'),
    deleted: changes.filter(c => c.changeType === 'deleted')
  };
}



