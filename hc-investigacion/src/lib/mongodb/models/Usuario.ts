import mongoose, { Schema, Document, Model } from 'mongoose';
import * as bcryptModule from 'bcryptjs';
// bcryptjs 3.x puede no tener default export; usar fallback
const bcrypt = (bcryptModule as { default?: typeof bcryptModule }).default || bcryptModule;

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  rol: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UsuarioSchema = new Schema<IUsuario>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: 3,
    },
    rol: {
      type: String,
      enum: ['admin', 'usuario'],
      default: 'admin',
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash de password antes de guardar (Mongoose 9.x: sin callback next)
UsuarioSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar password
UsuarioSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Excluir password del JSON
UsuarioSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const obj = ret as Record<string, unknown>;
    const { password: _, ...rest } = obj;
    return rest;
  },
});

const Usuario: Model<IUsuario> =
  mongoose.models.Usuario || mongoose.model<IUsuario>('Usuario', UsuarioSchema);

export default Usuario;
