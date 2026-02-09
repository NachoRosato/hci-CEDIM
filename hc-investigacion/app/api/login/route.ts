import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import Usuario from '@/lib/mongodb/models/Usuario';
import { generateToken } from '@/lib/mongodb/authMiddleware';

/**
 * POST /api/login
 * Compatible con el flujo de login existente del frontend.
 * Acepta { usuario, clave } o { email, password }
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Soportar ambos formatos: { usuario, clave } (frontend actual) y { email, password }
    const email = body.email || body.usuario;
    const password = body.password || body.clave;

    if (!email || !password) {
      return Response.json(
        { error: { errorMessage: 'Usuario y clave son obligatorios' } },
        { status: 400 }
      );
    }

    // Buscar usuario por email o nombre (para compatibilidad con el login actual que usa "usuario")
    const user = await Usuario.findOne({
      $or: [
        { email: email.toLowerCase() },
        { nombre: { $regex: new RegExp(`^${email}$`, 'i') } },
      ],
      activo: true,
    });

    if (!user) {
      return Response.json(
        { error: { errorMessage: 'Credenciales inválidas' } },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return Response.json(
        { error: { errorMessage: 'Credenciales inválidas' } },
        { status: 401 }
      );
    }

    const token = generateToken(user);

    // Formato compatible con el frontend actual: { value: { token } }
    return Response.json({
      value: {
        token,
        user: {
          id: user._id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
        },
      },
    });
  } catch (error: unknown) {
    console.error('Error en /api/login:', error);
    return Response.json(
      { error: { errorMessage: 'Error interno del servidor' } },
      { status: 500 }
    );
  }
}
