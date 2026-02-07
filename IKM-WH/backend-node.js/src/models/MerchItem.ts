import mongoose, { Schema, Document } from 'mongoose';

export interface IMerchItem extends Document {
  title: string;
  description?: string;
  price: number;
  image?: string;
  stock: number;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MerchItemSchema = new Schema<IMerchItem>(
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
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    category: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

MerchItemSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model<IMerchItem>('MerchItem', MerchItemSchema);


