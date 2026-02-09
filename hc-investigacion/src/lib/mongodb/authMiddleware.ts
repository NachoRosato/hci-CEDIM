import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from './connection';
import Usuario, { IUsuario } from './models/Usuario';

const JWT_SECRET = process.env.JWT_SECRET || 'hci-cedim-fallback-secret';

export interface AuthPayload {
  userId: string;
  email: string;
  rol: string;
}

/**
 * Genera un token JWT para el usuario dado.
 */
export function generateToken(user: IUsuario): string {
  const payload: AuthPayload = {
    userId: user._id.toString(),
    email: user.email,
    rol: user.rol,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

/**
 * Verifica el token JWT del header Authorization.
 * Retorna el payload decodificado o null si es inválido.
 */
export async function verifyAuth(request: NextRequest): Promise<AuthPayload | null> {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

    // Verificar que el usuario sigue activo en la BD
    await connectDB();
    const user = await Usuario.findById(decoded.userId).select('activo');
    if (!user || !user.activo) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

/**
 * Helper para respuestas 401
 */
export function unauthorizedResponse(message = 'No autorizado') {
  return Response.json({ error: { errorMessage: message } }, { status: 401 });
}
