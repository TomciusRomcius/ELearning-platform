import axios from "axios";

export async function createLesson(courseId: string, lessonTitle: string) {
  if (!lessonTitle) return;
  await axios.post(`/api/courses/new-lesson?id=${courseId}`, {
    title: lessonTitle,
  });
}