import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  cover: string;
  bio: string;
  location: string;
  work: string;
  education: string;
  yourPosts: string[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  cover: { type: String },
  bio: { type: String },
  location: { type: String },
  work: { type: String },
  education: { type: String },
  yourPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

const userModels = mongoose.model<IUser>('User', UserSchema);

export default userModels;
