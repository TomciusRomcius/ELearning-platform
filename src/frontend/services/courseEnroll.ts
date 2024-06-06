import axios from "axios";

export async function courseEnroll(courseId: string) {
  alert(courseId);
  const res = await axios.post(`/api/courses/enrolled-courses`, {
    courseId: courseId,
  });  
  return res;
}