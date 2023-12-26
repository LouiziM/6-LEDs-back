import * as mongoose from 'mongoose';

export const TrafficSchema = new mongoose.Schema({
  id: { type: String, required: true },
  long: { type: Number, required: true },
  lat: { type: Number, required: true },
  color: { type: String, required: false },
});

export interface Traffic extends mongoose.Document {
  id: string;
  long: number;
  lat: number;
  color: string;
}
