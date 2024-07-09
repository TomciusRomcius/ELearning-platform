import { useCallback, useEffect, useRef, useState } from "react";
import { BlockType, LessonType } from "../../../../utils/types";
import CourseEditorManager from "@/frontend/services/courseEditorManager";
import AdminBlock from "./AdminBlock";
import AccentButton from "@/frontend/ui/AccentButton";

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

  const onCreateFirstBlock = () => {
    insertBlock();
  };

  const insertBlock = (
    selectedBlock?: BlockType,
    selectionStart?: number,
    selectionEnd?: number
  ) => {
    const newBlocks = [...blocks];
    // Handle the case where the block is provided
    // and the text is selected(inserting additional block, breaking block)
    if (selectedBlock && selectionStart && selectionEnd) {
      const startText = selectedBlock.content.substring(0, selectionStart);
      const endText = selectedBlock.content.substring(
        selectionStart,
        selectedBlock.content.length
      );
      const currentBlock = structuredClone(selectedBlock);
      const nextBlock = structuredClone(selectedBlock);
      currentBlock.content = startText;
      nextBlock.content = endText;
      newBlocks[currentIndex.current] = currentBlock;
      newBlocks.splice(currentIndex.current + 1, 0, nextBlock);
      setBlocks(newBlocks);
    }
    // Handle block creation where the selected index
    // is not provided. Example: Clicking on a button
    // to create a block.
    else {
      const block: BlockType = {
        type: selectedBlock?.type || "Paragraph",
        content: "New",
      };
      if (currentIndex.current === blocks.length) {
        newBlocks.push(block);
      } else {
        newBlocks.splice(currentIndex.current + 1, 0, block);
      }
      setBlocks(newBlocks);
      setUpdated(true);
    }
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

  // Reset the blocks, when current lesson changes
  useEffect(() => {
    setBlocks(structuredClone(props.currentLesson.blocks));
  }, [props.currentLesson]);

  // Used for setting block order
  let blockIndex = 0;

  return (
    <div className="flex-1 h-full relative">
      <div className="p-4 h-full overflow-y-scroll">
        {/* Title */}
        <input
          key={props.currentLesson?.title}
          ref={titleRef}
          defaultValue={props.currentLesson?.title}
          className="w-full text-center text-4xl text-text-light"
        />
        {/* Blocks */}
        {blocks.length === 0 ? (
          <button
            onClick={onCreateFirstBlock}
            className="p-4 border-border border-1"
          >
            Create block
          </button>
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

      </div>
        {/* Save button container */}
        <div className="absolute bottom-0 p-4 flex items-center justify-center">
          <AccentButton
            onClick={handleLessonSave}
            className={`${
              !updated ? "bg-primary-200 border-border border-1" : null
            }`}
          >
            Save
          </AccentButton>
        </div>
    </div>
  );
}
