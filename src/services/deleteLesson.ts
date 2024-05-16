import axios from "axios";

export async function deleteLesson(courseId: string, moduleId: string, lessonId: string) {
  await axios.delete(
    `/api/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`
  );
}
