import { NextRequest } from 'next/server';
import { verifyAuth, unauthorizedResponse } from '@/lib/mongodb/authMiddleware';

/**
 * GET /api/ping
 * Verifica que el token JWT es válido.
 * Usado por AuthGuard del frontend.
 */
export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth) {
    return unauthorizedResponse('Token inválido o expirado');
  }

  return Response.json({ ok: true, user: auth });
}

/**
 * POST /api/ping
 * Mismo comportamiento que GET, por compatibilidad.
 */
export async function POST(request: NextRequest) {
  return GET(request);
}
