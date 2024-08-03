import AccentButton from "@/frontend/ui/AccentButton";
import { useDataDetails } from "./_utils/useDataDetails";

export default function LessonFunctions() {
  const { currentLesson, toggleLessonComplete } = useDataDetails();

  const onComplete = () => {
    toggleLessonComplete(currentLesson._id);
  }

  return (
    <div className="absolute bottom-0 w-full p-2 bg-primary-100 rounded-lg border-border border-1 right-2 flex gap-4 justify-end shadow-lg">
      <AccentButton
        className="rounded-lg border-border border-1 bg-primary-0 px-4 py-2"
        onClick={onComplete}
      >
        Complete
      </AccentButton>
    </div>
  );
}
