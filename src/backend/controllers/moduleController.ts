import mongoose from "mongoose";
import { CourseModel } from "../models/courseModel";
import { Module } from "../models/moduleModel";
import { isAdmin } from "../utils/isAdmin";
import { APIModuleType } from "@/utils/apiTypes";
import { ERROR_TYPE } from "../utils/errorTypes";

export async function createModule(courseId: string, module: Module) {
  if (await !isAdmin()) throw ERROR_TYPE.unauthorized;
  let course = await CourseModel.findById(courseId);
  if (!course) throw ERROR_TYPE.notFound;
  module._id = new mongoose.Types.ObjectId().toString();
  course?.modules.push(module);
  course?.save();
  return module._id;
}

export async function deleteModule(courseId: string, moduleId: string) {
  const result = await CourseModel.updateOne(
    { _id: courseId },
    { $pull: { modules: { _id: moduleId } } }
  );

  if (result.matchedCount === 0) throw ERROR_TYPE.notFound;
  if (result.modifiedCount === 0) throw ERROR_TYPE.notFound;
}
export async function updateModulePatch(
  courseId: string,
  moduleId: string,
  module: APIModuleType
) {
  let course = await CourseModel.findById(courseId);
  if (!course) throw new Error("Course not found");
  const moduleRef = course?.modules.find(
    (element) => element._id.toString() === moduleId
  );
  if (!moduleRef) throw new Error("Module not found");
  moduleRef.title = module.title || moduleRef.title;
  course?.save();
}
