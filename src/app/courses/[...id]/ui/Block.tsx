import { MutableRefObject, useEffect } from "react";
import { BlockType } from "../utils/types";

type BlockProps = {
  setCurrentIndex: (index: number) => void;
  insertBlock: () => void;
  onDelete: () => void;
  block: BlockType;
}

export default function Block(props: BlockProps) {
  console.log(props.block.content);

  let className = "w-full ";
  switch (props.block.type) {
    case "paragraph":
      className += "text-base";
      break;
    case "h1":
      className += "text-2xl";
      break;
  }

  const onFocus = () => {
    props.setCurrentIndex(props.block.order);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      props.insertBlock();
      e.currentTarget.blur();
    }
  }

  return (
    <textarea defaultValue={props.block.content} onKeyDown={onKeyDown} onFocus={onFocus} className={className}>
    </textarea>
  )
}