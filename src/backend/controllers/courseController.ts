import mongoose from "mongoose";
import { CourseModel } from "../models/courseModel";
import { UserModel } from "../models/userModel";
import { APICourseType } from "@/utils/apiTypes";
import { ERROR_TYPE } from "../utils/errorTypes";
import { isAdmin } from "../utils/isAdmin";
import { getSessionServer } from "../utils/getServerSession";

export async function createCourse(
  title: string,
  description: string,
  category: string
): Promise<string> {
  if (await !isAdmin()) throw ERROR_TYPE.unauthorized;
  if (!title || !description || !category) throw ERROR_TYPE.invalidData;
  let course = await CourseModel.create({
    title,
    description,
    category: category,
  });
  return course.id;
}

export async function updateCourse(courseId: string, course: APICourseType) {
  // Handle invalid data
  if (
    !course.title &&
    !course.description &&
    !course.category &&
    !course.modules
  )
    throw ERROR_TYPE.invalidData;
  if (await !isAdmin()) throw ERROR_TYPE.unauthorized;

  if (!courseId) throw ERROR_TYPE.invalidData;

  await CourseModel.findByIdAndUpdate(courseId, {
    $set: {
      ...(course?.title && { title: course.title }),
      ...(course?.description && { description: course.description }),
      ...(course?.category && { category: course.category }),
    },
  });
}

// Inefficient but for for low number of courses will work :)
export async function getCourses() {
  let courses = await CourseModel.find();
  return courses;
}

export async function getCourse(id: string) {
  const dbCourse = await CourseModel.findById(new mongoose.Types.ObjectId(id));
  if (!dbCourse) throw ERROR_TYPE.notFound;
  const course = dbCourse.toObject();
  return course;
}

export async function deleteCourse(id: string) {
  if (await !isAdmin) throw ERROR_TYPE.unauthorized;
  if (!id) throw ERROR_TYPE.invalidData;
  await CourseModel.findByIdAndDelete(id);
}

export async function getEnrolledCourses(userId: string) {
  const session = await getSessionServer();
  if (!session?.user?.id || session.user.id !== userId)
    throw ERROR_TYPE.unauthorized;

  const user = await UserModel.findById(userId);
  if (!user) throw ERROR_TYPE.userNotFound;
  // Go over all enrolledCourseIds and fetch the courses and push
  // to the courses array
  let courses = [];
  for (let enrolledCourse of user?.enrolledCourses) {
    const courseId = enrolledCourse.courseId;
    const course = await CourseModel.findOne({ _id: courseId });
    // If the course doesn't exist, remove the course from enrolled
    // courses
    if (!course) {
      unenrollCourse(userId, courseId);
    } else {
      courses.push(course.toObject());
    }
  }
  return courses;
}

export async function enrollInCourse(userId: string, courseId: string) {
  await UserModel.findByIdAndUpdate(userId, {
    $push: { enrolledCourses: { courseId: courseId, completedLessonIds: [] } },
  });
}

export async function unenrollCourse(userId: string, courseId: string) {
  await UserModel.findByIdAndUpdate(userId, {
    $pop: { enrolledCourses: { courseId: courseId } },
  });
}
