import axios from "axios";

export async function deleteCourse(courseId: string) {
  const res = await axios.delete(`/api/courses/${courseId}`);
  return res;
}