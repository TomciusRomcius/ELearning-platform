import axios from "axios";
import { LessonType } from "../courses/[...id]/utils/types";

export async function updateLesson(
  courseId: string,
  lessonId: string,
  lesson: LessonType
) {
  if (!courseId) return;
  
  try {
    axios.post(
      `/api/courses/update-lesson?courseId=${courseId}&lessonId=${lessonId}`,
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
