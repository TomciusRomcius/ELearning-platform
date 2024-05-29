import mongoose, { Model, Document } from "mongoose";
import { Block, blockSchema } from "./blockModel";

export interface Lesson {
  _id: string;
  title: string;
  description: string;
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
  blocks: [blockSchema],
});