import mongoose, { Document, Model } from "mongoose";

export enum UserRole {
  NORMAL,
  PREMIUM,
  ADMIN,
}

interface User extends Document {
  email: string;
  password: string;
  role: UserRole;
  enrolledCourseIds: string[];
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: Number,
  enrolledCourseIds: [ { type: String, required: false } ]
});

type UserModelType = Model<User>

export const UserModel: UserModelType = mongoose.models.User || mongoose.model('User', userSchema);