import mongoose from "mongoose";
import { CourseModel } from "../_models/courseModel";

export async function createLesson(
  title: string,
  courseId: string
): Promise<void> {
  const course = await CourseModel.findById(courseId);
  course.lessons.push({
    title: title,
    description: "description hard",
    order: course.lessons.length + 1,
    blocks: [],
  });
  course.save();
  console.log(course.lessons);
}
