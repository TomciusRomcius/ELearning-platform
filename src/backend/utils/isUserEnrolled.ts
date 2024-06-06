import { UserModel } from "../models/userModel";

export async function isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found!");
  let result = user?.enrolledCourses.findIndex((enrolledCourse) => enrolledCourse.courseId === courseId);
  if (result === -1) {
    return false;
  }
  else return true;
}