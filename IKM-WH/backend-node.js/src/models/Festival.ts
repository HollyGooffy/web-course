import mongoose, { Schema, Document } from 'mongoose';

export interface IFestival extends Document {
  name: string;
  date: Date;
  venue: string;
  description?: string;
  image?: string;
  time?: string;
  address?: string;
  performers?: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const FestivalSchema = new Schema<IFestival>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    time: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    performers: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
  },
  {
    timestamps: true,
  }
);

FestivalSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model<IFestival>('Festival', FestivalSchema);