import { useEffect, useMemo, useRef, useState } from "react";
import { BlockType, LessonType } from "../utils/types";
import Block from "./Block";
import TextArea from "@/app/_ui/TextArea";
import axios from "axios";

type LessonContainerProps = {
  currentLesson?: LessonType;
  courseId?: string;
};

export default function LessonContainer(props: LessonContainerProps) {
  let titleRef = useRef<HTMLInputElement>(null);
  let [blocksCount, setBlocksCount] = useState(0);
  let [updated, setUpdated] = useState(false);
  let blocks = useMemo(() => {
    if (!props.currentLesson) return [];
    if (props.currentLesson?.blocks.length === 0) {
      setBlocksCount(1);
      return [{ type: "paragraph", content: "Start", order: 0 }];
    }
    setBlocksCount(props.currentLesson.blocks.length);

    return props.currentLesson.blocks;
  }, [props.currentLesson]);
  let currentIndex = useRef(0);

  const insertBlock = () => {
    console.log(currentIndex.current);
    blocks.splice(currentIndex.current + 1, 0, {
      type: "Paragraph",
      content: "New",
      order: currentIndex.current + 1,
    });
    setBlocksCount(blocks.length);
    setUpdated(true);
  };
  const onDelete = () => {};

  const setCurrentIndex = (index: number) => {
    currentIndex.current = index;
  };

  const onSave = () => {
    if (!props.courseId) return;
    axios.post(
      `/api/courses/update-lesson?courseId=${props.courseId}&lessonId=${props.currentLesson?._id}`,
      {
        lesson: {
          title: titleRef.current?.value || props.currentLesson?.title,
          blocks: blocks,
        },
      }
    );
  };

  return (
    <div className="p-4 flex-1 relative">
      <input ref={titleRef} defaultValue={props.currentLesson?.title} className="w-full text-center text-4xl"/>
      {blocks?.map((block) => {
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
      <div className="absolute bottom-0 p-4 flex items-center justify-center">
        <button
          onClick={onSave}
          className={`text-xl bg-gray-400 px-4 py-2 rounded-lg ${updated ? "bg-cyan-500" : null}`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
