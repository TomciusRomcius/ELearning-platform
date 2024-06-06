import mongoose from "mongoose";
import { CourseModel } from "../models/courseModel";
import { UserModel } from "../models/userModel";

export async function createCourse(title: string, description: string): Promise<void> {
  try {
    let course = await new CourseModel({ title, description });
    course.save();
  } catch (error) {
    console.log(error);
  }
}

// TODO: Make it more efficient especially in the browse page, so we don't fetch much data at once
export async function getCourses() {
  let courses = await CourseModel.find();
  return courses;
}

export async function getCourse(id: string) {
  const dbCourse = await CourseModel.findById(new mongoose.Types.ObjectId(id));
  if (!dbCourse) return;
  const course = dbCourse.toJSON();
  return course;
}

export async function getEnrolledCourses(userId: string) {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found!");
  let courses = [];
  for (let enrolledCourse of user?.enrolledCourses) {
    const courseId = enrolledCourse.courseId;
    const course = await CourseModel.findOne({ _id: courseId });
    if (!course) throw new Error("Data mismatch!");
    courses.push(course.toObject());
  }
  return courses;
}

export async function enrollInCourse(userId: string, courseId: string) {
  const user = await UserModel.findByIdAndUpdate(userId, {
    $push: { enrolledCourses: { courseId: courseId, completedLessonIds: [] } },
  });
}
