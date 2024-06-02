import axios from "axios";
import { LessonType } from "../../utils/types";

export async function updateLesson(
  courseId: string,
  moduleId: string,
  lessonId: string,
  lesson: LessonType
) {
  if (!courseId) return;
  
  try {
    axios.put(
      `/api/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
      {
        lesson: {
          title: lesson.title,
          blocks: lesson.blocks,
        },
      }
    );
  }

  catch (err) {

  }
}
