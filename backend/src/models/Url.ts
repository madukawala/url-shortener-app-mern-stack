import mongoose, { Document, Schema } from 'mongoose';

export interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clickCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const UrlSchema: Schema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  shortUrl: {
    type: String,
    required: true,
    trim: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

UrlSchema.index({ shortCode: 1 });
UrlSchema.index({ createdAt: -1 });

export default mongoose.model<IUrl>('Url', UrlSchema);