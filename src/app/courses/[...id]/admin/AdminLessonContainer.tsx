import { useCallback, useEffect, useRef, useState } from "react";
import { BlockType, LessonType } from "../../../../utils/types";
import CourseEditorManager from "@/frontend/services/courseEditorManager";
import AdminBlock from "./AdminBlock";

type LessonContainerProps = {
  currentLesson: LessonType;
  courseId: string;
  moduleId: string;
};

export default function AdminLessonContainer(props: LessonContainerProps) {
  let titleRef = useRef<HTMLInputElement>(null);
  let [updated, setUpdated] = useState(false);
  let [blocks, setBlocks] = useState<BlockType[]>([]);
  let currentIndex = useRef(0);
  
  const insertBlock = () => {
    const newBlocks = [...blocks];
    const block: BlockType = {
      type: "Paragraph",
      content: "New",
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
    CourseEditorManager.updateLesson(props.moduleId, newLesson).then(() => {
      setUpdated(false);
    });
  };

  // Set the blocks
  useEffect(() => {
    setBlocks(structuredClone(props.currentLesson.blocks));
  }, [props.currentLesson]);

  let blockIndex = 0;

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
      {blocks.length === 0 ? (
        <button onClick={insertBlock} className="p-4 border-border border-1">Create block</button>
      ) : null}

      {blocks.map((block) => {
        const setBlock = (arg: BlockType) => {
          block.content = arg.content;
          block.type = arg.type;
          setUpdated(true);
        };

        let blockComponent = (
          <AdminBlock
            key={block.type + block.content + blockIndex}
            setBlock={setBlock}
            setCurrentIndex={setCurrentIndex}
            insertBlock={insertBlock}
            onDelete={onDelete}
            block={block}
            order={blockIndex}
          />
        );
        blockIndex++;
        return blockComponent;        
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
