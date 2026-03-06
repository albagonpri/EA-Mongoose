import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  organization: Types.ObjectId | string;
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  }
});

export const ProjectModel = mongoose.model<IProject>('Project', projectSchema);