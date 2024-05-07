import { HTMLAttributes, useLayoutEffect, useRef, useState } from "react";

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  isFixed: boolean;
  x?: number;
  y?: number;
  onClose: () => void;
}

const DEFAULT_X = 40;
const DEFAULT_Y = -40;

export default function Popup(props: PopupProps) {
  let divRef = useRef<HTMLDivElement>(null);
  let [xPos, setXPos] = useState(props.x || DEFAULT_X);
  let [yPos, setYPos] = useState(props.y || DEFAULT_Y);

  let { isFixed, x, y, onClose, ...htmlProps } = props; // Getting htmlProps

  useLayoutEffect(() => {
    if (!divRef.current) return;
    let rect = divRef.current.getBoundingClientRect();

    if (rect.x + rect.width > window.innerWidth) {
      let diff = rect.x + rect.width - window.innerWidth;
      setXPos((x) => x - diff);
    }

    if (rect.y + rect.height > window.innerHeight) {
      let diff = rect.y + rect.height - window.innerHeight;
      setYPos((y) => y - diff);
      alert("e");
    }

    if (rect.y < 0) {
      setYPos(0);
    }

    if (rect.x < 0) {
      setXPos(0);
    }
  }, []);

  return (
    <div
      {...htmlProps}
      ref={divRef}
      style={{
        position: isFixed ? "fixed" : "absolute",
        left: xPos,
        top: yPos,
      }}
    >
      {props.children}
    </div>
  );
}
