import axios from "axios";

export async function getCompletedLessons(): Promise<string[]> {
  const res = await axios.get("/api/courses/completed-lessons");
  return res.data.completedLessonIds;
}