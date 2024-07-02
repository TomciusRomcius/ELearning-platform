import { useDataDetails } from "./utils/useDataDetails";
import Block from "./Block";
import AccentButton from "@/frontend/ui/AccentButton";

export default function LessonContainer() {
  const { currentLesson, toggleLessonComplete } = useDataDetails();

  const onComplete = () => {
    toggleLessonComplete(currentLesson._id);
  };

  const onNextLesson = () => {
    // onComplete();
  }

  return (
    <div className="flex flex-col px-24 py-10 flex-1">
      <div className="w-full h-full relative">
        <div className="relative h-full overflow-y-scroll flex flex-col gap-2">
          {/* Title */}
          <h4 className="w-full text-center text-4xl text-text-light">
            {currentLesson.title}
          </h4>
          {/* Blocks */}
          {currentLesson.blocks.map((block) => {
            let blockComponent = <Block block={block} />;
            return blockComponent;
          })}

          <div className="py-10"></div>
        </div>

        <div className="absolute bottom-0 w-full p-2 bg-primary-100 rounded-lg border-border border-1 right-2 flex gap-4 justify-end shadow-lg">
          <button
            className="rounded-lg border-border border-1 bg-primary-0 px-4 py-2"
            onClick={onComplete}
          >
            Complete
          </button>
          <AccentButton
          >
            Next lesson
          </AccentButton>
        </div>
      </div>
    </div>
  );
}
