import mongoose, { Mongoose } from "mongoose";
import { CourseModel } from "../_models/courseModel";
import { Lesson } from "../_models/lessonModel";

// TODO: fetch only the needed data
export async function createLesson(
  courseId: string,
  moduleId: string,
  title: string
): Promise<void> {
  const course = await CourseModel.findById(courseId);
  const lessonId = new mongoose.mongo.ObjectId();
  if (!course) throw new Error("Course not found");
  course.modules.forEach((module) => {
    if (module._id.toString() === moduleId) {
      module.lessons.push({title: title, description: "hard-coded", blocks: [], _id: new mongoose.Types.ObjectId().toString()})
    }
  });
  course.save();
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
