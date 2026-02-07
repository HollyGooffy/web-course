import mongoose, { Schema, Document } from 'mongoose';
import { EventStatus } from '../types';

export interface IEvent extends Document {
  title: string;
  description?: string;
  date: Date;
  time: string;
  venue: string;
  address: string;
  performers: string[];
  image?: string;
  status: EventStatus;
  groupId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    performers: [{
      type: String,
      trim: true,
    }],
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(EventStatus),
      default: EventStatus.UPCOMING,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
  },
  {
    timestamps: true,
  }
);

EventSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model<IEvent>('Event', EventSchema);


