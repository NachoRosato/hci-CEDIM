import { connectDB } from '@/lib/mongodb/connection';
import Usuario from '@/lib/mongodb/models/Usuario';

/**
 * POST /api/seed
 * Crea el usuario administrador inicial.
 * Solo funciona si no existe ningún usuario en la BD.
 */
export async function POST() {
  try {
    await connectDB();

    // Verificar si ya existe algún usuario
    const existingCount = await Usuario.countDocuments();
    if (existingCount > 0) {
      return Response.json(
        { message: 'Ya existen usuarios en la base de datos. Seed no ejecutado.' },
        { status: 409 }
      );
    }

    const seedUser = process.env.SEED_USER || 'admin';
    const seedPassword = process.env.SEED_PASSWORD || 'Cedim2025!';
    const seedEmail = process.env.SEED_EMAIL || 'admin@cedim.com';

    const user = await Usuario.create({
      nombre: seedUser,
      email: seedEmail,
      password: seedPassword,
      rol: 'admin',
      activo: true,
    });

    return Response.json({
      message: 'Usuario administrador creado exitosamente',
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error: unknown) {
    console.error('Error en /api/seed:', error);
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    return Response.json(
      { error: { errorMessage: msg, stack } },
      { status: 500 }
    );
  }
}
