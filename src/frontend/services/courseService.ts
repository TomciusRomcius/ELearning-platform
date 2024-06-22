import { APICourseType, APIModuleType } from "@/utils/apiTypes";
import { CourseType, LessonType, ModuleType } from "@/utils/types";
import axios from "axios";

export class CourseService {
  public async createCourse(
    name: string,
    description: string,
    category: string,
    imageFile: File
  ) {
    const formData = new FormData();
    formData.append(
      "course",
      JSON.stringify({ title: name, description, category })
    );
    formData.append("file", imageFile);
    const res = await axios.post("/api/courses", formData);
    return res;
  }

  public async updateCourse(courseId: string, course: APICourseType) {
    const res = await axios.patch(`/api/courses/${courseId}`, {
      course: course,
    });

    return res;
  }

  public async deleteCourse(courseId: string) {
    const res = await axios.delete(`/api/courses/${courseId}`);
    return res;
  }

  public async getCourses() {
    let courses = (await axios.get("/api/courses")).data;
    return courses;
  }

  async loadCourse(id: string): Promise<CourseType> {
    const req = await axios.get(`/api/courses/${id}`);
    return req.data;
  }

  async courseEnroll(courseId: string) {
    const res = await axios.post(`/api/courses/enrolled-courses`, {
      courseId: courseId,
    });
    
    return res;
  }

  public async createModule(courseId: string, module: APIModuleType) {
    let res = await axios.post(`/api/courses/${courseId}/modules`, {
      module: module,
    });

    return res;
  }

  // We must have an _id assotiated with the module!
  public async updateModule(courseId: string, module: APIModuleType) {
    if (!module._id) throw new Error("Module doesn't containt an id!");

    const res = axios.patch(`/api/courses/${courseId}/modules/${module._id}`, {
      module: {
        title: module.title,
      },
    });

    return res;
  }

  public async deleteModule(courseId: string, moduleId: string) {
    await axios.delete(`/api/courses/${courseId}/modules/${moduleId}`);
  }

  public async createLesson(
    courseId: string,
    moduleId: string,
    lessonTitle: string
  ) {
    const res = await axios.post(
      `/api/courses/${courseId}/modules/${moduleId}/lessons`,
      {
        title: lessonTitle,
      }
    );

    return res;
  }

  public async updateLesson(
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
    } catch (err) {}
  }
  public async deleteLesson(
    courseId: string,
    moduleId: string,
    lessonId: string
  ) {
    const res = await axios.delete(
      `/api/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`
    );

    return res;
  }

  public async completeLesson(courseId: string, lessonId: string) {
    const res = await axios.post("/api/courses/completed-lessons", {
      courseId: courseId,
      lessonId: lessonId,
    });

    return res;
  }

  public async getCompletedLessons(): Promise<string[]> {
    const res = await axios.get("/api/courses/completed-lessons");
    return res.data.completedLessonIds;
  }
}

const courseService = new CourseService();

export default courseService;
