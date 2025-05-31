import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  text: string;
  image: string;
  likes: mongoose.Types.ObjectId[];
  comments: string[];
}

const PostSchema = new Schema<IPost>({
  user: { type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  image: { type: String },
  likes: { type: [String], ref: 'User', default: [] },
  comments: { type: [String], default: [] },
});

const postModels = mongoose.model<IPost>('Post', PostSchema);

export default postModels;
