// Handles auto resizing

import { TextareaHTMLAttributes, useLayoutEffect, useRef } from "react"

export default function TextArea(props: TextareaHTMLAttributes<any>) {
  let ref = useRef<HTMLTextAreaElement>(null);

  // Handle setting initial height

  const resize = () => {
    if (!ref.current) return;
    ref.current.style.height = "0px";
    ref.current.style.height = `${ref.current?.scrollHeight}px`;
  }

  useLayoutEffect(() => {
    if (!ref.current) return;
    resize();

    ref.current.addEventListener("input", () => resize());
    console.log("Layout");
  }, [props.className]);


  return (
    <textarea ref={ref} {...props}></textarea>
  )
}