import { ClientCourseType } from "@/utils/types";

export function getCurrentLesson(course: ClientCourseType, moduleId: string, lessonId: string) {
  const module = course.modules.find((element) => element._id === moduleId);
  if (!module) throw new Error("Module not found!");
  const lesson = module.lessons.find((element) => element._id === lessonId);
  return lesson;
}