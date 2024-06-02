import { LessonType } from "@/utils/types";

type ModuleIdType = {
  moduleId: string;
}

export type CurrentLessonType = LessonType & ModuleIdType;