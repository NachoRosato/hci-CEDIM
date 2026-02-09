import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import FormularioDinamico from '@/lib/mongodb/models/FormularioDinamico';
import { verifyAuth, unauthorizedResponse } from '@/lib/mongodb/authMiddleware';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/formulario-dinamico/[id]
 * Actualiza una configuración existente.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const config = await FormularioDinamico.findByIdAndUpdate(
      id,
      {
        ...(body.campos !== undefined && { campos: body.campos }),
        ...(body.protocoloId !== undefined && { protocoloId: body.protocoloId }),
        ...(body.tipoProtocoloId !== undefined && { tipoProtocoloId: body.tipoProtocoloId }),
      },
      { new: true, runValidators: true }
    );

    if (!config) {
      return Response.json(
        { error: { errorMessage: 'Configuración no encontrada' } },
        { status: 404 }
      );
    }

    return Response.json(config);
  } catch (error: unknown) {
    console.error('Error PUT /api/formulario-dinamico/[id]:', error);
    return Response.json(
      { error: { errorMessage: 'Error al actualizar configuración' } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/formulario-dinamico/[id]
 * Elimina una configuración (hard delete).
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();
    const { id } = await params;

    const config = await FormularioDinamico.findByIdAndDelete(id);

    if (!config) {
      return Response.json(
        { error: { errorMessage: 'Configuración no encontrada' } },
        { status: 404 }
      );
    }

    return Response.json({ message: 'Configuración eliminada' });
  } catch (error: unknown) {
    console.error('Error DELETE /api/formulario-dinamico/[id]:', error);
    return Response.json(
      { error: { errorMessage: 'Error al eliminar configuración' } },
      { status: 500 }
    );
  }
}
