import { ClientLessonType, LessonType } from "@/utils/types";
import { useDataDetails } from "./utils/useDataDetails";
import Checkmark from "@/frontend/resources/svg/Checkmark";

type LessonButtonProps = {
  lesson: ClientLessonType;
  moduleId: string;
};

export default function LessonButton(props: LessonButtonProps) {
  const { setCurrentLesson } = useDataDetails();

  const onSelect = () => {
    setCurrentLesson({ lessonId: props.lesson._id, moduleId: props.moduleId });
  };

  let className = props.lesson.completed
    ? "text-text-light"
    : "text-text-grayed";

  return (
    <div className="relative">
      <button className={`w-full flex flex-row justify-between ${className}`} onClick={onSelect}>
        {props.lesson.title}
        <Checkmark className={props.lesson.completed ? " fill-secondary" : "fill-text-grayed"}/>
      </button>
    </div>
  );
}
