import { ClientLessonType, LessonType } from "@/utils/types";
import { useDataDetails } from "./utils/useDataDetails";
import Checkmark from "@/frontend/resources/svg/Checkmark";

type LessonButtonProps = {
  lesson: ClientLessonType;
  moduleId: string;
};

export default function LessonButton(props: LessonButtonProps) {
  const { currentLesson, setCurrentLesson } = useDataDetails();

  const onSelect = () => {
    setCurrentLesson({ lessonId: props.lesson._id, moduleId: props.moduleId });
  };

  let className = props.lesson.completed
    ? "text-text-light"
    : "text-text-grayed";
  
  let currentLessonClassName = "bg-primary-200 rounded-lg font-bold";
  let isCurrentLesson = props.lesson._id.toString() === currentLesson.lessonId;

  return (
    <div className="relative">
      <button className={`w-full flex flex-row justify-between px-2 py-2 ${isCurrentLesson ? currentLessonClassName : ""} ${className}`} onClick={onSelect}>
        {props.lesson.title}
        <Checkmark className={props.lesson.completed ? " fill-secondary" : "fill-text-grayed"}/>
      </button>
    </div>
  );
}
