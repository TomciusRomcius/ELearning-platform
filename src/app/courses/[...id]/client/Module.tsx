import { useState } from "react";
import { ModuleType } from "../../../../utils/types";
import LessonButton from "./LessonButton";
import { useDataDetails } from "./utils/useDataDetails";

type ModuleProps = {
  module: ModuleType;
}

export function Module(props: ModuleProps) {
  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-row gap-2 items-center">
        <span className="flex-1 h-[1px] bg-primary-300"></span>
        <h2 className="text-center text-text-light text-2xl">{props.module.title}</h2>
        <span className="flex-1 h-[1px] bg-primary-300"></span>

      </div>
      {/* Display lessons */}
      {props.module.lessons.map((lesson) => (
        <LessonButton
          lesson={lesson}
          moduleId={props.module._id}
        />
      ))}
    </div>
  );
}
