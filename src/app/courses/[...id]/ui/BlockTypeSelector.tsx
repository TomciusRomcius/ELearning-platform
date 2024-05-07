import { useState } from "react";
import Image from "next/image";

type BlockTypeSelectorProps = {
  setType: (type: string) => void;
}

export default function BlockTypeSelector(props: BlockTypeSelectorProps) {
  let [popupVisible, setPopupVisible] = useState(false);
  console.log(popupVisible);
  const onToggle = () => setPopupVisible(!popupVisible);
  const onSelect = (type: string) => {
    props.setType(type);
  }
  return (
    <button onClick={onToggle}>
      <Image
        src="/blockTypeSelector.svg"
        width={24}
        height={24}
        alt=""/>
      {popupVisible ? (
        <div className="flex flex-col gap-2 items-start p-4 bg-white shadow-lg rounded-lg absolute">
          <button onClick={() => onSelect("paragraph")}>Paragraph</button>
          <button onClick={() => onSelect("h1")}>Header 1</button>
        </div>
      ) : null}
    </button>
  );
}
