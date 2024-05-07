import { useState } from "react";
import Image from "next/image";
import Popup from "@/ui/Popup";

type BlockTypeSelectorProps = {
  setType: (type: string) => void;
}

export default function BlockTypeSelector(props: BlockTypeSelectorProps) {
  let [popupVisible, setPopupVisible] = useState(false);
  console.log(popupVisible);
  const onToggle = () => setPopupVisible(!popupVisible);
  const onSelect = (type: string) => {
    props.setType(type);
    setPopupVisible(false);
  }
  return (
    <button className="relative" onClick={onToggle}>
      <Image
        src="/blockTypeSelector.svg"
        width={24}
        height={24}
        alt=""/>
      {popupVisible ? (
        <Popup isFixed={false}  onClose={() => setPopupVisible(false)}>
          <div className="flex flex-col gap-2 items-start p-4 bg-white shadow-lg rounded-lg">
            <button onClick={() => onSelect("paragraph")}>Paragraph</button>
            <button onClick={() => onSelect("h1")}>Header 1</button>
            <button onClick={() => onSelect("h2")}>Header 2</button>
            <button onClick={() => onSelect("h3")}>Header 3</button>
          </div>
        </Popup>
      ) : null}
    </button>
  );
}
