import mongoose, { Schema, Document } from 'mongoose';

export interface IPoster extends Document {
  title: string;
  image: string;
  description?: string;
  eventDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PosterSchema = new Schema<IPoster>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    eventDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

PosterSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model<IPoster>('Poster', PosterSchema);


