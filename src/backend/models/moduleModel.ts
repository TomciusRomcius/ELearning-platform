import mongoose from "mongoose";
import { Lesson, lessonSchema } from "./lessonModel";

export interface Module {
  _id: mongoose.Types.ObjectId;
  title: string;
  lessons: Lesson[];
}

export const moduleShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: {
    type: [lessonSchema],
    required: false,
  }
});