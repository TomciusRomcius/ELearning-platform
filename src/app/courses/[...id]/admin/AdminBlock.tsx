import { useState, memo, useRef, useLayoutEffect } from "react";
import { BlockType } from "@/utils/types";
import BlockTypeSelector from "./AdminBlockTypeSelector";
import TextArea from "@/frontend/ui/TextArea";
import { blockClasses } from "../utils/blocks";

type AdminBlockProps = {
  setCurrentIndex: (index: number) => void;
  setBlock: (block: BlockType) => void;
  insertBlock: (selectedBlock?: BlockType, selectionStart?: number, selectionEnd?: number) => void;
  onDelete: () => void;
  block: BlockType;
  order: number;
};

const defaultClassName = "text-text-light w-full h-2 ";

function AdminBlock(props: AdminBlockProps) {
  let [type, setType] = useState(props.block.type);

  let className = defaultClassName + blockClasses.get(type);

  let textAreaRef = useRef<HTMLInputElement>(null);

  const onFocus = () => {
    props.setCurrentIndex(props.order);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const block = structuredClone(props.block);
      block.content = textAreaRef.current!.value || "";
      const textArea = textAreaRef.current!;
      props.insertBlock(block, textArea.selectionStart, textArea.selectionEnd);
      e.currentTarget.blur();
    }

    if (e.key === "Backspace") {
      if (e.currentTarget.value === "") props.onDelete();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const block = structuredClone(props.block);
    block.content = e.currentTarget.value;
    props.setBlock(block);
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  const setBlockType = (type: string) => {
    setType(type); 
    const block = structuredClone(props.block);
    block.type = type;
    props.setBlock(block);
  }

  useLayoutEffect(() => {
    textAreaRef.current.focus();
  }, []);

  return (
    <div className="flex flex-row gap-4 py-2">
      <BlockTypeSelector setType={setBlockType}/>
      <TextArea
        ref={textAreaRef}
        onChange={onChange}
        defaultValue={props.block.content}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        className={className}
      ></TextArea>
    </div>
  );
}

export default memo(AdminBlock);