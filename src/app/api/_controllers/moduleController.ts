import mongoose from "mongoose";
import { CourseModel } from "../_models/courseModel";
import { Module } from "../_models/moduleModel";

export async function createModule(courseId: string, moduleName: string) {
  let course = await CourseModel.findById(courseId);
  if (!course) console.log("Course not found");
  let module: Module = {
    _id: new mongoose.Types.ObjectId().toString(),
    moduleName: moduleName,
    lessons: [],
  };
  course?.modules.push(module);
  course?.save();
}
