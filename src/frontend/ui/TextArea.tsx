// Handles auto resizing

import { TextareaHTMLAttributes, memo, useLayoutEffect, useRef } from "react"

function TextArea(props: TextareaHTMLAttributes<any>) {
  let ref = useRef<HTMLTextAreaElement>(null);

  // Handle setting initial height

  const resize = () => {
    if (!ref.current) return;
    ref.current.style.height = "1px";
    ref.current.style.height = `${ref.current?.scrollHeight}px`;
  }

  useLayoutEffect(() => {
    if (!ref.current) return;
    resize();

    ref.current.addEventListener("input", resize);
    return () => ref.current?.removeEventListener("input", resize);
    console.log("Layout");
  }, [props.className]);


  return (
    <textarea ref={ref} {...props}></textarea>
  )
}

export default memo(TextArea);