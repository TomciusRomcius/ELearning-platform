import { useState } from "react";
import { ClientLessonType, ModuleType } from "../../../../utils/types";
import LessonButton from "./LessonButton";
import { useDataDetails } from "./utils/useDataDetails";

type ModuleProps = {
  module: ModuleType<ClientLessonType>;
};

export function Module(props: ModuleProps) {
  let completionSum = 0;
  for (let lesson of props.module.lessons) {
    if (lesson.completed) completionSum++;
  }

  let completionPercentage = completionSum / props.module.lessons.length * 100;

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-row gap-2 items-center">
        <span className="w-6 h-[1px] bg-primary-300"></span>
        <h2 className="flex-1 text-center text-text-light text-xl">
          {props.module.title}
          {` ${completionPercentage}%`}
        </h2>
        <span className="w-6 h-[1px] bg-primary-300"></span>
      </div>
      {/* Display lessons */}
      {props.module.lessons.map((lesson) => (
        <LessonButton lesson={lesson} moduleId={props.module._id} />
      ))}
    </div>
  );
}
