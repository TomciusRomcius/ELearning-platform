import { useCallback, useEffect, useRef, useState } from "react";
import { BlockType, LessonType } from "../utils/types";
import Block from "./Block";
import CourseEditorManager from "@/frontend/services/courseEditorManager";

type LessonContainerProps = {
  currentLesson: LessonType;
  courseId: string;
  moduleId: string;
};

export default function LessonContainer(props: LessonContainerProps) {
  let titleRef = useRef<HTMLInputElement>(null);
  let [updated, setUpdated] = useState(false);
  let [blocks, setBlocks] = useState<BlockType[]>([]);
  let currentIndex = useRef(0);
  
  const insertBlock = () => {
    const newBlocks = [...blocks];
    const block: BlockType = {
      type: "Paragraph",
      content: "New",
      order: currentIndex.current + 1,
    };
    if (currentIndex.current === blocks.length) {
      newBlocks.push(block);
    } else {
      newBlocks.splice(currentIndex.current + 1, 0, block);
    }
    setBlocks(newBlocks);
    setUpdated(true);
  };

  // Handles block deletion(when user presses backspace on a block with no content)
  const onDelete = () => {
    const newBlocks = [...blocks];
    if (currentIndex.current === blocks.length) {
      newBlocks.pop();
    } else {
      newBlocks.splice(currentIndex.current, 1);
    }
    setBlocks(newBlocks);
  };

  // Used for handling insertion in the middle of the lesson document
  const setCurrentIndex = useCallback((index: number) => {
    currentIndex.current = index;
  }, []);

  // Update the lesson in the database
  const handleLessonSave = () => {
    const newLesson = structuredClone(props.currentLesson);
    newLesson.title = titleRef.current?.value || props.currentLesson?.title;
    newLesson.blocks = blocks;
    CourseEditorManager.updateLesson(props.moduleId, newLesson)
  };

  // Set the blocks
  useEffect(() => {
    if (props.currentLesson?.blocks.length === 0) {
      setBlocks([{ type: "paragraph", content: "Start", order: 0 }]);
    } 
    else {
      setBlocks(structuredClone(props.currentLesson.blocks));
    }
  }, [props.currentLesson]);

  return (
    <div className="p-4 flex-1 relative">
      {/* Title */}
      <input
        key={props.currentLesson?.title}
        ref={titleRef}
        defaultValue={props.currentLesson?.title}
        className="w-full text-center text-4xl text-text-light"
      />
      {/* Blocks */}
      {blocks.map((block) => {
        const setBlock = (arg: BlockType) => {
          block.content = arg.content;
          block.type = arg.type;
          setUpdated(true);
        };
        return (
          <Block
            key={block.type + block.content + block.order.toString()}
            setBlock={setBlock}
            setCurrentIndex={setCurrentIndex}
            insertBlock={insertBlock}
            onDelete={onDelete}
            block={block}
          />
        );
      })}

      {/* Save button container */}
      <div className="absolute bottom-0 p-4 flex items-center justify-center">
        <button
          onClick={handleLessonSave}
          className={`text-xl text-text-grayed border-primary-400 border-2 px-4 py-2 rounded-lg ${
            updated ? "bg-cyan-500" : null
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
