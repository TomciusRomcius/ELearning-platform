// Handles auto resizing

import React, { RefObject, TextareaHTMLAttributes, forwardRef, memo, useLayoutEffect, useRef } from "react"

const TextArea = forwardRef((props: TextareaHTMLAttributes<any>, forwardedRef) => {
  let textAreaRef = useRef<HTMLTextAreaElement>(null);
  const ref = forwardedRef as RefObject<HTMLTextAreaElement> || textAreaRef;
  
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
});

export default memo(TextArea);