import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  genre?: string;
  description?: string;
  members?: string[];
  image?: string;
  vkLink?: string;
  tgLink?: string;
  socialLinks?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    members: [{
      type: String,
      trim: true,
    }],
    image: {
      type: String,
    },
    vkLink: {
      type: String,
      trim: true,
    },
    tgLink: {
      type: String,
      trim: true,
    },
    socialLinks: {
      website: String,
      instagram: String,
      facebook: String,
      youtube: String,
    },
  },
  {
    timestamps: true,
  }
);

GroupSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model<IGroup>('Group', GroupSchema);


