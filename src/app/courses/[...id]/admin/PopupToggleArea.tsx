import { ReactNode, RefObject, useLayoutEffect, useRef, useState } from "react";

type PopupToggleAreaProps = {
  isPopupVisible: boolean;
  popupRef: RefObject<HTMLDivElement>;
  children: ReactNode;
};
export default function PopupToggleArea(props: PopupToggleAreaProps) {
  const popupRef = props.popupRef;

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (props.isPopupVisible) return;
    if (!popupRef?.current) return;
    popupRef.current.style.left = `${e.clientX}px`;
    popupRef.current.style.top = `${e.clientY}px`;
  };
  
  useLayoutEffect(() => {
    if (!popupRef.current) return;
    const rect = popupRef.current.getBoundingClientRect();
    let dx = 0;
    let dy = 0;
    if (rect.left + rect.width > window.innerWidth) {
      dx = rect.left + rect.width - window.innerWidth
      popupRef.current.style.left = `${rect.left - dx}px`;
    }

    if (rect.top + rect.height > window.innerHeight) {
      dy = rect.top + rect.height - window.innerHeight
      popupRef.current.style.top = `${rect.top - dy}px`;
    }
  }, [props.isPopupVisible]);

  return <div onMouseMove={onMouseMove}>{props.children}</div>;
}
