export type BlockType = {
  type: string;
  content: string;
  order: number;
}

export type LessonType = {
  title: string;
  blocks: BlockType[]
  order: number;
}

export type CourseType = {
  title: string;
  description: string;
  lessons: LessonType[];
  _id: string;
}