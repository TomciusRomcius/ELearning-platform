export type BlockType = {
  type: string;
  content: string;
  order: number;
}

export type LessonType = {
  title: string;
  blocks: BlockType[]
  _id: string;
}

export type ModuleType = {
  _id: string;
  title: string;
  lessons: LessonType[];
}

export type CourseType = {
  title: string;
  description: string;
  modules: ModuleType[];
  _id: string;
}

type ModuleIdType = {
  moduleId: string;
}

export type CurrentLessonType = LessonType & ModuleIdType;