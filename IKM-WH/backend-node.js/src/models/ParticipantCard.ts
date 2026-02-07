import mongoose, { Schema, Document } from 'mongoose';

export interface IParticipantCardFile {
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  compressedSize: number;
  compressionRatio: number;
  uploadedAt: Date;
}

export interface IParticipantCardSettings {
  price: number;
  setsAvailable: number;
  isActive: boolean;
}

export interface IParticipantCard extends Document {
  festivalId: mongoose.Types.ObjectId;
  groupName: string;
  eventId: mongoose.Types.ObjectId;
  cards: IParticipantCardFile[];
  settings: IParticipantCardSettings;
  createdAt: Date;
  updatedAt: Date;
}

const participantCardFileSchema = new Schema<IParticipantCardFile>({
  originalName: { type: String, required: true },
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  compressedSize: { type: Number, required: true },
  compressionRatio: { type: Number, required: true },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const participantCardSettingsSchema = new Schema<IParticipantCardSettings>({
  price: {
    type: Number,
    default: 100
  },
  setsAvailable: {
    type: Number,
    default: 10
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const participantCardSchema = new Schema<IParticipantCard>({
  festivalId: {
    type: Schema.Types.ObjectId,
    ref: 'Festival',
    required: true
  },
  groupName: {
    type: String,
    required: true
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  cards: [participantCardFileSchema],
  settings: {
    type: participantCardSettingsSchema,
    default: () => ({})
  }
}, {
  timestamps: true
});

// Индексы для быстрого поиска
participantCardSchema.index({ festivalId: 1, groupName: 1, eventId: 1 }, { unique: true });
participantCardSchema.index({ festivalId: 1 });

export default mongoose.model<IParticipantCard>('ParticipantCard', participantCardSchema);