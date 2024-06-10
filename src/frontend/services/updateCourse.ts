import { APICourseType } from "@/utils/apiTypes";
import axios from "axios";

export async function updateCourse(courseId: string, course: APICourseType) {
  const res = await axios.patch(`/api/courses/${courseId}`, {
    course: course,
  });

  return res;
}