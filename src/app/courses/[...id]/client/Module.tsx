import { useState } from "react";
import { ModuleType } from "../../../../utils/types";
import LessonButton from "./LessonButton";
import { useDataDetails } from "./utils/useDataDetails";

type ModuleProps = {
  module: ModuleType;
}

export function Module(props: ModuleProps) {
  const { course } = useDataDetails();
  console.log(props.module.lessons);
  return (
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-text-light text-2xl">{props.module.title}</h2>
      {/* Display lessons */}
      {props.module.lessons.map((lesson) => (
        <LessonButton
          lesson={lesson}
        />
      ))}
    </div>
  );
}
