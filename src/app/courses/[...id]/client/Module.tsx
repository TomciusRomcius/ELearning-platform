import { ClientLessonType, LessonType, ModuleType } from "../../../../utils/types";
import LessonButton from "./LessonButton";
import { useDataDetails } from "./utils/useDataDetails";

type ModuleProps = {
  module: ModuleType<ClientLessonType>;
};

function calculateCompletionPercentage(lessons: LessonType[], completedLessonIds: Set<string>) {
  let completionSum = 0;
  for (let lesson of lessons) {
    if (completedLessonIds.has(lesson._id))
      completionSum++;
  }

  let completionPercentage = Math.round(completionSum / lessons.length * 100);
  return completionPercentage;
}

export function Module(props: ModuleProps) {
  const { completedLessonIds } = useDataDetails();

  const completionPercentage = calculateCompletionPercentage(props.module.lessons, completedLessonIds);

  return (
    <div className="flex flex-col gap-4 relative">
      <div>
        <h2 className="flex flex-row justify-between flex-1 font-bold text-text-light text-base">
          {props.module.title}
          <small className="text-primary text-base">{` ${completionPercentage}%`}</small>
        </h2>
      </div>
      {/* Display lessons */}
      <div className="flex flex-col pl-4 gap-2">
        {props.module.lessons.map((lesson) => (
          <LessonButton lesson={lesson} moduleId={props.module._id} />
        ))}
      </div>
    </div>
  );
}
