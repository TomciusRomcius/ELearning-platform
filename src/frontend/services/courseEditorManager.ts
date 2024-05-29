import axios from "axios";
import { createModule, deleteModule, updateModule } from "./moduleService";
import {
  CourseType,
  LessonType,
  ModuleType,
} from "@/app/courses/[...id]/utils/types";
import { createLesson } from "./createLesson";

export default class CourseEditorManager {
  public static currentCourse: CourseType | null = null;
  public static subscribers: (() => void)[] = [];

  public static async fetchCourse(courseId: string) {
    try {
      CourseEditorManager.currentCourse = (
        await axios.get(`/api/courses/${courseId}`)
      ).data;
    } catch (err) {}
  }

  public static async createModule(title: string) {
    if (!CourseEditorManager.currentCourse)
      throw new Error("Course not loaded!");
    const module: ModuleType = {
      title: title,
      lessons: [],
    };
    let req = await createModule(
      CourseEditorManager.currentCourse?._id,
      module
    );
    let { _id } = req.data;
    module._id = _id;
    CourseEditorManager.currentCourse.modules.push(module);
    CourseEditorManager.notifySubscribers();
    console.log(CourseEditorManager.currentCourse.modules);
  }

  public static async deleteModule(moduleId: string) {
    if (!CourseEditorManager.currentCourse)
      throw new Error("Course not loaded!");
    await deleteModule(CourseEditorManager.currentCourse._id, moduleId);
    let index = CourseEditorManager.currentCourse.modules.findIndex(
      (element) => element._id === moduleId
    );
    CourseEditorManager.currentCourse.modules.splice(index, 1);
    CourseEditorManager.notifySubscribers();
  }

  // The given module must already have an _id
  // Note: this only currently updates module name
  public static async updateModule(module: ModuleType) {
    if (!CourseEditorManager.currentCourse)
      throw new Error("Course not loaded!");
    if (!module._id) throw new Error("Module doesn't containt an id!");
    await updateModule(CourseEditorManager.currentCourse._id, module);
    let moduleRef = CourseEditorManager.currentCourse.modules.find(
      (element) => element._id === module._id
    );
    if (!moduleRef)
      throw new Error("Module not found!");
    moduleRef.title = module.title;
    CourseEditorManager.notifySubscribers();
  }

  public static async createLesson(lessonName: string, moduleId: string) {
    if (!CourseEditorManager.currentCourse)
      throw new Error("Course not loaded!");

    let req = await createLesson(CourseEditorManager.currentCourse._id, moduleId, lessonName);
    const lesson: LessonType = {
      title: lessonName,
      blocks: [],
      _id: req.data._id,
    };

    let module = CourseEditorManager.currentCourse.modules.find(
      (element) => element._id === moduleId
    );
    
    module?.lessons.push(lesson);
    CourseEditorManager.notifySubscribers();
  }

  private static notifySubscribers() {
    CourseEditorManager.subscribers.forEach((subscriber) => {
      subscriber();
    });
  }
}
