import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import Protocolo from '@/lib/mongodb/models/Protocolo';
import { verifyAuth, unauthorizedResponse } from '@/lib/mongodb/authMiddleware';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/protocolos/[id]
 * Edita un protocolo existente.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const protocolo = await Protocolo.findByIdAndUpdate(
      id,
      {
        ...(body.nombre !== undefined && { nombre: body.nombre.trim() }),
        ...(body.descripcion !== undefined && { descripcion: body.descripcion.trim() }),
        ...(body.activo !== undefined && { activo: body.activo }),
      },
      { new: true, runValidators: true }
    );

    if (!protocolo) {
      return Response.json(
        { error: { errorMessage: 'Protocolo no encontrado' } },
        { status: 404 }
      );
    }

    return Response.json(protocolo);
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && (error as Record<string, unknown>).code === 11000) {
      return Response.json(
        { error: { errorMessage: 'Ya existe un protocolo con ese nombre' } },
        { status: 409 }
      );
    }
    console.error('Error PUT /api/protocolos/[id]:', error);
    return Response.json(
      { error: { errorMessage: 'Error al actualizar protocolo' } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/protocolos/[id]
 * Elimina un protocolo (soft delete: activo = false).
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();
    const { id } = await params;

    const protocolo = await Protocolo.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true }
    );

    if (!protocolo) {
      return Response.json(
        { error: { errorMessage: 'Protocolo no encontrado' } },
        { status: 404 }
      );
    }

    return Response.json({ message: 'Protocolo desactivado', protocolo });
  } catch (error: unknown) {
    console.error('Error DELETE /api/protocolos/[id]:', error);
    return Response.json(
      { error: { errorMessage: 'Error al eliminar protocolo' } },
      { status: 500 }
    );
  }
}
