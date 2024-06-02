import mongoose, { Model, Document } from "mongoose";
import { Module, moduleShema } from "./moduleModel";

export interface Course extends Document {
  title: string;
  description: string;
  modules: Module[]; // Define the type for lessons according to your schema
}


export const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  modules: {
    type: [moduleShema],
    required: false,
    default: [],
  }
});

type CourseModelType = Model<Course>;

export const CourseModel: CourseModelType = mongoose.models.Course || mongoose.model<Course>("Course", courseSchema);