import { ReactNode } from "react";

type CourseContainerLayoutProps = {
  children: ReactNode;
};

export default function CourseContainerLayout(
  props: CourseContainerLayoutProps
) {
  return <div className="flex flex-row flex-wrap gap-10">{props.children}</div>;
}
