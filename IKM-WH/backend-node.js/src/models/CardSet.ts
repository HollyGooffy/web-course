import mongoose, { Schema, Document } from 'mongoose';

export interface ICardSet extends Document {
  title: string;
  festivalId: mongoose.Types.ObjectId;
  cardsInSet: number;
  setsAvailable: number;
  price: number;
  image?: string;
  cards?: Array<{
    name: string;
    image?: string;
    description?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const CardSetSchema = new Schema<ICardSet>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    festivalId: {
      type: Schema.Types.ObjectId,
      ref: 'Festival',
      required: true,
    },
    cardsInSet: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    setsAvailable: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
    },
    cards: [{
      name: {
        type: String,
        required: true,
      },
      image: String,
      description: String,
    }],
  },
  {
    timestamps: true,
  }
);

CardSetSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model<ICardSet>('CardSet', CardSetSchema);


