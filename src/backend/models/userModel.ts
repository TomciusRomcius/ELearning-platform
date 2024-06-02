import mongoose, { Document, Model } from "mongoose";

enum UserRole {
  NORMAL,
  PREMIUM,
  ADMIN,
}

interface User extends Document {
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: UserRole,
});

type UserModelType = Model<User>

export const UserModel: UserModelType = mongoose.models.User || mongoose.model('User', userSchema);