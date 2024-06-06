import { ClientLessonType, LessonType } from "@/utils/types";
import { useDataDetails } from "./utils/useDataDetails";

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
      <button className={className} onClick={onSelect}>
        {props.lesson.title}
      </button>
    </div>
  );
}
