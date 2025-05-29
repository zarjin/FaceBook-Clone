import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  user: string;
  text: string;
  image: string;
  likes: string[];
  comments: string[];
}

const PostSchema = new Schema<IPost>({
  user: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
});

const postModels = mongoose.model<IPost>('Post', PostSchema);

export default postModels;
