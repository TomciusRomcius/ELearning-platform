import axios from "axios";

export async function createLesson(courseId: string, moduleId: string, lessonTitle: string) {
  let req = await axios.post(`/api/courses/${courseId}/modules/${moduleId}/lessons`, {
    title: lessonTitle,
  });
  return req;
}