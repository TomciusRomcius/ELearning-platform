import mongoose, { Model, Document } from "mongoose";
import { lessonSchema } from "./lessonModel";

interface Course extends Document {
  title: string;
  description: string;
  lessons: any[]; // Define the type for lessons according to your schema
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
  lessons: [lessonSchema],
});

type CourseModelType = Model<Course>;

export const CourseModel: CourseModelType = mongoose.models.Course || mongoose.model<Course>("Course", courseSchema);