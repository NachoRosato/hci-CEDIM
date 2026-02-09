import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProtocolo extends Document {
  nombre: string;
  descripcion: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProtocoloSchema = new Schema<IProtocolo>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del protocolo es obligatorio'],
      unique: true,
      trim: true,
    },
    descripcion: {
      type: String,
      default: '',
      trim: true,
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

// Evitar recompilar el modelo en hot-reload de desarrollo
const Protocolo: Model<IProtocolo> =
  mongoose.models.Protocolo || mongoose.model<IProtocolo>('Protocolo', ProtocoloSchema);

export default Protocolo;
