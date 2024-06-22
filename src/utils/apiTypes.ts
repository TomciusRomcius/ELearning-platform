import { BlockType } from "./types";

export type APILessonType = {
  lessonName?: string;
  description?: string;
  blocks: BlockType[];
  _id?: string;
}

export type APIModuleType = {
  title?: string;
  description?: string;
  lessons: APILessonType[];
  _id?: string;
}

export type APICourseType = {
  title?: string;
  description?: string;
  category?: string;
  modules: APIModuleType[];
  _id?: string;
}