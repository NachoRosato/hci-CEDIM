import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import FormularioDinamico from '@/lib/mongodb/models/FormularioDinamico';
import { verifyAuth, unauthorizedResponse } from '@/lib/mongodb/authMiddleware';

/**
 * GET /api/formulario-dinamico
 * Obtiene configuración de formulario dinámico.
 * Filtros: ?protocoloId=xxx&tipoProtocoloId=yyy
 */
export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const protocoloId = searchParams.get('protocoloId');
    const tipoProtocoloId = searchParams.get('tipoProtocoloId');

    const filter: Record<string, unknown> = {};
    if (protocoloId) filter.protocoloId = protocoloId;
    if (tipoProtocoloId) filter.tipoProtocoloId = tipoProtocoloId;

    const configs = await FormularioDinamico.find(filter)
      .populate('protocoloId', 'nombre')
      .populate('tipoProtocoloId', 'nombre')
      .sort({ createdAt: -1 });

    return Response.json(configs);
  } catch (error: unknown) {
    console.error('Error GET /api/formulario-dinamico:', error);
    return Response.json(
      { error: { errorMessage: 'Error al obtener configuraciones' } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/formulario-dinamico
 * Crea o actualiza la configuración de campos para un protocolo+tipo.
 * Usa upsert: si ya existe para esa combinación, la actualiza.
 */
export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();

    const body = await request.json();
    const { protocoloId, tipoProtocoloId, campos } = body;

    if (!protocoloId || !tipoProtocoloId) {
      return Response.json(
        { error: { errorMessage: 'protocoloId y tipoProtocoloId son obligatorios' } },
        { status: 400 }
      );
    }

    if (!Array.isArray(campos)) {
      return Response.json(
        { error: { errorMessage: 'campos debe ser un array' } },
        { status: 400 }
      );
    }

    // Upsert: crear o actualizar
    const config = await FormularioDinamico.findOneAndUpdate(
      { protocoloId, tipoProtocoloId },
      { protocoloId, tipoProtocoloId, campos },
      { new: true, upsert: true, runValidators: true }
    );

    return Response.json(config, { status: 201 });
  } catch (error: unknown) {
    console.error('Error POST /api/formulario-dinamico:', error);
    return Response.json(
      { error: { errorMessage: 'Error al guardar configuración' } },
      { status: 500 }
    );
  }
}
