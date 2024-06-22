import axios from "axios";
import {
  CourseType,
  LessonType,
  ModuleType,
} from "@/utils/types";
import courseService from "./courseService";
import { APIModuleType } from "@/utils/apiTypes";

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
    if (!CourseEditorManager.currentCourse?._id)
      throw new Error("Course not loaded!");
    const apiModule: APIModuleType = {
      title: title,
      lessons: [],
    };
    let req = await courseService.createModule(
      CourseEditorManager.currentCourse?._id,
      apiModule
    );
    let { _id } = req.data;
    apiModule._id = _id;
    const module: ModuleType = {
      title: title,
      _id: _id,
      lessons: [],
    }
    CourseEditorManager.currentCourse.modules.push(module);
    CourseEditorManager.notifySubscribers();
    console.log(CourseEditorManager.currentCourse.modules);
  }

  public static async deleteModule(moduleId: string) {
    if (!CourseEditorManager.currentCourse?._id)
      throw new Error("Course not loaded!");
    await courseService.deleteModule(CourseEditorManager.currentCourse._id, moduleId);
    let index = CourseEditorManager.currentCourse.modules.findIndex(
      (element) => element._id === moduleId
    );
    CourseEditorManager.currentCourse.modules.splice(index, 1);
    CourseEditorManager.notifySubscribers();
  }

  // The given module must already have an _id
  // Note: this only currently updates module name
  public static async updateModule(module: ModuleType) {
    if (!CourseEditorManager.currentCourse?._id)
      throw new Error("Course not loaded!");
    if (!module._id) throw new Error("Module doesn't containt an id!");
    await courseService.updateModule(CourseEditorManager.currentCourse._id, module);
    let moduleRef = CourseEditorManager.currentCourse.modules.find(
      (element) => element._id === module._id
    );
    if (!moduleRef)
      throw new Error("Module not found!");
    moduleRef.title = module.title;
    CourseEditorManager.notifySubscribers();
  }

  public static async createLesson(lessonName: string, moduleId: string) {
    if (!CourseEditorManager.currentCourse?._id)
      throw new Error("Course not loaded!");

    let req = await courseService.createLesson(CourseEditorManager.currentCourse._id, moduleId, lessonName);
    let { _id } = req.data;
    const lesson: LessonType = {
      title: lessonName,
      blocks: [],
      _id: _id,
    };

    let module = CourseEditorManager.currentCourse.modules.find(
      (element) => element._id === moduleId
    );
    
    module?.lessons.push(lesson);
    CourseEditorManager.notifySubscribers();
  }

  public static async updateLesson(moduleId: string, lesson: LessonType) {
    if (!CourseEditorManager.currentCourse?._id)
      throw new Error("Course not loaded!");
    
    const res = await courseService.updateLesson(CourseEditorManager.currentCourse._id, moduleId, lesson._id, lesson);
    
    let moduleRef = CourseEditorManager.currentCourse?.modules.find((element) => element._id === moduleId);
    if (!moduleRef)
      throw new Error("Module does not exist!");
    let lessonRef = moduleRef?.lessons.find((element) => element._id === lesson._id);
    if (!lessonRef)
      throw new Error("Lesson does not exist!");
    lessonRef.title = lesson.title;
    lessonRef.blocks = lesson.blocks;
    CourseEditorManager.notifySubscribers();
  }

  public static async deleteLesson(moduleId: string, lessonId: string) {
    if (!CourseEditorManager.currentCourse?._id)
      throw new Error("Course not loaded!");
    await courseService.deleteLesson(CourseEditorManager.currentCourse._id, moduleId, lessonId);
    let moduleRef = CourseEditorManager.getModule(moduleId);
    moduleRef.lessons = moduleRef.lessons.filter((element) => element._id !== lessonId);
    CourseEditorManager.notifySubscribers();
  }

  private static notifySubscribers() {
    CourseEditorManager.subscribers.forEach((subscriber) => {
      subscriber();
    });
  }

  private static getModule(moduleId: string) {
    let moduleRef = CourseEditorManager.currentCourse?.modules.find((element) => element._id === moduleId);
    if (!moduleRef)
      throw new Error("Module does not exist!");
    return moduleRef;
  }

  private static getLesson(moduleId: string, lessonId: string) {
    let moduleRef = CourseEditorManager.getModule(moduleId);
    let lessonRef = moduleRef.lessons.find((element) => element._id === lessonId);
    if (!lessonRef)
      throw new Error("Lesson does not exist!");
    return lessonRef;
  }
}
