import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ITipoProtocolo extends Document {
  protocoloId: Types.ObjectId;
  nombre: string;
  descripcion: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TipoProtocoloSchema = new Schema<ITipoProtocolo>(
  {
    protocoloId: {
      type: Schema.Types.ObjectId,
      ref: 'Protocolo',
      required: [true, 'El protocoloId es obligatorio'],
    },
    nombre: {
      type: String,
      required: [true, 'El nombre del tipo de protocolo es obligatorio'],
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

// Un protocolo no puede tener dos tipos con el mismo nombre
TipoProtocoloSchema.index({ protocoloId: 1, nombre: 1 }, { unique: true });

const TipoProtocolo: Model<ITipoProtocolo> =
  mongoose.models.TipoProtocolo ||
  mongoose.model<ITipoProtocolo>('TipoProtocolo', TipoProtocoloSchema);

export default TipoProtocolo;
