import { ChangeEvent, useState, memo } from "react";
import { BlockType } from "../utils/types";
import BlockTypeSelector from "./BlockTypeSelector";
import TextArea from "@/ui/TextArea";
import { blockClasses } from "../utils/blocks";

type BlockProps = {
  setCurrentIndex: (index: number) => void;
  setBlock: (block: BlockType) => void;
  insertBlock: () => void;
  onDelete: () => void;
  block: BlockType;
};

function Block(props: BlockProps) {
  let [type, setType] = useState(props.block.type);
  console.log(props.block.content);

  let className = "w-full h-2";
  
  className += " " + blockClasses.get(type);

  const onFocus = () => {
    props.setCurrentIndex(props.block.order);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      props.insertBlock();
      e.currentTarget.blur();
    }

    if (e.key === "Backspace") {
      if (e.currentTarget.value === "") props.onDelete();
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

  return (
    <div className="flex flex-row gap-4 py-2">
      <BlockTypeSelector setType={setBlockType}/>
      <TextArea
        onChange={onChange}
        defaultValue={props.block.content}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        className={className}
      ></TextArea>
    </div>
  );
}

export default memo(Block);