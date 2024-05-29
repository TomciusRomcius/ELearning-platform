import mongoose, { Document, Model } from "mongoose";

interface User extends Document {
  email: string;
  password: string;
  role: number;
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: Number,
});

type UserModelType = Model<User>

export const UserModel: UserModelType = mongoose.models.User || mongoose.model('User', userSchema);