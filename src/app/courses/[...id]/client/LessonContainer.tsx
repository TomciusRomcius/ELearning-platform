import { useCallback, useEffect, useRef, useState } from "react";
import { BlockType, LessonType } from "../../../../utils/types";
import { useDataDetails } from "./utils/useDataDetails";
import Block from "./Block";
import { completeLesson } from "@/frontend/services/completeLesson";
import { getCurrentLesson } from "./utils/getCurrentLesson";
import { moduleShema } from "@/backend/models/moduleModel";

export default function LessonContainer() {
  const { currentLesson, course, setCourse } = useDataDetails();

  if (!currentLesson) return;

  const lesson = getCurrentLesson(course, currentLesson.moduleId, currentLesson.lessonId);

  const onComplete = () => {
    // Highly inefficient;
    const newCourse = structuredClone(course);
    const lesson = getCurrentLesson(newCourse, currentLesson.moduleId, currentLesson.lessonId);
    lesson.completed = true;
    setCourse(newCourse);
    completeLesson(course._id, currentLesson.lessonId);
  }

  return (
    <div className="flex flex-col p-4 flex-1 relative">
      {/* Title */}
      <h4
        className="w-full text-center text-4xl text-text-light"
      >{lesson.title}</h4>
      {/* Blocks */}
      {lesson.blocks.map((block) => {
        let blockComponent = (
          <Block
            block={block}
          />
        );
        return blockComponent;        
      })}

      <div className="w-full absolute bottom-0">
        <button onClick={onComplete}>Complete</button>
      </div>
    </div>
  );
}
