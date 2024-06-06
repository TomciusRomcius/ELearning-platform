import mongoose from "mongoose";
import { CourseModel } from "../models/courseModel";
import { Module } from "../models/moduleModel";

export async function createModule(courseId: string, module: Module) {
  let course = await CourseModel.findById(courseId);
  if (!course) throw new Error("Course not found");
  module._id = new mongoose.Types.ObjectId();
  course?.modules.push(module);
  course?.save();
  return module._id;
}

export async function deleteModule(courseId: string, moduleId: string) {
  let course = await CourseModel.findById(courseId);
  if (!course) throw new Error("Course not found");
  const moduleIndex = course?.modules.findIndex((element) => element._id.toString() === moduleId);
  if (moduleIndex === -1) throw new Error("Module not found");
  course.modules.splice(moduleIndex, 1);
  course?.save();
}

export async function updateModulePatch(courseId: string, moduleId: string, module: APIModuleType) {
  let course = await CourseModel.findById(courseId);
  if (!course) throw new Error("Course not found");
  const moduleRef = course?.modules.find((element) => element._id.toString() === moduleId);
  if (!moduleRef) throw new Error("Module not found");
  moduleRef.title = module.title || moduleRef.title;
  course?.save();
}
