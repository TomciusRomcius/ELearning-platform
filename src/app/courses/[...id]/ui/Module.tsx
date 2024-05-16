import { LessonType, ModuleType } from "../utils/types"
import LessonButton from "./LessonButton";
import NewLessonButton from "./NewLessonButton";

type ModuleProps = {
  courseId: string;
  module: ModuleType;
  setCurrentLesson: (moduleId: string, lessonId: string) => void;
}

export function Module(props: ModuleProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-text-light text-2xl">Module: {props.module.moduleName}</h1>
      {props.module.lessons.map((lesson) => <LessonButton setCurrentLesson={props.setCurrentLesson} moduleId={props.module._id} lesson={lesson}/>)}
      <NewLessonButton courseId={props.courseId} moduleId={props.module._id}/>
    </div>
    
  )
}