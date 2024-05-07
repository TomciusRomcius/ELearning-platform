import mongoose, { Model, Document } from "mongoose";
import { Block, blockSchema } from "./blockModel";

interface Lesson extends Document {
  title: string;
  description: string;
  order: number;
  blocks: Block[];
}

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

type LessonModelType = Model<Lesson>;

export const LessonModel: LessonModelType = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);