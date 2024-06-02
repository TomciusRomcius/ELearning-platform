import mongoose from "mongoose";
import { CourseModel } from "../models/courseModel";
import { CourseType } from "@/utils/types";

export async function createCourse(title: string, description: string): Promise<void> {
  try {
    let course = await new CourseModel({ title, description });
    course.save();
  } catch (error) {
    console.log(error);
  }
}

// TODO: Make it more efficient especially in the browse page, so we don't fetch much data at once
export async function getCourses() {
  let courses = await CourseModel.find();
  return courses;
}

export async function getCourse(id: string) {
  const dbCourse = await CourseModel.findById(new mongoose.Types.ObjectId(id));
  if (!dbCourse) return;
  const course = dbCourse.toObject();
  return course;
}
