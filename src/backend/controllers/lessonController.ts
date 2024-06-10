import mongoose, { Mongoose } from "mongoose";
import { CourseModel } from "../models/courseModel";
import { Lesson } from "../models/lessonModel";
import { UserModel } from "../models/userModel";

// TODO: fetch only the needed data
export async function createLesson(
  courseId: string,
  moduleId: string,
  title: string
): Promise<string> {
  const course = await CourseModel.findById(courseId);
  const lessonId = new mongoose.mongo.ObjectId();
  if (!course) throw new Error("Course not found");
  course.modules.forEach((module) => {
    if (module._id.toString() === moduleId) {
      module.lessons.push({title: title, description: "hard-coded", blocks: [], _id: lessonId.toString()})
    }
  });
  course.save();
  return lessonId.toString();
}

export async function updateLesson(
  courseId: string,
  moduleId: string,
  lessonId: string,
  newLesson: Lesson
) {
  let course = await CourseModel.findById(courseId);
  if (!course) throw new Error("Course not found");
  const module = course.modules.find((element) => element._id.toString() === moduleId);
  const lesson = module?.lessons.find((element) => element._id.toString() === lessonId);
  if (!lesson) throw new Error("Lesson not found");
  lesson.title = newLesson.title;
  lesson.blocks = newLesson.blocks;
  course.save();
}

export async function deleteLesson(
  courseId: string,
  moduleId: string,
  lessonId: string
) {
  let course = await CourseModel.findById(courseId);
  if (!course) throw new Error("Course not found");
  const module = course.modules.find(
    (element) => element._id.toString() === moduleId
  );
  if (!module) throw new Error("Module not found");
  const lessonIndex = module?.lessons.findIndex(
    (element) => element._id.toString() === lessonId
  );

  if (lessonIndex !== -1) {
    module?.lessons.splice(lessonIndex, 1);
  }

  else throw new Error("Lesson not found");
  course.save();
}

export async function completeLesson(userId: string, courseId: string, lessonId: string) {
  let user = await UserModel.findById(userId);
  let course = user?.enrolledCourses.find((element) => element.courseId === courseId);
  if (!course) throw new Error("Course not found!");
  let index = course.completedLessonIds.findIndex((id) => id === lessonId);
  if (index !== -1) {
    course.completedLessonIds.splice(index, 1);
  }
  else {
    course.completedLessonIds.push(lessonId);
  }
  user?.save();
}

export async function getCompletedLessons(userId: string, courseId: string) {
  console.log("id: ", courseId);
  let user = await UserModel.findById(userId);
  let course = user?.enrolledCourses.find((element) => element.courseId === courseId);
  if (!course) throw new Error("Course not found!");
  let completedLessons = [];
  for (const lesson of course.completedLessonIds) {
    completedLessons.push(lesson);
  }
  return completedLessons;
}