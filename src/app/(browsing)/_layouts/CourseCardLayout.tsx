import { HTMLAttributes } from "react";

export default function CourseCardLayout(
  props: HTMLAttributes<HTMLDivElement>
) {
  return <div {...props}>{props.children}</div>;
}
