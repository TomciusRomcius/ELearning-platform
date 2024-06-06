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
  enrolledCourses: [{ courseId: string, completedLessonIds: string[] }];
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: Number,
  enrolledCourses: [ 
    { 
      courseId: String, 
      completedLessonIds: [String],
      _id: false,
    } 
  ]
});

type UserModelType = Model<User>

export const UserModel: UserModelType = mongoose.models.User || mongoose.model('User', userSchema);