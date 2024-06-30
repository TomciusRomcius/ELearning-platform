import { UserModel } from "../models/userModel";
import { ERROR_TYPE } from "./errorTypes";
export async function isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
  const user = await UserModel.findById(userId);
  if (!user) 
    throw new Error(ERROR_TYPE.userNotFound);
  let result = user?.enrolledCourses.findIndex((enrolledCourse) => enrolledCourse.courseId === courseId);
  if (result === -1) {
    return false;
  }
  else return true;
}