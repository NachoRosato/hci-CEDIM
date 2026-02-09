import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import TipoProtocolo from '@/lib/mongodb/models/TipoProtocolo';
import { verifyAuth, unauthorizedResponse } from '@/lib/mongodb/authMiddleware';

/**
 * GET /api/tipos-protocolo
 * Lista tipos de protocolo. Soporta filtro por ?protocoloId=xxx&activo=true
 */
export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const protocoloId = searchParams.get('protocoloId');
    const activoParam = searchParams.get('activo');

    const filter: Record<string, unknown> = {};
    if (protocoloId) filter.protocoloId = protocoloId;
    if (activoParam !== null) filter.activo = activoParam === 'true';

    const tipos = await TipoProtocolo.find(filter)
      .populate('protocoloId', 'nombre')
      .sort({ createdAt: -1 });

    return Response.json(tipos);
  } catch (error: unknown) {
    console.error('Error GET /api/tipos-protocolo:', error);
    return Response.json(
      { error: { errorMessage: 'Error al obtener tipos de protocolo' } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tipos-protocolo
 * Crea un nuevo tipo de protocolo.
 */
export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();

    const body = await request.json();
    const { protocoloId, nombre, descripcion } = body;

    if (!protocoloId) {
      return Response.json(
        { error: { errorMessage: 'El protocoloId es obligatorio' } },
        { status: 400 }
      );
    }

    if (!nombre || !nombre.trim()) {
      return Response.json(
        { error: { errorMessage: 'El nombre del tipo es obligatorio' } },
        { status: 400 }
      );
    }

    const tipo = await TipoProtocolo.create({
      protocoloId,
      nombre: nombre.trim(),
      descripcion: descripcion?.trim() || '',
    });

    return Response.json(tipo, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && (error as Record<string, unknown>).code === 11000) {
      return Response.json(
        { error: { errorMessage: 'Ya existe un tipo con ese nombre para este protocolo' } },
        { status: 409 }
      );
    }
    console.error('Error POST /api/tipos-protocolo:', error);
    return Response.json(
      { error: { errorMessage: 'Error al crear tipo de protocolo' } },
      { status: 500 }
    );
  }
}
