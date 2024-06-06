import axios from "axios";

export async function completeLesson(courseId: string, lessonId: string) {
  const res = await axios.post("/api/courses/completed-lessons", {
    courseId: courseId,
    lessonId: lessonId,
  });

  return res;
}