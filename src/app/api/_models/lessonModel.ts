import mongoose from "mongoose";
import { blockSchema } from "./blockModel";

export const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  blocks: [blockSchema],
})

export const LessonModel = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);