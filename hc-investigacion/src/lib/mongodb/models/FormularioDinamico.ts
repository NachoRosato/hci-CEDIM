import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ICampoConfig {
  fieldId: string;
  included: boolean;
  required: boolean;
}

export interface IFormularioDinamico extends Document {
  protocoloId: Types.ObjectId;
  tipoProtocoloId: Types.ObjectId;
  campos: ICampoConfig[];
  createdAt: Date;
  updatedAt: Date;
}

const CampoConfigSchema = new Schema<ICampoConfig>(
  {
    fieldId: {
      type: String,
      required: true,
    },
    included: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const FormularioDinamicoSchema = new Schema<IFormularioDinamico>(
  {
    protocoloId: {
      type: Schema.Types.ObjectId,
      ref: 'Protocolo',
      required: [true, 'El protocoloId es obligatorio'],
    },
    tipoProtocoloId: {
      type: Schema.Types.ObjectId,
      ref: 'TipoProtocolo',
      required: [true, 'El tipoProtocoloId es obligatorio'],
    },
    campos: {
      type: [CampoConfigSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Una sola configuración por combinación protocolo + tipo
FormularioDinamicoSchema.index({ protocoloId: 1, tipoProtocoloId: 1 }, { unique: true });

const FormularioDinamico: Model<IFormularioDinamico> =
  mongoose.models.FormularioDinamico ||
  mongoose.model<IFormularioDinamico>('FormularioDinamico', FormularioDinamicoSchema);

export default FormularioDinamico;
