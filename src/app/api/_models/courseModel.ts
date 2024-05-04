import mongoose from "mongoose";
import { lessonSchema } from "./lessonModel";

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

export const CourseModel = mongoose.models.Course || mongoose.model("Course", courseSchema);