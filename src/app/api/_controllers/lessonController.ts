import mongoose from "mongoose";
import { CourseModel } from "../_models/courseModel";
import { LessonType } from "@/app/courses/[...id]/utils/types";
import { LessonModel } from "../_models/lessonModel";

export async function createLesson(
  title: string,
  courseId: string
): Promise<void> {
  const course = await CourseModel.findById(courseId);
  const lessonId = new mongoose.mongo.ObjectId();
  if (!course) throw new Error("Course not found");
  course.lessons.push({
    _id: lessonId,
    title: title,
    description: "description hard",
    order: course.lessons.length + 1,
    blocks: [],
  });
  course.save();
  console.log(course.lessons);
}

export async function updateLesson(
  courseId: string,
  lessonId: string,
  newLesson: LessonType
) {
  let course = await CourseModel.findById(courseId);
  if (!course) throw new Error("Course not found");
  const lesson = course.lessons.find((les) => les._id.toString() === lessonId);
  if (!lesson) throw new Error("Lesson not found");
  lesson.title = newLesson.title;
  lesson.blocks = newLesson.blocks;
  course.save();
  console.log(lesson.blocks);
}
