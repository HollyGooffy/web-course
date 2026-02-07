import mongoose, { Schema, Document } from 'mongoose';
import { ApplicationStatus } from '../types';

export interface IFestivalApplication extends Document {
  groupName: string;
  artistName?: string;
  bandName?: string;
  contactTelegram: string;
  contactPhone: string;
  description?: string;
  socialLinks?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  genre?: string;
  members?: string[];
  status: ApplicationStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FestivalApplicationSchema = new Schema<IFestivalApplication>(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
    artistName: {
      type: String,
      trim: true,
    },
    bandName: {
      type: String,
      trim: true,
    },
    contactTelegram: {
      type: String,
      required: true,
      trim: true,
    },
    contactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    socialLinks: {
      website: String,
      instagram: String,
      facebook: String,
      youtube: String,
    },
    genre: {
      type: String,
      trim: true,
    },
    members: [{
      type: String,
      trim: true,
    }],
    status: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.PENDING,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: {
      type: Date,
    },
    reviewedBy: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

FestivalApplicationSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model<IFestivalApplication>('FestivalApplication', FestivalApplicationSchema);


