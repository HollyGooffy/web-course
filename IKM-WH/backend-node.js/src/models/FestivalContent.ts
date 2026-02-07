import mongoose, { Schema, Document } from 'mongoose';
import { ContentType } from '../types';

export interface IFestivalContent extends Document {
  type: ContentType;
  key: string;
  value: string | string[] | Record<string, any>;
  updatedAt: Date;
}

const FestivalContentSchema = new Schema<IFestivalContent>(
  {
    type: {
      type: String,
      enum: Object.values(ContentType),
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

FestivalContentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model<IFestivalContent>('FestivalContent', FestivalContentSchema);


