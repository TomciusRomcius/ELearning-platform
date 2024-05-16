import axios from "axios";

export async function createLesson(courseId: string, moduleId: string, lessonTitle: string) {
  await axios.post(`/api/courses/${courseId}/modules/${moduleId}/lessons`, {
    title: lessonTitle,
  });
}