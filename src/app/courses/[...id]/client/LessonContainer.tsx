import { useDataDetails } from "./utils/useDataDetails";
import Block from "./Block";
import LessonFunctions from "./LessonFunctions";

export default function LessonContainer() {
  const { currentLesson } = useDataDetails();

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
        <LessonFunctions/>
      </div>
    </div>
  );
}
