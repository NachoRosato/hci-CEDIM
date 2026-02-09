import mongoose from 'mongoose';

/**
 * Singleton de conexión a MongoDB optimizado para entornos serverless (Vercel).
 * Usa cache en `global` para evitar múltiples conexiones en hot-reloads de desarrollo.
 */

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('La variable de entorno MONGODB_URI no está definida. Verificar .env.local');
}

/**
 * Cache global para la conexión de Mongoose.
 * En desarrollo, Next.js limpia el módulo cache en cada hot-reload,
 * lo que crearía nuevas conexiones. Usando global evitamos eso.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Conecta a MongoDB y retorna la instancia de Mongoose.
 * Reutiliza la conexión existente si ya hay una activa.
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
