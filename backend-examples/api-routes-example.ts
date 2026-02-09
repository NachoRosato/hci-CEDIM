/**
 * Ejemplos de API Routes para manejo de versiones
 * 
 * Framework: Next.js App Router (ajustar según tu framework)
 */

import { NextRequest, NextResponse } from 'next/server';
import { versionService, generateChangesSummary } from './versionService';
import type { FormData } from '@/components/forms/types';

// ================================================================
// POST /api/forms/[formId]/versions
// Crear una nueva versión del formulario
// ================================================================

export async function POST_createVersion(
  request: NextRequest,
  { params }: { params: { formId: string } }
) {
  try {
    const { formData, userId, comment } = await request.json();
    
    // Validación básica
    if (!formData || !userId) {
      return NextResponse.json(
        { error: 'formData y userId son requeridos' },
        { status: 400 }
      );
    }
    
    // Crear versión
    const result = await versionService.createVersion(
      params.formId,
      formData as FormData,
      userId,
      comment
    );
    
    const summary = generateChangesSummary(
      await versionService.getVersionChanges(result.version.id)
    );
    
    return NextResponse.json({
      success: true,
      version: result.version,
      changesCount: result.changesCount,
      summary
    });
    
  } catch (error) {
    console.error('Error al crear versión:', error);
    return NextResponse.json(
      { error: 'Error al crear versión del formulario' },
      { status: 500 }
    );
  }
}

// ================================================================
// GET /api/forms/[formId]/versions
// Obtener historial de versiones
// ================================================================

export async function GET_versionHistory(
  request: NextRequest,
  { params }: { params: { formId: string } }
) {
  try {
    const versions = await versionService.getVersionHistory(params.formId);
    
    return NextResponse.json({
      success: true,
      versions,
      total: versions.length
    });
    
  } catch (error) {
    console.error('Error al obtener historial:', error);
    return NextResponse.json(
      { error: 'Error al obtener historial de versiones' },
      { status: 500 }
    );
  }
}

// ================================================================
// GET /api/forms/[formId]/versions/[versionId]
// Obtener una versión específica
// ================================================================

export async function GET_versionById(
  request: NextRequest,
  { params }: { params: { formId: string; versionId: string } }
) {
  try {
    // Aquí usarías tu cliente de BD
    // const version = await prisma.evolucionVersion.findUnique({
    //   where: { id: params.versionId },
    //   include: {
    //     createdBy: { select: { nombreCompleto: true, rol: true } }
    //   }
    // });
    
    const version = null; // Mock
    
    if (!version) {
      return NextResponse.json(
        { error: 'Versión no encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      version
    });
    
  } catch (error) {
    console.error('Error al obtener versión:', error);
    return NextResponse.json(
      { error: 'Error al obtener versión' },
      { status: 500 }
    );
  }
}

// ================================================================
// GET /api/forms/[formId]/versions/[versionId]/changes
// Obtener cambios de una versión específica
// ================================================================

export async function GET_versionChanges(
  request: NextRequest,
  { params }: { params: { formId: string; versionId: string } }
) {
  try {
    const changes = await versionService.getVersionChanges(params.versionId);
    
    return NextResponse.json({
      success: true,
      changes,
      total: changes.length,
      summary: generateChangesSummary(changes)
    });
    
  } catch (error) {
    console.error('Error al obtener cambios:', error);
    return NextResponse.json(
      { error: 'Error al obtener cambios' },
      { status: 500 }
    );
  }
}

// ================================================================
// GET /api/forms/[formId]/versions/compare
// Comparar dos versiones
// Query params: ?versionA=uuid&versionB=uuid
// ================================================================

export async function GET_compareVersions(
  request: NextRequest,
  { params }: { params: { formId: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const versionAId = searchParams.get('versionA');
    const versionBId = searchParams.get('versionB');
    
    if (!versionAId || !versionBId) {
      return NextResponse.json(
        { error: 'Se requieren los parámetros versionA y versionB' },
        { status: 400 }
      );
    }
    
    const changes = await versionService.compareVersions(versionAId, versionBId);
    
    return NextResponse.json({
      success: true,
      changes,
      total: changes.length,
      summary: generateChangesSummary(changes)
    });
    
  } catch (error) {
    console.error('Error al comparar versiones:', error);
    return NextResponse.json(
      { error: 'Error al comparar versiones' },
      { status: 500 }
    );
  }
}

// ================================================================
// POST /api/forms/[formId]/versions/[versionId]/restore
// Restaurar una versión anterior
// ================================================================

export async function POST_restoreVersion(
  request: NextRequest,
  { params }: { params: { formId: string; versionId: string } }
) {
  try {
    const { userId, comment } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'userId es requerido' },
        { status: 400 }
      );
    }
    
    const result = await versionService.restoreVersion(
      params.versionId,
      userId,
      comment
    );
    
    return NextResponse.json({
      success: true,
      message: 'Versión restaurada exitosamente',
      version: result.version,
      changesCount: result.changesCount
    });
    
  } catch (error) {
    console.error('Error al restaurar versión:', error);
    return NextResponse.json(
      { error: 'Error al restaurar versión' },
      { status: 500 }
    );
  }
}

// ================================================================
// EJEMPLO DE USO DESDE EL CLIENTE (Frontend)
// ================================================================

/*

// 1. Guardar una nueva versión
async function saveFormVersion(formId: string, formData: FormData, userId: string) {
  const response = await fetch(`/api/forms/${formId}/versions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formData,
      userId,
      comment: 'Actualización de datos médicos'
    })
  });
  
  const result = await response.json();
  console.log('Versión guardada:', result);
  return result;
}

// 2. Obtener historial de versiones
async function getVersionHistory(formId: string) {
  const response = await fetch(`/api/forms/${formId}/versions`);
  const result = await response.json();
  return result.versions;
}

// 3. Comparar dos versiones
async function compareVersions(formId: string, versionAId: string, versionBId: string) {
  const response = await fetch(
    `/api/forms/${formId}/versions/compare?versionA=${versionAId}&versionB=${versionBId}`
  );
  const result = await response.json();
  return result.changes;
}

// 4. Restaurar versión anterior
async function restoreVersion(formId: string, versionId: string, userId: string) {
  const response = await fetch(`/api/forms/${formId}/versions/${versionId}/restore`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      comment: 'Restauración de versión anterior'
    })
  });
  
  const result = await response.json();
  return result;
}

*/



