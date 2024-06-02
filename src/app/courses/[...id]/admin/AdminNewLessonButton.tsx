import CourseEditorManager from "@/frontend/services/courseEditorManager";
import { createLesson } from "@/frontend/services/createLesson";
import { useRef, useState } from "react";

type NewLessonButtonProps = {
  courseId: string;
  moduleId: string;
};

export default function NewLessonButton(props: NewLessonButtonProps) {
  let [active, setActive] = useState(false);
  let nameRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setActive(!active);
  };
  const onCreate = () => {
    if (!nameRef.current?.value) return;
    CourseEditorManager.createLesson(nameRef.current.value, props.moduleId);
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleClick}
        className="text-start w-full p-2 text-text-grayed border-1  border-text-grayed rounded-md"
      >
        New lesson
      </button>
      {active ? (
        <div className="flex justify-between">
          <input ref={nameRef} placeholder="Lesson Name" />
          <button onClick={onCreate}>Submit</button>
        </div>
      ) : null}
    </div>
  );
}
