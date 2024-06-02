import { LessonType } from "@/utils/types";
import { useDataDetails } from "./utils/useDataDetails";

type LessonButtonProps = {
  lesson: LessonType;
};

export default function LessonButton(props: LessonButtonProps) {
  const { setCurrentLesson } = useDataDetails();

  const onSelect = () => {
    setCurrentLesson(props.lesson);
  }

  return (
    <div className="relative">
      <button onClick={onSelect}>{props.lesson.title}</button>
    </div>
  );
}
