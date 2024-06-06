import { BlockType } from "../../../../utils/types";
import { blockClasses } from "../utils/blocks";

type BlockProps = {
  block: BlockType;
};

const defaultClassName = "text-text-light w-full ";

export default function Block(props: BlockProps) {
  let className = defaultClassName + blockClasses.get(props.block.type);

  return <p className={className}>{props.block.content}</p>;
}