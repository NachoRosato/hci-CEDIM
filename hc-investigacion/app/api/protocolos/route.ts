import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import Protocolo from '@/lib/mongodb/models/Protocolo';
import { verifyAuth, unauthorizedResponse } from '@/lib/mongodb/authMiddleware';

/**
 * GET /api/protocolos
 * Lista todos los protocolos. Soporta filtro por ?activo=true/false
 */
export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const activoParam = searchParams.get('activo');

    const filter: Record<string, unknown> = {};
    if (activoParam !== null) {
      filter.activo = activoParam === 'true';
    }

    const protocolos = await Protocolo.find(filter).sort({ createdAt: -1 });
    return Response.json(protocolos);
  } catch (error: unknown) {
    console.error('Error GET /api/protocolos:', error);
    return Response.json(
      { error: { errorMessage: 'Error al obtener protocolos' } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/protocolos
 * Crea un nuevo protocolo.
 */
export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth) return unauthorizedResponse();

  try {
    await connectDB();

    const body = await request.json();
    const { nombre, descripcion } = body;

    if (!nombre || !nombre.trim()) {
      return Response.json(
        { error: { errorMessage: 'El nombre del protocolo es obligatorio' } },
        { status: 400 }
      );
    }

    const protocolo = await Protocolo.create({
      nombre: nombre.trim(),
      descripcion: descripcion?.trim() || '',
    });

    return Response.json(protocolo, { status: 201 });
  } catch (error: unknown) {
    // Duplicate key
    if (error instanceof Error && 'code' in error && (error as Record<string, unknown>).code === 11000) {
      return Response.json(
        { error: { errorMessage: 'Ya existe un protocolo con ese nombre' } },
        { status: 409 }
      );
    }
    console.error('Error POST /api/protocolos:', error);
    return Response.json(
      { error: { errorMessage: 'Error al crear protocolo' } },
      { status: 500 }
    );
  }
}
