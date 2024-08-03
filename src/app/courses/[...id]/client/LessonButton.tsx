import { LessonType } from "@/utils/types";
import { useDataDetails } from "./_utils/useDataDetails";
import Checkmark from "@/frontend/resources/svg/Checkmark";

type LessonButtonProps = {
  lesson: LessonType;
  moduleId: string;
};

export default function LessonButton(props: LessonButtonProps) {
  const { currentLesson, setCurrentLesson, completedLessonIds } =
    useDataDetails();

  const onSelect = () => {
    setCurrentLesson(props.lesson);
  };

  let currentLessonClassName = "bg-primary-200 rounded-lg font-bold text-text-light fill-text-light";
  let completedLessonClassName = "text-text-light fill-text-light";
  let isCurrentLesson = props.lesson._id.toString() === currentLesson._id;
  let isCompleted = completedLessonIds.has(props.lesson._id);

  let buttonClassName =
    "w-full flex flex-row justify-between p-2 text-text-grayed hover:text-text-light fill-text-grayed hover:fill-text-light transition-all";

  if (isCurrentLesson) {
    buttonClassName += " " + currentLessonClassName;
  }

  if (isCompleted) {
    buttonClassName += " " + completedLessonClassName;
  }

  return (
    <div className="relative">
      <button className={buttonClassName} onClick={onSelect}>
        <h4 className={`flex-1 text-inherit`}>{props.lesson.title}</h4>
        <Checkmark
          className="fill-inherit"
        />
      </button>
    </div>
  );
}
