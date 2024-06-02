import { useCallback, useEffect, useRef, useState } from "react";
import { BlockType, LessonType } from "../../../../utils/types";
import { useDataDetails } from "./utils/useDataDetails";
import Block from "./Block";

export default function LessonContainer() {
  const { currentLesson } = useDataDetails();
  return (
    <div className="p-4 flex-1 relative">
      {/* Title */}
      <h4
        className="w-full text-center text-4xl text-text-light"
      >{currentLesson.title}</h4>
      {/* Blocks */}
      {currentLesson.blocks.map((block) => {
        let blockComponent = (
          <Block
            block={block}
          />
        );
        return blockComponent;        
      })}
    </div>
  );
}
