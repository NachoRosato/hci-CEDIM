import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import TipoProtocolo from '@/lib/mongodb/models/TipoProtocolo';
import { verifyAuth, unauthorizedResponse } from '@/lib/mongodb/authMiddleware';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/tipos-protocolo/[id]
 * Edita un tipo de protocolo existente.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const tipo = await TipoProtocolo.findByIdAndUpdate(
      id,
      {
        ...(body.nombre !== undefined && { nombre: body.nombre.trim() }),
        ...(body.descripcion !== undefined && { descripcion: body.descripcion.trim() }),
        ...(body.activo !== undefined && { activo: body.activo }),
        ...(body.protocoloId !== undefined && { protocoloId: body.protocoloId }),
      },
      { new: true, runValidators: true }
    );

    if (!tipo) {
      return Response.json(
        { error: { errorMessage: 'Tipo de protocolo no encontrado' } },
        { status: 404 }
      );
    }

    return Response.json(tipo);
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && (error as Record<string, unknown>).code === 11000) {
      return Response.json(
        { error: { errorMessage: 'Ya existe un tipo con ese nombre para este protocolo' } },
        { status: 409 }
      );
    }
    console.error('Error PUT /api/tipos-protocolo/[id]:', error);
    return Response.json(
      { error: { errorMessage: 'Error al actualizar tipo de protocolo' } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tipos-protocolo/[id]
 * Elimina un tipo de protocolo (soft delete).
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();
    const { id } = await params;

    const tipo = await TipoProtocolo.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true }
    );

    if (!tipo) {
      return Response.json(
        { error: { errorMessage: 'Tipo de protocolo no encontrado' } },
        { status: 404 }
      );
    }

    return Response.json({ message: 'Tipo de protocolo desactivado', tipo });
  } catch (error: unknown) {
    console.error('Error DELETE /api/tipos-protocolo/[id]:', error);
    return Response.json(
      { error: { errorMessage: 'Error al eliminar tipo de protocolo' } },
      { status: 500 }
    );
  }
}
