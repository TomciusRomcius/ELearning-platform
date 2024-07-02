import { ClientLessonType, LessonType } from "@/utils/types";
import { useDataDetails } from "./utils/useDataDetails";
import Checkmark from "@/frontend/resources/svg/Checkmark";

type LessonButtonProps = {
  lesson: ClientLessonType;
  moduleId: string;
};

export default function LessonButton(props: LessonButtonProps) {
  const { currentLesson, setCurrentLesson, completedLessonIds } = useDataDetails();

  const onSelect = () => {
    setCurrentLesson(props.lesson);
  };

  let className = props.lesson.completed
    ? "text-text-light"
    : "text-text-grayed";

  let currentLessonClassName = "bg-primary-200 rounded-lg font-bold";
  let isCurrentLesson = props.lesson._id.toString() === currentLesson._id;
  let isCompleted = completedLessonIds.has(props.lesson._id);

  return (
    <div className="relative">
      <button
        className={`w-full flex flex-row justify-between px-2 py-2 ${
          isCurrentLesson ? currentLessonClassName : ""
        } ${className}`}
        onClick={onSelect}
      >
        <h4
          className={`flex-1 ${
            isCompleted ? "text-secondary" : "text-text-grayed"
          }`}
        >
          {props.lesson.title}
        </h4>
        <Checkmark
          className={
            isCompleted ? "w-max fill-secondary" : "fill-text-grayed"
          }
        />
      </button>
    </div>
  );
}
