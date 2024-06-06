export type BlockType = {
  type: string;
  content: string;
}

export type LessonType = {
  title: string;
  blocks: BlockType[]
  _id: string;
}

export type ModuleType<Lesson = LessonType> = {
  _id: string;
  title: string;
  lessons: Lesson[];
}

export type CourseType<Lesson = LessonType> = {
  title: string;
  description: string;
  modules: ModuleType<Lesson>[];
  _id: string;
}

export interface ClientLessonType extends LessonType {
  completed: boolean;
}

export type ClientCourseType = CourseType<ClientLessonType>