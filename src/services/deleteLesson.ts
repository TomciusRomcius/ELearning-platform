import axios from "axios";

export async function deleteLesson(courseId: string, lessonId: string) {
  axios.delete(
    `/api/courses/delete-lesson?courseId=${courseId}&lessonId=${lessonId}`
  );
}
